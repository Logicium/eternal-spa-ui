<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useVendorStore } from "../../stores/VendorStore";
import { useAuthStore } from "../../stores/AuthStore";
import api from "../../router/api";

const vendorStore = useVendorStore();
const authStore = useAuthStore();
const reservations = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');

// Function to format date and time
const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Get vendor reservations from the vendor object
const getReservations = () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    if (vendorStore.vendor && vendorStore.vendor.reservations) {
      // Filter only confirmed reservations
      reservations.value = vendorStore.vendor.reservations.filter(reservation => reservation.confirmed);
    } else {
      errorMessage.value = 'No reservations found.';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred while getting reservations.';
    console.error('Error getting reservations:', error);
  } finally {
    isLoading.value = false;
  }
};

// Refresh vendor data from the server
const refreshVendorData = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    if (authStore.token) {
      await vendorStore.fill(authStore.token);
      getReservations();
    } else {
      errorMessage.value = 'Authentication required.';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred while refreshing data.';
    console.error('Error refreshing vendor data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (vendorStore.vendor) {
    getReservations();
  }
});
</script>

<template>
  <div class="reservations-panel">
    <h2>Confirmed Reservations</h2>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="loading">
      Loading reservations...
    </div>

    <div v-else-if="reservations.length === 0" class="empty-state">
      No confirmed reservations found.
    </div>

    <div v-else class="reservations-list">
      <div class="reservation-header">
        <div class="header-item">Guest</div>
        <div class="header-item">Service</div>
        <div class="header-item">Package</div>
        <div class="header-item">Start Time</div>
        <div class="header-item">End Time</div>
        <div class="header-item">Duration</div>
        <div class="header-item">Price</div>
        <div class="header-item">Receipt</div>
      </div>

      <div v-for="reservation in reservations" :key="reservation.id" class="reservation-item">
        <div class="reservation-detail">{{ reservation.name }}</div>
        <div class="reservation-detail">{{ reservation.service?.name || 'N/A' }}</div>
        <div class="reservation-detail">{{ reservation.package?.name || 'N/A' }}</div>
        <div class="reservation-detail">{{ formatDateTime(reservation.timeStart) }}</div>
        <div class="reservation-detail">{{ formatDateTime(reservation.timeEnd) }}</div>
        <div class="reservation-detail">{{ reservation.totalDuration }}</div>
        <div class="reservation-detail">{{ formatPrice(reservation.totalPrice) }}</div>
        <div class="reservation-detail">
          <a v-if="reservation.receiptUrl" :href="reservation.receiptUrl" target="_blank" class="receipt-link">View Receipt</a>
          <span v-else>No receipt</span>
        </div>
      </div>
    </div>

    <div class="refresh-button">
      <button @click="refreshVendorData" class="button primary">Refresh</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.reservations-panel {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: $fontMed;
}

.loading, .empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: $fontNormal;
  color: $quaternary;
  background-color: $primary;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.error-message {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  background-color: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.reservations-list {
  background-color: $primary;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.reservation-header {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background-color: $secondary;
  padding: 1rem;
  font-weight: 600;
}

.header-item {
  padding: 0.5rem;
}

.reservation-item {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 1rem;
  border-bottom: 1px solid $secondary;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
}

.reservation-detail {
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.receipt-link {
  color: $quaternary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.refresh-button {
  display: flex;
  justify-content: flex-end;
}

.button {
  height: 45px;
  padding: 0 2rem;
  border-radius: 6px;
  border: none;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  cursor: pointer;
  transition: 0.3s;

  &.primary {
    background-color: $quaternary;
    color: $primary;
  }

  &:hover {
    opacity: 0.9;
  }
}
</style>
