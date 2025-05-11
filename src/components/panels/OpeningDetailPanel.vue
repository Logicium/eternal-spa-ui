<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, computed } from 'vue';
import { useAuthStore } from "@/stores/AuthStore.ts";
import { useServicesStore } from "@/stores/ServiceStore.ts";
import api from "@/router/api.ts";
import utils from "@/utils/utils.ts";
import { DatePicker as VDatePicker } from 'v-calendar';
import type {Opening} from "@/interfaces";

const authStore = useAuthStore();
const servicesStore = useServicesStore();

// Define props
const props = defineProps({
  opening: {
    type: Object,
    required: true
  }
});

// Define emits
const emit = defineEmits(['close', 'updated', 'deleted']);

console.log("Opening: ", props.opening.service)
// Form data
const serviceType = ref("");
const serviceId = ref(props.opening.service);
const timeStart = ref(new Date()); // Will be constructed from selectedDate and startTime
const timeEnd = ref(new Date()); // Will be constructed from selectedDate and endTime
const selectedDate = ref(new Date()); // Single date for both start and end
const startTime = ref(new Date(props.opening.timeStart)); // Time for start
const endTime = ref(new Date(props.opening.timeEnd)); // Time for end
const vendorId = ref("");
const isUpdating = ref(false);
const isDeleting = ref(false);
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error
const isSeriesOpening = ref(false);
const repeatWeeks = ref(1);

// Time mask for 15-minute intervals
const timeRules = ref({
  minutes: { interval: 15 },
  hours: { min: 0, max: 23 }
});

// Get services for dropdown
const services = computed<{ id: string; name: string }[]>(() => {
  if (!servicesStore.services) return [];
  return servicesStore.services.map(service => ({
    id: service.id,
    name: service.name
  }));
});

// Handle service selection
const handleServiceChange = (event:any) => {
  const selectedService = services.value.find(s => s.name === event.target.value);
  if (selectedService) {
    serviceType.value = event.target.value;
    serviceId.value = selectedService.id;
  }
};

// Days of the week for series openings
const selectedDays = ref({
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true
});

// Initialize form data from opening prop
onMounted(() => {
  serviceType.value = props.opening.serviceType;
  serviceId.value = props.opening.service;

  // Parse dates from timeStart and timeEnd
  const startDate = new Date(props.opening.timeStart);
  const endDate = new Date(props.opening.timeEnd);

  // Set the selectedDate to the start date
  selectedDate.value = new Date(startDate);

  // Set time values directly as Date objects
  startTime.value = new Date(startDate);
  endTime.value = new Date(endDate);

  console.log("Start, End: ",startTime.value, endTime.value)

  // Keep the original timeStart and timeEnd for backward compatibility
  timeStart.value = startDate;
  timeEnd.value = endDate;

  vendorId.value = props.opening.vendorId;

  // Initialize series-related values if the opening is a series
  isSeriesOpening.value = props.opening.isSeries || false;

  if (props.opening.repeatWeeks) {
    repeatWeeks.value = props.opening.repeatWeeks;
  }

  if (props.opening.selectedDays) {
    selectedDays.value = props.opening.selectedDays;
  }
});

// Handle date and time input changes
const handleDateChange = (newDate:Date) => {
  selectedDate.value = newDate;
  updateTimeStartEnd();
};

const handleStartTimeChange = (newTime:Date) => {
  startTime.value = newTime;
  updateTimeStartEnd();
};

const handleEndTimeChange = (newTime:Date) => {
  endTime.value = newTime;
  updateTimeStartEnd();
};

// Construct timeStart and timeEnd from selectedDate, startTime, and endTime
const updateTimeStartEnd = () => {
  if (!selectedDate.value || !startTime.value || !endTime.value) return;

  // Create new Date objects for start and end times
  const startDate = new Date(selectedDate.value);
  const endDate = new Date(selectedDate.value);

  // Copy hours and minutes from startTime and endTime
  startDate.setHours(
    startTime.value.getHours(),
    startTime.value.getMinutes(),
    0,
    0
  );

  endDate.setHours(
    endTime.value.getHours(),
    endTime.value.getMinutes(),
    0,
    0
  );

  // Assign the Date objects directly
  timeStart.value = new Date(startDate);
  timeEnd.value = new Date(endDate);
};

// Show status message
const showStatusMessage = (message:string, type = "success") => {
  utils.ui.showStatusMessage(message, type, 3000, statusMessage, statusType, showStatus);
};

// Validate form
const validateForm = () => {
  // Ensure we have all required inputs
  if (!selectedDate.value) {
    showStatusMessage("Please select a date", "error");
    return false;
  }

  if (!startTime.value) {
    showStatusMessage("Please select a start time", "error");
    return false;
  }

  if (!endTime.value) {
    showStatusMessage("Please select an end time", "error");
    return false;
  }

  // Compare times directly using Date objects
  if (startTime.value >= endTime.value) {
    showStatusMessage("End time must be after start time", "error");
    return false;
  }

  // Also check the constructed timeStart and timeEnd
  if (timeStart.value >= timeEnd.value) {
    showStatusMessage("End time must be after start time", "error");
    return false;
  }

  return true;
};

// Update opening
const updateOpening = async () => {
  // Validate form
  if (!validateForm()) {
    return;
  }

  // Ensure timeStart and timeEnd are updated with the latest values
  updateTimeStartEnd();

  isUpdating.value = true;

  try {
    // Create updated opening object
    let updatedOpening : Opening = {
      id: props.opening.id,
      serviceType: serviceType.value,
      serviceId: serviceId.value,
      vendorId: vendorId.value,
      timeStart: timeStart.value,
      timeEnd: timeEnd.value,
      isSeries: isSeriesOpening.value
    };

    // Add series properties if it's a series opening
    if (isSeriesOpening.value) {
      updatedOpening.repeatWeeks = repeatWeeks.value;
      updatedOpening.selectedDays = selectedDays.value;
    }

    // Send to backend
    const response = await fetch(api.vendor.openings, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify(updatedOpening)
    });

    if (response.ok) {
      showStatusMessage("Opening updated successfully!");
      // Emit updated event to refresh data in parent component
      emit('updated');
    } else {
      showStatusMessage("Failed to update opening. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error updating opening:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  isUpdating.value = false;
};

// Delete opening
const deleteOpening = async () => {
  if (!confirm("Are you sure you want to delete this opening?")) {
    return;
  }

  isDeleting.value = true;

  try {
    // Send delete request to backend
    const response = await fetch(`${api.vendor.openings}/${props.opening.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authStore.token}`
      }
    });

    if (response.ok) {
      showStatusMessage("Opening deleted successfully!");
      // Emit deleted event to refresh data and close detail view in parent component
      emit('deleted');
      emit('close');
    } else {
      showStatusMessage("Failed to delete opening. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error deleting opening:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  isDeleting.value = false;
};

// Close detail view
const closeDetailView = () => {
  emit('close');
};
</script>

<template>
  <div class="opening-detail-panel">
    <div class="detail-header">
      <button @click="closeDetailView" class="back-button">
        &larr; Back to Openings
      </button>
      <h3>Edit Opening</h3>
    </div>

    <div v-if="showStatus" class="status-message" :class="statusType">
      {{ statusMessage }}
    </div>

    <div class="detail-content">
      <form @submit.prevent="updateOpening">
        <div class="detail-section">
          <h4>Service Information</h4>
          <div class="form-group">
            <label for="serviceType">Service Type:</label>
            <select
              id="serviceType"
              v-model="serviceType"
              required
              @change="handleServiceChange"
            >
              <option value="" disabled>Select a service</option>
              <option v-for="service in services" :key="service.id" :value="service.name">
                {{ service.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="serviceId">Service ID:</label>
            <input
              id="serviceId"
              type="text"
              v-model="serviceId"
              readonly
              class="readonly-input"
            />
          </div>
        </div>

        <div class="detail-section">
          <h4>Time Information</h4>
          <div class="form-group">
            <label for="selectedDate">Date:</label>
            <VDatePicker
              v-model="selectedDate"
              @update:model-value="handleDateChange"
              :min-date="new Date()"
              is-required
            />
          </div>
          <div class="form-group">
            <label for="startTime">Start Time:</label>
            <VDatePicker
              v-model="startTime"
              mode="time"
              @update:model-value="handleStartTimeChange"
              :rules="timeRules"
              is24hr
              hide-time-header
              is-required
            />
          </div>
          <div class="form-group">
            <label for="endTime">End Time:</label>
            <VDatePicker
              v-model="endTime"
              mode="time"
              @update:model-value="handleEndTimeChange"
              :rules="timeRules"
              is24hr
              hide-time-header
              is-required
            />
          </div>
          <div class="detail-item">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">
              {{ Math.round((Number(new Date(timeEnd)) - Number(new Date(timeStart))) / (1000 * 60)) }} minutes
            </span>
          </div>
        </div>

        <div class="detail-section">
          <h4>Series Information</h4>
          <div class="form-group checkbox">
            <input
              id="isSeriesOpening"
              type="checkbox"
              v-model="isSeriesOpening"
            />
            <label for="isSeriesOpening">This is a series (repeating weekly)</label>
          </div>

          <div v-if="isSeriesOpening">
            <div class="form-group">
              <label for="repeatWeeks">Number of weeks to repeat</label>
              <input
                id="repeatWeeks"
                type="number"
                v-model="repeatWeeks"
                min="1"
                max="52"
              />
            </div>

            <div class="form-group days-selection">
              <label>Repeat on days:</label>
              <div class="days-checkboxes">
                <div class="day-checkbox">
                  <input type="checkbox" id="monday" v-model="selectedDays.monday">
                  <label for="monday">Monday</label>
                </div>
                <div class="day-checkbox">
                  <input type="checkbox" id="tuesday" v-model="selectedDays.tuesday">
                  <label for="tuesday">Tuesday</label>
                </div>
                <div class="day-checkbox">
                  <input type="checkbox" id="wednesday" v-model="selectedDays.wednesday">
                  <label for="wednesday">Wednesday</label>
                </div>
                <div class="day-checkbox">
                  <input type="checkbox" id="thursday" v-model="selectedDays.thursday">
                  <label for="thursday">Thursday</label>
                </div>
                <div class="day-checkbox">
                  <input type="checkbox" id="friday" v-model="selectedDays.friday">
                  <label for="friday">Friday</label>
                </div>
                <div class="day-checkbox">
                  <input type="checkbox" id="saturday" v-model="selectedDays.saturday">
                  <label for="saturday">Saturday</label>
                </div>
                <div class="day-checkbox">
                  <input type="checkbox" id="sunday" v-model="selectedDays.sunday">
                  <label for="sunday">Sunday</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>Additional Information</h4>
          <div class="detail-item">
            <span class="detail-label">Opening ID:</span>
            <span class="detail-value">{{ opening.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Vendor ID:</span>
            <span class="detail-value">{{ opening.vendorId }}</span>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-button" :disabled="isUpdating">
            {{ isUpdating ? 'Updating...' : 'Save Changes' }}
          </button>
          <button type="button" class="delete-button" @click="deleteOpening" :disabled="isDeleting">
            {{ isDeleting ? 'Deleting...' : 'Delete Opening' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.opening-detail-panel {
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $tertiary;
  z-index: 10;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  h3 {
    margin: 0;
    font-size: $fontMed;
  }

  .back-button {
    background-color: transparent;
    border: none;
    color: $quaternary;
    font-size: $fontNormal;
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    transition: color 0.3s;

    &:hover {
      color: darken($quaternary, 10%);
    }
  }
}

.detail-content {
  flex: 1;
}

.detail-section {
  background-color: $primary;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: $fontNormal;
    color: $quaternary;
  }
}

.detail-item {
  display: flex;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.detail-label {
  font-weight: 600;
  width: 120px;
  flex-shrink: 0;
}

.detail-value {
  flex: 1;
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 6px;
    border: none;
    background-color: lighten($primary, 5%);
    font-family: "Outfit", sans-serif;
    font-size: $fontNormal;

    &:focus {
      outline: 2px solid $secondary;
    }
  }

  .readonly-input {
    background-color: darken($primary, 5%);
    color: $quaternary;
    cursor: not-allowed;
  }
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

.save-button {
  padding: 0.75rem 1.5rem;
  background-color: $secondary;
  color: $primary;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  transition: background-color 0.3s;

  &:hover:not(:disabled) {
    background-color: darken($secondary, 10%);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.delete-button {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c; // Red color for delete button
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  transition: background-color 0.3s;

  &:hover:not(:disabled) {
    background-color: darken(#e74c3c, 10%);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.status-message {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;

  &.success {
    background-color: rgba(0, 128, 0, 0.1);
    color: green;
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.1);
    color: red;
  }
}

.days-selection {
  margin-bottom: 1.5rem;
}

.days-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.day-checkbox {
  display: flex;
  align-items: center;
  background-color: lighten($primary, 5%);
  padding: 0.5rem;
  border-radius: 4px;

  input {
    margin-right: 0.5rem;
    width: auto;
  }

  label {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
}
</style>
