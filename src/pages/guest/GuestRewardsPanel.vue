<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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
</script>

<template>
  <div class="panelFull">
    <div class="filled header-bar">
      <div class="back-button" @click="backToAccount">
        <span class="arrow">←</span> Back to Account
      </div>
      <div class="title">Rewards</div>
    </div>

    <div class="rewards-container">
      <div class="outline section">
        <div class="title">Your Rewards Points</div>
        <div class="points-display">
          <div class="points-value">1,250</div>
          <div class="points-label">Rewards Points</div>
        </div>
      </div>

      <div class="outline section">
        <div class="title">Available Rewards</div>
        <div class="rewards-list">
          <div class="reward-item">
            <div class="reward-info">
              <div class="reward-title">Free Massage Session</div>
              <div class="reward-description">Redeem 2,000 points for a complimentary 60-minute massage session.</div>
            </div>
            <div class="reward-points">2,000 pts</div>
          </div>

          <div class="reward-item">
            <div class="reward-info">
              <div class="reward-title">Spa Product Discount</div>
              <div class="reward-description">Redeem 1,000 points for 15% off any spa product.</div>
            </div>
            <div class="reward-points">1,000 pts</div>
          </div>

          <div class="reward-item">
            <div class="reward-info">
              <div class="reward-title">VIP Treatment Upgrade</div>
              <div class="reward-description">Redeem 500 points to upgrade any treatment to VIP status.</div>
            </div>
            <div class="reward-points">500 pts</div>
          </div>
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
</style>
