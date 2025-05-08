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
      <div class="title">Security & Data</div>
    </div>

    <div class="settings-container">
      <div class="outline section">
        <div class="title">Password</div>
        <div class="form-group">
          <input class="underline" type="password" placeholder="Current Password"/>
          <input class="underline" type="password" placeholder="New Password"/>
          <input class="underline" type="password" placeholder="Confirm New Password"/>
          <div class="button mt-a">Update Password</div>
        </div>
      </div>

      <div class="outline section">
        <div class="title">Data Privacy</div>
        <div class="form-group">
          <div><input type="checkbox"/> Allow data collection for personalized experience</div>
          <div><input type="checkbox"/> Share anonymous usage data</div>
          <div class="button mt-a danger">Delete Account</div>
        </div>
      </div>

      <div class="outline section">
        <div class="title">Two-Factor Authentication</div>
        <div class="form-group">
          <div><input type="checkbox"/> Enable two-factor authentication</div>
          <div class="button mt-a">Setup 2FA</div>
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

.settings-container {
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.outline {
  border-radius: 6px;
  border: 4px solid $secondary;
}

.filled {
  background-color: $secondary;
  border-radius: 6px;
}

.mt-a {
  margin-top: auto;
}

.button {
  cursor: pointer;
  align-self: flex-start;

  &.danger {
    color: #ff4d4d;
  }
}

input {
  margin-bottom: 1vw;
}
</style>
