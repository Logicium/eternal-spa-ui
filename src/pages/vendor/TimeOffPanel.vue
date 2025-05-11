<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useVendorStore } from "@/stores/VendorStore";
import { useAuthStore } from "@/stores/AuthStore";
import api from "@/router/api";
import utils from "@/utils/utils";
import { DatePicker as VDatePicker } from 'v-calendar';

const vendorStore = useVendorStore();
const authStore = useAuthStore();

// Form data
const timeStart = ref(new Date()); // Will be constructed from selectedDate and startTime
const timeEnd = ref(new Date()); // Will be constructed from selectedDate and endTime
const selectedDate = ref(new Date()); // Single date for both start and end
const startTime = ref(new Date()); // Time for start
const endTime = ref(new Date()); // Time for end
const isSeriesTimeOff = ref(false);
const repeatWeeks = ref(1);
const buttonText = ref("Create Time Off");
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error
const minDate = ref(new Date()); // Minimum date for datetime inputs
const reason = ref(""); // Reason for time off

// Time rules for 15-minute intervals
const timeRules = ref({
  minutes: { interval: 15 },
  hours: { min: 0, max: 23 }
});

// Days of the week for series time off
const selectedDays = ref({
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true
});

// Show status message
const showStatusMessage = (message:string, type = "success") => {
  utils.ui.showStatusMessage(message, type, 3000, statusMessage, statusType, showStatus);
};

// Initialize minimum date and time values on component mount
onMounted(() => {
  // Set minimum date to today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  minDate.value = today;

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
    // Create time off object
    const timeOff = {
      id: 0, // Backend will assign real ID
      vendorId: vendorStore.vendor?.id || '',
      timeStart: timeStart.value,
      timeEnd: timeEnd.value,
      reason: reason.value,
      isSeries: isSeriesTimeOff.value,
      repeatWeeks : 0,
      selectedDays: {},
      type: 'timeoff'
    };

    // Add series properties if it's a series time off
    if (isSeriesTimeOff.value) {
      timeOff.repeatWeeks = repeatWeeks.value;
      timeOff.selectedDays = selectedDays.value;
    }

    console.log("Time Off:", timeOff);
    // Send to backend
    const response = await fetch(api.vendor.timeoff, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify(timeOff)
    });

    if (response.ok) {
      // Reset form
      reason.value = "";
      isSeriesTimeOff.value = false;
      repeatWeeks.value = 1;

      // Reset date and time values
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selectedDate.value = new Date(today);

      const defaultStartTime = new Date(today);
      defaultStartTime.setHours(9, 0, 0, 0);
      startTime.value = new Date(defaultStartTime);

      const defaultEndTime = new Date(today);
      defaultEndTime.setHours(10, 0, 0, 0);
      endTime.value = new Date(defaultEndTime);

      // Update timeStart and timeEnd with the reset values
      updateTimeStartEnd();

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

      showStatusMessage(isSeriesTimeOff.value ? "Time off series created successfully!" : "Time off created successfully!");
    } else {
      showStatusMessage("Failed to create time off. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error creating time off:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  buttonText.value = "Create Time Off";
};
</script>

<template>
  <div class="timeoff-panel">
    <h2>Schedule Time Off</h2>

    <div v-if="showStatus" class="status-message" :class="statusType">
      {{ statusMessage }}
    </div>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="reason">Reason for Time Off</label>
        <input
          id="reason"
          type="text"
          v-model="reason"
          placeholder="Vacation, Personal Day, etc."
          required
        >
      </div>

      <div class="form-group">
        <label for="selectedDate">Date</label>
        <VDatePicker
          v-model="selectedDate"
          @update:model-value="handleDateChange"
          :min-date="minDate"
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
          id="isSeriesTimeOff"
          type="checkbox"
          v-model="isSeriesTimeOff"
        >
        <label for="isSeriesTimeOff">Create as series (repeating weekly)</label>
      </div>

      <div class="form-group" v-if="isSeriesTimeOff">
        <label for="repeatWeeks">Number of weeks to repeat</label>
        <input
          id="repeatWeeks"
          type="number"
          v-model="repeatWeeks"
          min="1"
          max="52"
        >
      </div>

      <div class="form-group days-selection" v-if="isSeriesTimeOff">
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

    <div class="current-timeoffs">
      <h3>Current Time Off</h3>
      <div class="timeoffs-list">
        <div v-if="vendorStore.vendor && vendorStore.vendor.timeOff && vendorStore.vendor.timeOff.filter(item => item.type === 'timeoff').length > 0">
          <div v-for="timeoff in vendorStore.vendor.timeOff.filter(item => item.type === 'timeoff')" :key="timeoff.id" class="timeoff-item">
            <div class="timeoff-reason">{{ timeoff.reason }}</div>
            <div class="timeoff-time">
              {{ new Date(timeoff.timeStart).toLocaleString() }} -
              {{ new Date(timeoff.timeEnd).toLocaleString() }}
            </div>
          </div>
        </div>
        <div v-else class="no-timeoffs">
          No scheduled time off
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.timeoff-panel {
  padding: 2rem;
  padding-bottom: 0;
  background-color: $tertiary;
  height: calc(100vh - 2rem);

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

.current-timeoffs {
  margin-top: 3rem;
}

.timeoffs-list {
  display: grid;
  grid-gap: 1rem;
}

.timeoff-item {
  background-color: $primary;
  padding: 1rem;
  border-radius: 6px;

  .timeoff-reason {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .timeoff-time {
    font-size: 0.9rem;
    color: $quaternary;
  }
}

.no-timeoffs {
  background-color: $primary;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  color: $quaternary;
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
</style>
