<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/AuthStore";
import api from "@/router/api";
import utils from "@/utils/utils";

const authStore = useAuthStore();

// Define props
const props = defineProps({
  opening: {
    type: Object,
    required: true
  }
});

// Define emits
const emit = defineEmits(['close', 'updated']);

// Form data
const serviceType = ref("");
const serviceId = ref(0);
const timeStart = ref("");
const timeEnd = ref("");
const vendorId = ref("");
const isUpdating = ref(false);
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error

// Initialize form data from opening prop
onMounted(() => {
  serviceType.value = props.opening.serviceType;
  serviceId.value = props.opening.serviceId;

  // Format dates for datetime-local input
  const startDate = new Date(props.opening.timeStart);
  const endDate = new Date(props.opening.timeEnd);

  timeStart.value = formatDateForInput(startDate);
  timeEnd.value = formatDateForInput(endDate);

  vendorId.value = props.opening.vendorId;
});

// Format date for datetime-local input (YYYY-MM-DDTHH:MM)
const formatDateForInput = (date) => {
  return utils.date.formatDateForInput(date);
};

// Round time to nearest 15-minute interval
const roundToNearest15Minutes = (dateTimeStr) => {
  return utils.date.roundToNearest15Minutes(dateTimeStr);
};

// Handle time input changes
const handleTimeStartChange = (event) => {
  timeStart.value = roundToNearest15Minutes(event.target.value);
};

const handleTimeEndChange = (event) => {
  timeEnd.value = roundToNearest15Minutes(event.target.value);
};

// Show status message
const showStatusMessage = (message, type = "success") => {
  utils.ui.showStatusMessage(message, type, 3000, statusMessage, statusType, showStatus);
};

// Validate form
const validateForm = () => {
  // Check if end time is after start time
  if (!utils.form.validateTimeRange(timeStart.value, timeEnd.value)) {
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

  isUpdating.value = true;

  try {
    // Create updated opening object
    const updatedOpening = {
      id: props.opening.id,
      serviceType: serviceType.value,
      serviceId: serviceId.value,
      vendorId: vendorId.value,
      timeStart: timeStart.value,
      timeEnd: timeEnd.value
    };

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
            <input
              id="serviceType"
              type="text"
              v-model="serviceType"
              required
            />
          </div>
          <div class="form-group">
            <label for="serviceId">Service ID:</label>
            <input
              id="serviceId"
              type="number"
              v-model="serviceId"
              required
            />
          </div>
        </div>

        <div class="detail-section">
          <h4>Time Information</h4>
          <div class="form-group">
            <label for="timeStart">Start Time:</label>
            <input
              id="timeStart"
              type="datetime-local"
              v-model="timeStart"
              @change="handleTimeStartChange"
              step="900"
              required
            />
          </div>
          <div class="form-group">
            <label for="timeEnd">End Time:</label>
            <input
              id="timeEnd"
              type="datetime-local"
              v-model="timeEnd"
              @change="handleTimeEndChange"
              step="900"
              required
            />
          </div>
          <div class="detail-item">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">
              {{ Math.round((new Date(timeEnd) - new Date(timeStart)) / (1000 * 60)) }} minutes
            </span>
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
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/Library";

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

  input {
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
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
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
</style>
