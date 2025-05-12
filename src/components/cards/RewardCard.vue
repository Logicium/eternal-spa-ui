<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Reward } from '@/interfaces/Reward';

const props = defineProps<{
  reward: Reward;
}>();

// Format date to a readable string
const formatDate = (date: Date|string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Check if reward is available (dateAdded is now or earlier)
const isAvailable = computed(() => {
  if (!props.reward.dateAdded) return false;
  const dateAdded = new Date(props.reward.dateAdded);
  const now = new Date();
  return dateAdded <= now;
});
</script>

<template>
  <div class="reward-card" :class="{ 'redeemed': reward.redeemed }">
    <div class="reward-info">
      <div class="reward-points">{{ reward.points }} points</div>
      <div class="reward-date">Earned on: {{ formatDate(reward.dateAdded) }}</div>
      <div v-if="reward.reservation" class="reward-reservation">
        From reservation on: {{ formatDate(reward.reservation.timeStart) }}
      </div>
      <div v-if="reward.redeemed" class="reward-status">Redeemed</div>
      <div v-else-if="isAvailable" class="reward-status available">Available</div>
      <div v-else class="reward-status pending">Pending</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.reward-card {
  display: flex;
  padding: 1vw;
  border-bottom: 1px solid $secondary;
  transition: background-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba($secondary, 0.05);
  }

  &.redeemed {
    opacity: 0.7;
  }
}

.reward-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
}

.reward-points {
  font-weight: bold;
  font-size: 1.2rem;
  color: $quaternary;
}

.reward-date, .reward-reservation {
  font-size: 0.9rem;
  color: #666;
}

.reward-status {
  font-size: 0.9rem;
  font-weight: bold;
  color: #888;

  &.available {
    color: $quaternary;
  }

  &.pending {
    color: #f39c12; /* Orange color for pending status */
  }
}
</style>
