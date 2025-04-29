<script setup lang="ts">
import { ref, computed } from "vue";
import { useVendorStore } from "@/stores/VendorStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useServicesStore } from "@/stores/ServiceStore";
import api from "@/router/api";
import data from "@/data"; // Still needed for openings data

const vendorStore = useVendorStore();
const authStore = useAuthStore();
const servicesStore = useServicesStore();

// Form data
const serviceType = ref("");
const serviceId = ref(0);
const timeStart = ref("");
const timeEnd = ref("");
const isSeriesOpening = ref(false);
const repeatWeeks = ref(1);
const buttonText = ref("Create Opening");
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error

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
const services = computed(() => {
  if (!servicesStore.services) return [];
  return servicesStore.services.map(service => ({
    id: service.id,
    name: service.name
  }));
});

// Handle service selection
const handleServiceChange = (event) => {
  const selectedService = services.value.find(s => s.name === event.target.value);
  if (selectedService) {
    serviceType.value = event.target.value;
    serviceId.value = selectedService.id;
  }
};

// Show status message
const showStatusMessage = (message, type = "success") => {
  statusMessage.value = message;
  statusType.value = type;
  showStatus.value = true;
  setTimeout(() => {
    showStatus.value = false;
  }, 3000);
};

// Handle form submission
const onSubmit = async function(e) {
  e.preventDefault();
  buttonText.value = "Creating...";

  try {
    // Create opening object
    const opening = {
      id: 0, // Backend will assign real ID
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
      serviceId.value = 0;
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
        <label for="timeStart">Start Time</label>
        <input
          id="timeStart"
          type="datetime-local"
          v-model="timeStart"
          required
        >
      </div>

      <div class="form-group">
        <label for="timeEnd">End Time</label>
        <input
          id="timeEnd"
          type="datetime-local"
          v-model="timeEnd"
          required
        >
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
      <h3>Current Openings</h3>
      <div class="openings-list">
        <!-- TODO: Update to use VendorStore data when available instead of data.openings -->
        <div v-for="opening in data.openings" :key="opening.id" class="opening-item">
          <div class="opening-service">{{ opening.serviceType }}</div>
          <div class="opening-time">
            {{ new Date(opening.timeStart).toLocaleString() }} -
            {{ new Date(opening.timeEnd).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
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
