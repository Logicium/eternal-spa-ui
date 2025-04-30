<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import utils from "@/utils/utils";

// Define props
const props = defineProps({
  reservation: {
    type: Object,
    required: true
  }
});

// Define emits
const emit = defineEmits(['close']);

// Format date and time
const formatDateTime = (dateTimeString) => {
  return utils.date.formatDateTime(dateTimeString);
};

// Format price
const formatPrice = (price) => {
  return utils.calc.formatPrice(price);
};

// Close detail view
const closeDetailView = () => {
  emit('close');
};
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
        <h4>Guest Information</h4>
        <div class="detail-item">
          <span class="detail-label">Name:</span>
          <span class="detail-value">{{ reservation.name }}</span>
        </div>
        <div class="detail-item" v-if="reservation.email">
          <span class="detail-label">Email:</span>
          <span class="detail-value">{{ reservation.email }}</span>
        </div>
        <div class="detail-item" v-if="reservation.phone">
          <span class="detail-label">Phone:</span>
          <span class="detail-value">{{ reservation.phone }}</span>
        </div>
      </div>

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
      </div>

      <div class="detail-section">
        <h4>Payment Information</h4>
        <div class="detail-item">
          <span class="detail-label">Total Price:</span>
          <span class="detail-value">{{ formatPrice(reservation.totalPrice) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Receipt:</span>
          <span class="detail-value">
            <a v-if="reservation.receiptUrl" :href="reservation.receiptUrl" target="_blank" class="receipt-link">View Receipt</a>
            <span v-else>No receipt</span>
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
          <span class="detail-value">{{ reservation.confirmed ? 'Confirmed' : 'Pending' }}</span>
        </div>
        <div class="detail-item" v-if="reservation.notes">
          <span class="detail-label">Notes:</span>
          <span class="detail-value">{{ reservation.notes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/Library";

.reservation-detail-panel {
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

.receipt-link {
  color: $quaternary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
