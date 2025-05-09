<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import BackIcon from "@/assets/icons/nav/BackIcon.vue";
import api from '@/router/api';
import utils from '@/utils/utils';
import { useAuthStore } from "@/stores/AuthStore";
import { useAccountStore } from "@/stores/AccountStore";

const props = defineProps({
  activePanel: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['changePanel']);

const authStore = useAuthStore();
const accountStore = useAccountStore();

// Form data
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const updateButtonText = ref("Update Password");

// Status message variables
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error

// Show status message
const showStatusMessage = (message:string, type = "success") => {
  utils.ui.showStatusMessage(message, type, 3000, statusMessage, statusType, showStatus);
};

const backToAccount = function() {
  emit('changePanel', 'account');
}

const updatePassword = async function() {
  // Validate passwords
  if (!currentPassword.value) {
    showStatusMessage("Current password is required", "error");
    return;
  }

  if (!newPassword.value) {
    showStatusMessage("New password is required", "error");
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    showStatusMessage("New passwords do not match", "error");
    return;
  }

  updateButtonText.value = "Updating...";

  try {
    const response = await fetch(api.guest.password, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        guestId: accountStore.guest?.id,
        currentPassword: currentPassword.value,
        newPassword: newPassword.value
      })
    });

    if (response.ok) {
      showStatusMessage("Password updated successfully!");
      // Clear form fields
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    } else {
      showStatusMessage("Failed to update password. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  updateButtonText.value = "Update Password";
}
</script>

<template>
  <div class="panelFull">
    <div class="filled header-bar">
      <div class="back-button" @click="backToAccount">
        <BackIcon/> Back to Account
      </div>
      <div class="title">Security & Data</div>
    </div>

    <div class="settings-container">
      <div class="outline section">
        <div class="title">Password</div>
        <div class="password-container">
          <transition-group name="fadefast">
            <div v-if="showStatus" class="statusWrap">
              <div class="status-message" :class="statusType">
                {{ statusMessage }}
              </div>
            </div>
          </transition-group>
          <div class="form-group blurWrap" :class="{blur: showStatus}">
            <input class="underline" type="password" placeholder="Current Password" v-model="currentPassword"/>
            <input class="underline" type="password" placeholder="New Password" v-model="newPassword"/>
            <input class="underline" type="password" placeholder="Confirm New Password" v-model="confirmPassword"/>
            <div class="button mt-a" @click="updatePassword">{{ updateButtonText }}</div>
          </div>
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
@import "../../assets/Transitions";

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

.password-container {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.blurWrap {
  transition: 1s;
}

.blur {
  filter: blur(2px);
  transition: 1s;
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

.statusWrap {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.status-message {
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &.success {
    background-color: rgba(0, 128, 0, 0.3);
    color: green;
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.3);
    color: red;
  }
}
</style>
