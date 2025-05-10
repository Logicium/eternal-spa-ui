<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useVendorStore } from "../../stores/VendorStore";
import { useAuthStore } from "../../stores/AuthStore";
import api from "../../router/api";
import ReservationDetailPanel from "../../components/panels/ReservationDetailPanel.vue";
import utils from "@/utils/utils";
import type { Reservation } from "@/interfaces";

const vendorStore = useVendorStore();
const authStore = useAuthStore();
const reservations = ref<Reservation[]>([]);
const isLoading = ref(true);
const errorMessage = ref('');
const selectedReservation = ref<Reservation | null>(null);
const showDetailPanel = ref(false);

// Search and filter state
const searchText = ref('');
const dateFilter = ref('all'); // 'all', 'today', 'week', 'month'
const startDate = ref('');
const endDate = ref('');

// Function to format date and time
const formatDateTime = (dateTimeString:string) => {
  return utils.date.formatDateTime(dateTimeString);
};

// Function to format price
const formatPrice = (price:number) => {
  return utils.calc.formatPrice(price);
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

// View reservation details
const viewReservationDetails = (reservation:Reservation) => {
  selectedReservation.value = reservation;
  showDetailPanel.value = true;
};

// Close detail panel
const closeDetailPanel = () => {
  showDetailPanel.value = false;
  selectedReservation.value = null;
};

// Filter reservations based on search text and date filters
const filteredReservations = computed(() => {
  if (!reservations.value.length) return [];

  return reservations.value.filter(reservation => {
    // Text search filter
    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      const nameMatch = reservation.name?.toLowerCase().includes(searchLower);
      const serviceMatch = reservation.service?.name?.toLowerCase().includes(searchLower);
      const packageMatch = reservation.package?.name?.toLowerCase().includes(searchLower);

      if (!(nameMatch || serviceMatch || packageMatch)) {
        return false;
      }
    }

    // Date filter
    if (dateFilter.value !== 'all') {
      const reservationDate = new Date(reservation.timeStart);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateFilter.value === 'today') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (reservationDate < today || reservationDate >= tomorrow) {
          return false;
        }
      } else if (dateFilter.value === 'week') {
        const weekLater = new Date(today);
        weekLater.setDate(weekLater.getDate() + 7);
        if (reservationDate < today || reservationDate >= weekLater) {
          return false;
        }
      } else if (dateFilter.value === 'month') {
        const monthLater = new Date(today);
        monthLater.setMonth(monthLater.getMonth() + 1);
        if (reservationDate < today || reservationDate >= monthLater) {
          return false;
        }
      }
    }

    // Custom date range filter
    if (startDate.value && endDate.value) {
      const reservationDate = new Date(reservation.timeStart);
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      end.setHours(23, 59, 59, 999); // Include the entire end day

      if (reservationDate < start || reservationDate > end) {
        return false;
      }
    }

    return true;
  });
});

// Reset filters
const resetFilters = () => {
  searchText.value = '';
  dateFilter.value = 'all';
  startDate.value = '';
  endDate.value = '';
};

onMounted(() => {
  if (vendorStore.vendor) {
    getReservations();
  }
});
</script>

<template>
  <div class="reservations-panel">

    <!-- Reservation Detail Panel -->
    <transition name="slide-right">
      <ReservationDetailPanel
        v-if="showDetailPanel && selectedReservation"
        :reservation="selectedReservation"
        @close="closeDetailPanel"
      />
    </transition>

    <h2>Confirmed Reservations</h2>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section">
      <div class="search-box">
        <input
          type="text"
          v-model="searchText"
          placeholder="Search by name, service, or package..."
          class="search-input"
        />
      </div>

      <div class="filter-options">
        <div class="filter-group">
          <label class="filter-label">Date Filter:</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="dateFilter" value="all" />
              All
            </label>
            <label class="radio-label">
              <input type="radio" v-model="dateFilter" value="today" />
              Today
            </label>
            <label class="radio-label">
              <input type="radio" v-model="dateFilter" value="week" />
              Next 7 Days
            </label>
            <label class="radio-label">
              <input type="radio" v-model="dateFilter" value="month" />
              Next 30 Days
            </label>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">Custom Date Range:</label>
          <div class="date-range">
            <input
              type="date"
              v-model="startDate"
              class="date-input"
              :disabled="dateFilter !== 'all'"
            />
            <span class="date-separator">to</span>
            <input
              type="date"
              v-model="endDate"
              class="date-input"
              :disabled="dateFilter !== 'all'"
            />
          </div>
        </div>

        <button @click="resetFilters" class="reset-button">Reset Filters</button>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      Loading reservations...
    </div>

    <div v-else-if="reservations.length === 0" class="empty-state">
      No confirmed reservations found.
    </div>

    <div v-else-if="filteredReservations.length === 0" class="empty-state">
      No reservations match your search criteria.
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

      <div
        v-for="reservation in filteredReservations"
        :key="reservation.id"
        class="reservation-item"
        @click="viewReservationDetails(reservation)"
      >
        <div class="reservation-detail">{{ reservation.name }}</div>
        <div class="reservation-detail">{{ reservation.service?.name || 'N/A' }}</div>
        <div class="reservation-detail">{{ reservation.package?.name || 'N/A' }}</div>
        <div class="reservation-detail">{{ formatDateTime(reservation.timeStart) }}</div>
        <div class="reservation-detail">{{ formatDateTime(reservation.timeEnd) }}</div>
        <div class="reservation-detail">{{ reservation.totalDuration }}</div>
        <div class="reservation-detail">{{ formatPrice(reservation.totalPrice) }}</div>
        <div class="reservation-detail">
          <a
            v-if="reservation.receiptUrl"
            :href="reservation.receiptUrl"
            target="_blank"
            class="receipt-link"
            @click.stop
          >View Receipt</a>
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
  position: relative;
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
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

.search-filter-section {
  background-color: $primary;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-box {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid $secondary;
  background-color: $primary;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;

  &:focus {
    outline: none;
    border-color: $quaternary;
    box-shadow: 0 0 0 2px rgba($quaternary, 0.2);
  }
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
}

.filter-group {
  flex: 1;
  min-width: 250px;
}

.filter-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $quaternary;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type="radio"] {
    margin-right: 0.5rem;
    cursor: pointer;
  }
}

.date-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-input {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid $secondary;
  background-color: $primary;
  font-family: "Outfit", sans-serif;

  &:disabled {
    background-color: lighten($secondary, 30%);
    cursor: not-allowed;
  }
}

.date-separator {
  margin: 0 0.25rem;
}

.reset-button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: $quaternary;
  border: 1px solid $quaternary;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
  transition: all 0.3s;
  align-self: flex-end;

  &:hover {
    background-color: rgba($quaternary, 0.1);
  }
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
