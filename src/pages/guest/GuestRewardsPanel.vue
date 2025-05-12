<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import BackIcon from "@/assets/icons/nav/BackIcon.vue";
import RewardCard from "@/components/cards/RewardCard.vue";
import { useAccountStore } from "@/stores/AccountStore";

const accountStore = useAccountStore();

const props = defineProps({
  activePanel: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['changePanel']);

const backToAccount = function() {
  emit('changePanel', 'account');
}

// Get the guest's rewards points
const rewardsPoints = computed(() => {
  return accountStore.guest?.rewardsPoints || 0;
});

// Get the guest's rewards
const rewards = computed(() => {
  return accountStore.guest?.rewards || [];
});

// Get available (not redeemed) rewards
const availableRewards = computed(() => {
  return rewards.value.filter(reward => !reward.redeemed);
});

// Get redeemed rewards
const redeemedRewards = computed(() => {
  return rewards.value.filter(reward => reward.redeemed);
});
</script>

<template>
  <div class="panelFull">
    <div class="filled header-bar">
      <div class="back-button" @click="backToAccount">
        <BackIcon/> Back to Account
      </div>
      <div class="title">Rewards</div>
    </div>

    <div class="rewards-container">
      <div class="outline section">
        <div class="title">Your Rewards Points</div>
        <div class="points-display">
          <div class="points-value">{{ rewardsPoints.toLocaleString() }}</div>
          <div class="points-label">Rewards Points</div>
        </div>
      </div>

      <!-- Available Rewards -->
      <div class="outline section" v-if="availableRewards.length > 0">
        <div class="title">Available Rewards</div>
        <div class="rewards-list">
          <RewardCard
            v-for="reward in availableRewards"
            :key="reward.id"
            :reward="reward"
          />
        </div>
      </div>

      <!-- Redeemed Rewards -->
      <div class="outline section" v-if="redeemedRewards.length > 0">
        <div class="title">Redeemed Rewards</div>
        <div class="rewards-list">
          <RewardCard
            v-for="reward in redeemedRewards"
            :key="reward.id"
            :reward="reward"
          />
        </div>
      </div>

      <!-- No Rewards Message -->
      <div class="outline section" v-if="rewards.length === 0">
        <div class="no-rewards-message">
          You don't have any rewards yet. Make a reservation to start earning rewards!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.panelFull {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: 80%;
  justify-self: center;
}

.header-bar {
  display: flex;
  align-items: center;
  padding: 1vw;
  margin-bottom: 1vw;
  border-radius: 6px;
}

.back-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: auto;

  &:hover {
    text-decoration: underline;
  }

  .arrow {
    margin-right: 0.5vw;
    font-size: 1.2em;
  }
}

.title {
  font-size: $fontMed;
}

.rewards-container {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.section {
  padding: 1vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.points-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
}

.points-value {
  font-size: 3rem;
  font-weight: bold;
  color: $quaternary;
}

.points-label {
  font-size: 1.2rem;
}

.rewards-list {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.reward-item {
  display: flex;
  justify-content: space-between;
  padding: 1vw;
  border-bottom: 1px solid $secondary;

  &:last-child {
    border-bottom: none;
  }
}

.reward-info {
  flex: 1;
}

.reward-title {
  font-weight: bold;
  margin-bottom: 0.5vw;
}

.reward-description {
  font-size: 0.9rem;
  color: #888;
}

.reward-points {
  font-weight: bold;
  color: $quaternary;
  align-self: center;
  padding-left: 1vw;
}

.outline {
  border-radius: 6px;
  border: 4px solid $secondary;
}

.filled {
  background-color: $secondary;
  border-radius: 6px;
}

.no-rewards-message {
  text-align: center;
  padding: 2vw;
  color: #888;
  font-style: italic;
}
</style>
