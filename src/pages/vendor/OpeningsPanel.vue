<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useVendorStore } from "@/stores/VendorStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useServicesStore } from "@/stores/ServiceStore";
import api from "@/router/api";
import OpeningDetailPanel from "@/components/panels/OpeningDetailPanel.vue";
import utils from "@/utils/utils.ts";
import type { Opening, Service } from "@/interfaces";
import { DatePicker as VDatePicker } from 'v-calendar';
// No longer need to import data as we're using vendor object for openings

const vendorStore = useVendorStore();
const authStore = useAuthStore();
const servicesStore = useServicesStore();

// Selected opening for detail view
const selectedOpening = ref<Opening | null>(null);
const showDetailView = ref(false);

// Form data
const serviceType = ref("");
const serviceId = ref("");
const timeStart = ref(new Date()); // Will be constructed from selectedDate and startTime
const timeEnd = ref(new Date()); // Will be constructed from selectedDate and endTime
const selectedDate = ref(new Date()); // Single date for both start and end
const startTime = ref(new Date()); // Time for start
const endTime = ref(new Date()); // Time for end
const isSeriesOpening = ref(false);
const repeatWeeks = ref(1);
const buttonText = ref("Create Opening");
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error
const minDate = ref(""); // Minimum date for datetime inputs
const isLoading = ref(false); // Loading state for openings list

// Time mask for 15-minute intervals
const timeRules = ref({
  minutes: { interval: 15 },
  hours: { min: 0, max: 23 }
});

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

// Show status message
const showStatusMessage = (message:string, type = "success") => {
  utils.ui.showStatusMessage(message, type, 3000, statusMessage, statusType, showStatus);
};

// Refresh vendor data from the server
const refreshVendorData = async () => {
  isLoading.value = true;
  try {
    if (authStore.token) {
      await vendorStore.fill(authStore.token);
    }
  } catch (error) {
    console.error('Error refreshing vendor data:', error);
    showStatusMessage('An error occurred while refreshing data.', 'error');
  } finally {
    isLoading.value = false;
  }
};

// Open detail view for an opening
const openDetailView = (opening:Opening) => {
  selectedOpening.value = opening;
  showDetailView.value = true;
};

// Close detail view
const closeDetailView = () => {
  showDetailView.value = false;
  // Reset selected opening after transition completes
  setTimeout(() => {
    selectedOpening.value = null;
  }, 500); // Match transition duration
};

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

// Initialize minimum date and refresh vendor data on component mount
onMounted(async () => {
  // Set minimum date to today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Format date using utility function for minDate (if still needed)
  minDate.value = utils.date.formatDateToLocalISOString(today);

  // Initialize selectedDate to today
  selectedDate.value = new Date(today);

  // Initialize startTime and endTime with default values (9:00 AM and 10:00 AM)
  const defaultStartTime = new Date(today);
  defaultStartTime.setHours(9, 0, 0, 0);
  startTime.value = new Date(defaultStartTime);

  const defaultEndTime = new Date(today);
  defaultEndTime.setHours(10, 0, 0, 0);
  endTime.value = new Date(defaultEndTime);

  // Update timeStart and timeEnd with the combined date and time
  updateTimeStartEnd();

  // Refresh vendor data if needed
  if (!vendorStore.vendor || !vendorStore.vendor.openings) {
    await refreshVendorData();
  }
});

// These functions are no longer needed as we're using v-calendar DatePicker directly

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

// Handle form submission
const onSubmit = async function(e:any) {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Ensure timeStart and timeEnd are updated with the latest values
  updateTimeStartEnd();

  buttonText.value = "Creating...";

  try {
    // Create opening object
    const opening: Opening = {
      id: "", // Backend will assign real ID
      serviceType: serviceType.value,
      serviceId: serviceId.value,
      vendorId: vendorStore.vendor?.id || '',
      timeStart: timeStart.value,
      timeEnd: timeEnd.value,
      isSeries: isSeriesOpening.value
    };

    // Add series properties if it's a series opening
    if (isSeriesOpening.value) {
      opening.repeatWeeks = repeatWeeks.value;
      opening.selectedDays = selectedDays.value;
    }

    console.log("Opening:", opening);
    // Send to backend
    const response = await fetch(api.vendor.openings, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify( opening )
    });

    if (response.ok) {
      // Reset form
      serviceType.value = "";
      serviceId.value = "";
      timeStart.value = "";
      timeEnd.value = "";
      isSeriesOpening.value = false;
      repeatWeeks.value = 1;

      // Reset selected days to all selected
      selectedDays.value = {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      };

      // Refresh vendor data to show the new opening
      await refreshVendorData();

      showStatusMessage(isSeriesOpening.value ? "Opening series created successfully!" : "Opening created successfully!");
    } else {
      showStatusMessage("Failed to create opening. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error creating opening:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  buttonText.value = "Create Opening";
};

</script>

<template>
  <div class="openings-panel">
    <!-- Detail View Panel -->
    <transition name="slide-right">
      <OpeningDetailPanel
        v-if="showDetailView && selectedOpening"
        :opening="selectedOpening"
        @close="closeDetailView"
        @updated="refreshVendorData"
        @deleted="refreshVendorData"
      />
    </transition>
    <!-- Use transition to manage visibility of main content -->
    <transition name="fade" mode="out-in">
      <div v-show="!showDetailView" key="main-content" class="main-content">
        <h2>Create Schedule Opening</h2>

        <div v-if="showStatus" class="status-message" :class="statusType">
          {{ statusMessage }}
        </div>

        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="serviceType">Service Type</label>
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
            <label for="selectedDate">Date</label>
            <VDatePicker
              v-model="selectedDate"
              @update:model-value="handleDateChange"
              :min-date="new Date()"
              is-required
            />
          </div>

          <div class="form-group">
            <label for="startTime">Start Time</label>
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
            <label for="endTime">End Time</label>
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

          <div class="form-group checkbox">
            <input
              id="isSeriesOpening"
              type="checkbox"
              v-model="isSeriesOpening"
            >
            <label for="isSeriesOpening">Create as series (repeating weekly)</label>
          </div>

          <div class="form-group" v-if="isSeriesOpening">
            <label for="repeatWeeks">Number of weeks to repeat</label>
            <input
              id="repeatWeeks"
              type="number"
              v-model="repeatWeeks"
              min="1"
              max="52"
            >
          </div>

          <div class="form-group days-selection" v-if="isSeriesOpening">
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

          <div class="form-actions">
            <button type="submit" class="button">{{ buttonText }}</button>
          </div>
        </form>

        <div class="current-openings">
          <div class="openings-header">
            <h3>Current Openings</h3>
            <button @click="refreshVendorData" class="refresh-button">Refresh</button>
          </div>
          <div v-if="isLoading" class="loading-state">
            Loading openings...
          </div>
          <div v-else class="openings-list">
            <div v-if="vendorStore.vendor && vendorStore.vendor.openings && vendorStore.vendor.openings.length > 0">
              <div
                v-for="opening in vendorStore.vendor.openings"
                :key="opening.id"
                class="opening-item"
                @click="openDetailView(opening)"
              >
                <div class="opening-service">{{ opening.serviceType }}</div>
                <div class="opening-time">
                  {{ new Date(opening.timeStart).toLocaleString() }} -
                  {{ new Date(opening.timeEnd).toLocaleString() }}
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              No openings found. Create a new opening using the form above.
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.openings-panel {
  padding: 2rem;
  padding-bottom: 0;
  background-color: $tertiary;
  height: calc(100vh - 2rem);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  h2 {
    margin-bottom: 1.5rem;
    font-size: $fontMed;
  }

  h3 {
    margin: 2rem 0 1rem;
    font-size: $fontNormal;
  }
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 6px;
    border: none;
    background-color: $primary;
    font-family: "Outfit", sans-serif;
    font-size: $fontNormal;
  }

  &.checkbox {
    display: flex;
    align-items: center;

    input {
      width: auto;
      margin-right: 0.5rem;
    }

    label {
      margin-bottom: 0;
    }
  }
}

.form-actions {
  margin-top: 2rem;

  button {
    padding: 0.75rem 1.5rem;
    background-color: $secondary;
    color: $primary;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: "Outfit", sans-serif;
    font-size: $fontNormal;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken($secondary, 10%);
    }
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

.current-openings {
  margin-top: 3rem;
}

.openings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.refresh-button {
  padding: 0.5rem 1rem;
  background-color: $secondary;
  color: $primary;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($secondary, 10%);
  }
}

.openings-list {
  display: grid;
  grid-gap: 1rem;
}

.opening-item {
  background-color: $primary;
  padding: 1rem;
  border-radius: 6px;

  .opening-service {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .opening-time {
    font-size: 0.9rem;
    color: $quaternary;
  }
}

.empty-state {
  padding: 1rem;
  background-color: $primary;
  border-radius: 6px;
  text-align: center;
  color: $quaternary;
  font-size: 0.9rem;
}

.loading-state {
  padding: 1rem;
  background-color: $primary;
  border-radius: 6px;
  text-align: center;
  color: $quaternary;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: $primary;
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

/* Detail View Styles moved to OpeningDetailPanel.vue component */

/* Make opening items clickable */
.opening-item {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

/* Main content container */
.main-content {
  width: 100%;
  transition: opacity 0.3s ease;
}
</style>
