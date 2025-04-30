<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  opening: {
    type: Object,
    required: true
  }
});

// Define emits
const emit = defineEmits(['close']);

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
      <h3>Opening Details</h3>
    </div>

    <div class="detail-content">
      <div class="detail-section">
        <h4>Service Information</h4>
        <div class="detail-item">
          <span class="detail-label">Service Type:</span>
          <span class="detail-value">{{ opening.serviceType }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Service ID:</span>
          <span class="detail-value">{{ opening.serviceId }}</span>
        </div>
      </div>

      <div class="detail-section">
        <h4>Time Information</h4>
        <div class="detail-item">
          <span class="detail-label">Start Time:</span>
          <span class="detail-value">{{ new Date(opening.timeStart).toLocaleString() }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">End Time:</span>
          <span class="detail-value">{{ new Date(opening.timeEnd).toLocaleString() }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Duration:</span>
          <span class="detail-value">
            {{ Math.round((new Date(opening.timeEnd) - new Date(opening.timeStart)) / (1000 * 60)) }} minutes
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
</style>
