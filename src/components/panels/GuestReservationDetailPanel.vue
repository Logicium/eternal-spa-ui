<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, onMounted, watch } from 'vue';
import utils from "@/utils/utils.ts";
import type { Reservation } from "@/interfaces";
import { DatePicker as VDatePicker } from "v-calendar";
import Timeslot from "@/components/cards/Timeslot.vue";
import api from "@/router/api.ts";
import { useAuthStore } from "@/stores/AuthStore";

// Compare dates without timezone issues
const compareDates = function(unixTimestamp: string, dateString: any) {
  const firstDate = new Date(unixTimestamp);
  const secondDate = new Date(dateString);
  return (firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
    && firstDate.getMonth() === secondDate.getMonth()
    && firstDate.getDate() === secondDate.getDate());
};

// Define props
const props = defineProps({
  reservation: {
    type: Object as () => Reservation,
    required: true
  }
});

// Define emits
const emit = defineEmits(['close', 'reschedule', 'cancel']);

// Initialize auth store
const authStore = useAuthStore();

// State for confirmation dialogs
const showCancelConfirm = ref(false);
const showRescheduleOptions = ref(false);
const isRescheduling = ref(false);
const selectedDate = ref(new Date());
const availableTimeslots = ref<any[]>([]);
const selectedTimeslot = ref<any | null>(null);
const isLoading = ref(false);
const isLoadingDates = ref(false);
const availableDates = ref<Date[]>([]);
const allBookings = ref<any[]>([]);

// DatePicker attributes to mark dates with available timeslots
const attributes = ref([{
  dot: true,
  dates: availableDates.value,
}]);

// Check if reservation is more than 24 hours away
const canReschedule = computed(() => {
  const now = new Date();
  const reservationTime = new Date(props.reservation.timeStart);
  // Calculate the difference in milliseconds
  const timeDifference = reservationTime.getTime() - now.getTime();
  // Convert to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  return hoursDifference > 24;
});

// Format date and time
const formatDateTime = (dateTimeString: string) => {
  return utils.date.formatDateTime(dateTimeString);
};

// Format time
const formatTime = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return formatter.format(date);
};

// Format price
const formatPrice = (price: number) => {
  return utils.calc.formatPrice(price);
};

// Close detail view
const closeDetailView = () => {
  emit('close');
};

// Update available dates from allBookings
const updateAvailableDates = () => {
  isLoadingDates.value = true;
  try {
    // Extract unique dates from the allBookings using a more reliable date comparison
    const uniqueDates = new Map<string, Date>();

    allBookings.value.forEach((booking: any) => {
      const bookingDate = new Date(booking.timeStart);
      const dateKey = `${bookingDate.getFullYear()}-${bookingDate.getMonth()}-${bookingDate.getDate()}`;

      if (!uniqueDates.has(dateKey)) {
        uniqueDates.set(dateKey, bookingDate);
      }
    });

    // Convert the unique dates to an array
    availableDates.value = Array.from(uniqueDates.values());

    // Update the attributes with the new dates
    attributes.value = [{
      dot: true,
      dates: availableDates.value,
    }];

    if (availableDates.value.length === 0) {
      console.info(`No available dates found for the selected service`);
    }
  } catch (error) {
    console.error('Error updating available dates:', error);
    availableDates.value = [];
  } finally {
    isLoadingDates.value = false;
  }
};

// Fetch all bookings for the selected service
const fetchAllBookings = async () => {
  isLoading.value = true;
  try {
    // Get the service name from the reservation
    const serviceName = props.reservation.service?.name;

    if (!serviceName) {
      console.warn('No service name found in reservation');
      allBookings.value = [];
      return;
    }

    // Fetch all bookings
    const response = await fetch(api.bookings);
    if (response.ok) {
      const bookingsData = await response.json();

      // Filter bookings by service type
      allBookings.value = bookingsData.filter((booking: any) =>
        booking.serviceType === serviceName
      ).map((booking: any) => ({
        ...booking,
        selected: false
      }));

      if (allBookings.value.length === 0) {
        console.info(`No available bookings found for service: ${serviceName}`);
      }
    } else {
      console.error('Failed to fetch bookings');
      allBookings.value = [];
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    allBookings.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Toggle reschedule options
const toggleRescheduleOptions = () => {
  showRescheduleOptions.value = !showRescheduleOptions.value;
  if (showRescheduleOptions.value) {
    // Initialize with the current reservation date
    selectedDate.value = new Date(props.reservation.timeStart);
    // Fetch all bookings once
    fetchAllBookings().then(() => {
      // After fetching all bookings, update available dates and timeslots
      updateAvailableDates();
      updateAvailableTimeslots();
    });
  }
};

// Update available timeslots from allBookings based on the selected date
const updateAvailableTimeslots = () => {
  isLoading.value = true;
  try {
    // Filter timeslots by date using compareDates function to avoid timezone issues
    const filteredBookings = allBookings.value.filter((booking: any) => {
      return compareDates(booking.timeStart, selectedDate.value);
    });

    availableTimeslots.value = filteredBookings.map((booking: any) => ({
      ...booking,
      selected: false
    }));

    if (filteredBookings.length === 0) {
      console.info(`No available timeslots found for the selected date: ${selectedDate.value.toDateString()}`);
    }
  } catch (error) {
    console.error('Error updating available timeslots:', error);
    availableTimeslots.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Select a timeslot
const selectTimeslot = (id: string) => {
  availableTimeslots.value.forEach(timeslot => {
    if (timeslot.id === id) {
      timeslot.selected = true;
      selectedTimeslot.value = timeslot;
    } else {
      timeslot.selected = false;
    }
  });
};

// Save reschedule changes
const saveRescheduleChanges = async () => {
  if (!selectedTimeslot.value) {
    alert('Please select a new time for your reservation.');
    return;
  }

  isRescheduling.value = true;
  try {
    // Prepare the updated reservation data
    const updatedReservation = {
      ...props.reservation,
      timeStart: selectedTimeslot.value.timeStart,
      timeEnd: selectedTimeslot.value.timeEnd
    };

    // Call the API to update the reservation
    const response = await fetch(`${api.reservations}/update/${props.reservation.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(updatedReservation)
    });

    if (response.ok) {
      // Reset the UI state
      showRescheduleOptions.value = false;
      selectedTimeslot.value = null;

      // Notify the parent component
      const updatedData = await response.json();
      emit('reschedule', updatedData);
    } else {
      alert('Failed to reschedule reservation. Please try again.');
    }
  } catch (error) {
    console.error('Error rescheduling reservation:', error);
    alert('An error occurred while rescheduling your reservation. Please try again.');
  } finally {
    isRescheduling.value = false;
  }
};

// Cancel reschedule
const cancelReschedule = () => {
  showRescheduleOptions.value = false;
  selectedTimeslot.value = null;
};

// Show cancel confirmation
const showCancelConfirmation = () => {
  showCancelConfirm.value = true;
};

// Cancel reservation
const cancelReservation = async () => {
  try {
    // Call the API to cancel the reservation
    const response = await fetch(`${api.reservations}/cancel/${props.reservation.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.ok) {
      // Notify the parent component
      emit('cancel', props.reservation);
    } else {
      alert('Failed to cancel reservation. Please try again.');
    }
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    alert('An error occurred while cancelling your reservation. Please try again.');
  } finally {
    showCancelConfirm.value = false;
  }
};

// Hide cancel confirmation
const hideCancelConfirmation = () => {
  showCancelConfirm.value = false;
};

// Watch for date changes to update available timeslots
watch(selectedDate, () => {
  updateAvailableTimeslots();
});

// Initialize component
onMounted(() => {
  // Any initialization logic can go here
});
</script>

<template>
  <div class="reservation-detail-panel">
    <div class="detail-header">
      <button @click="closeDetailView" class="back-button">
        &larr; Back to Reservations
      </button>
      <h3>Reservation Details</h3>
    </div>

    <div class="detail-content">
      <div class="detail-section">
        <h4>Service Information</h4>
        <div class="detail-item">
          <span class="detail-label">Service:</span>
          <span class="detail-value">{{ reservation.service?.name || 'N/A' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Package:</span>
          <span class="detail-value">{{ reservation.package?.name || 'N/A' }}</span>
        </div>
      </div>

      <div class="detail-section">
        <h4>Time Information</h4>
        <div class="detail-item">
          <span class="detail-label">Start Time:</span>
          <span class="detail-value">{{ formatDateTime(reservation.timeStart) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">End Time:</span>
          <span class="detail-value">{{ formatDateTime(reservation.timeEnd) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Duration:</span>
          <span class="detail-value">{{ reservation.totalDuration }}</span>
        </div>

        <!-- Reschedule Button -->
        <div class="reschedule-section" v-if="reservation.status !== 'cancelled'">
          <button
            class="action-button reschedule"
            @click="toggleRescheduleOptions"
            :disabled="!canReschedule || isRescheduling"
            :class="{ 'disabled': !canReschedule }"
          >
            {{ showRescheduleOptions ? 'Hide Reschedule Options' : 'Reschedule' }}
          </button>
          <div v-if="!canReschedule" class="reschedule-notice">
            Reservations can only be rescheduled more than 24 hours in advance.
          </div>
        </div>

        <!-- Reschedule Options -->
        <div v-if="showRescheduleOptions" class="reschedule-options">
          <h5>Select a New Date and Time</h5>

          <!-- Date Picker -->
          <div class="date-picker-container">
            <div v-if="isLoadingDates" class="loading-dates">
              Loading available dates...
            </div>
            <VDatePicker
              v-model="selectedDate"
              :min-date="new Date()"
              :attributes="attributes"
              transparent
              borderless
              expanded
              is-required
            />
          </div>

          <!-- Timeslots -->
          <div class="timeslots-container">
            <h5>Available Times for {{ selectedDate.toDateString() }}</h5>

            <div v-if="isLoading" class="loading">
              Loading available times...
            </div>

            <div v-else-if="availableTimeslots.length === 0" class="empty-timeslots">
              No available times for this date. Please select another date.
            </div>

            <div v-else class="timeslots">
              <Timeslot
                v-for="timeslot in availableTimeslots"
                :key="timeslot.id"
                :selected="timeslot.selected"
                :time="formatTime(new Date(timeslot.timeStart))"
                @click="selectTimeslot(timeslot.id)"
              />
            </div>
          </div>

          <!-- Reschedule Action Buttons -->
          <div class="reschedule-actions">
            <button
              class="action-button save"
              @click="saveRescheduleChanges"
              :disabled="!selectedTimeslot || isRescheduling"
            >
              {{ isRescheduling ? 'Saving...' : 'Save Changes' }}
            </button>
            <button
              class="action-button cancel-reschedule"
              @click="cancelReschedule"
              :disabled="isRescheduling"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h4>Payment Information</h4>
        <div class="detail-item">
          <span class="detail-label">Total Price:</span>
          <span class="detail-value">{{ formatPrice(reservation.totalPrice) }}</span>
        </div>
        <div class="detail-item" v-if="reservation.receiptUrl">
          <span class="detail-label">Receipt:</span>
          <span class="detail-value">
            <a :href="reservation.receiptUrl" target="_blank" class="receipt-link">View Receipt</a>
          </span>
        </div>
      </div>

      <div class="detail-section">
        <h4>Additional Information</h4>
        <div class="detail-item">
          <span class="detail-label">Reservation ID:</span>
          <span class="detail-value">{{ reservation.id }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Status:</span>
          <span class="detail-value">{{ reservation.status}}</span>
        </div>
      </div>

      <div class="action-buttons" v-if="reservation.status !== 'cancelled'">
        <button class="action-button cancel" @click="showCancelConfirmation">
          Cancel Reservation
        </button>
      </div>

      <!-- Cancel Confirmation Dialog -->
      <div v-if="showCancelConfirm" class="confirmation-dialog">
        <div class="confirmation-content">
          <h4>Cancel Reservation</h4>
          <p>Are you sure you want to cancel this reservation? This action cannot be undone.</p>
          <div class="confirmation-buttons">
            <button class="confirm-button" @click="cancelReservation">Yes, Cancel</button>
            <button class="cancel-button" @click="hideCancelConfirmation">No, Keep Reservation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.reservation-detail-panel {
  background-color: $tertiary;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
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

  h5 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
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

.receipt-link {
  color: $quaternary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: $fontNormal;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;

  &.reschedule {
    background-color: $secondary;
    color: $quaternary;

    &:hover:not(:disabled) {
      background-color: darken($secondary, 10%);
    }
  }

  &.cancel {
    background-color: #f44336;
    color: white;

    &:hover:not(:disabled) {
      background-color: darken(#f44336, 10%);
    }
  }

  &.save {
    background-color: #4CAF50;
    color: white;

    &:hover:not(:disabled) {
      background-color: darken(#4CAF50, 10%);
    }
  }

  &.cancel-reschedule {
    background-color: $secondary;
    color: $quaternary;

    &:hover:not(:disabled) {
      background-color: darken($secondary, 10%);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.reschedule-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.reschedule-notice {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #f44336;
}

.reschedule-options {
  margin-top: 1rem;
  padding: 1rem;
  background-color: $secondary;
  border-radius: 6px;
}

.date-picker-container {
  background-color: $tertiary;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.timeslots-container {
  margin-top: 1rem;
}

.timeslots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: $fontNormal;
  color: $quaternary;
}

.empty-timeslots {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: $fontNormal;
  color: $quaternary;
  background-color: $tertiary;
  border-radius: 6px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.loading-dates {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: $fontNormal;
  color: $quaternary;
  margin-bottom: 0.5rem;
}

.reschedule-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.confirmation-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.confirmation-content {
  background-color: $tertiary;
  padding: 2rem;
  border-radius: 6px;
  max-width: 500px;
  width: 100%;
  text-align: center;

  h4 {
    margin-top: 0;
    font-size: $fontMed;
    color: $quaternary;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.confirmation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: $fontNormal;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .confirm-button {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: darken(#f44336, 10%);
    }
  }

  .cancel-button {
    background-color: $secondary;
    color: $quaternary;

    &:hover {
      background-color: darken($secondary, 10%);
    }
  }
}
</style>
