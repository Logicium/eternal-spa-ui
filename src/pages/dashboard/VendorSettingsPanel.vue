<script setup lang="ts">
import { ref } from "vue";
import { useVendorStore } from "../../stores/VendorStore";
import { useAuthStore } from "../../stores/AuthStore";
import api from "../../router/api";

const vendorStore = useVendorStore();
const authStore = useAuthStore();

// Create reactive refs for form fields
const firstName = ref(vendorStore.vendor?.firstName || '');
const lastName = ref(vendorStore.vendor?.lastName || '');
const email = ref(vendorStore.vendor?.email || '');
const phone = ref(vendorStore.vendor?.phone || '');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const statusMessage = ref('');
const statusType = ref('success');
const showStatus = ref(false);
const buttonText = ref('Save Changes');

// Function to show status messages
const showStatusMessage = (message, type = 'success') => {
  statusMessage.value = message;
  statusType.value = type;
  showStatus.value = true;

  // Hide the message after 3 seconds
  setTimeout(() => {
    showStatus.value = false;
  }, 3000);
};

// Form submission handler
const onSubmit = async () => {
  // Validate form
  if (newPassword.value && newPassword.value !== confirmPassword.value) {
    showStatusMessage('New passwords do not match', 'error');
    return;
  }

  buttonText.value = "Saving...";

  try {
    // Create settings object
    const settings = {
      id: vendorStore.vendor?.id,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value
    };

    // Add password fields if user is changing password
    if (newPassword.value && currentPassword.value) {
      settings.currentPassword = currentPassword.value;
      settings.newPassword = newPassword.value;
    }

    // Send to backend
    const response = await fetch(api.vendor.settings, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify(settings)
    });

    if (response.ok) {
      // Update local vendor data
      await vendorStore.fill(authStore.token);

      // Reset password fields
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';

      showStatusMessage("Settings updated successfully!");
    } else {
      const errorData = await response.json();
      showStatusMessage(errorData.message || "Failed to update settings", "error");
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  buttonText.value = "Save Changes";
};
</script>

<template>
  <div class="settings-panel">
    <h2>Account Settings</h2>

    <div v-if="showStatus" class="status-message" :class="statusType">
      {{ statusMessage }}
    </div>

    <form @submit.prevent="onSubmit">
      <div class="form-section">
        <h3>Personal Information</h3>

        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            v-model="firstName"
            required
          >
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            v-model="lastName"
            required
          >
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
          >
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            v-model="phone"
          >
        </div>
      </div>

      <div class="form-section">
        <h3>Change Password</h3>
        <p class="section-description">Leave blank if you don't want to change your password</p>

        <div class="form-group">
          <label for="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            v-model="currentPassword"
          >
        </div>

        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            v-model="newPassword"
          >
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
          >
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="button primary">{{ buttonText }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.settings-panel {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: $fontMed;
}

h3 {
  margin-bottom: 1rem;
  font-size: $fontNormal;
  font-weight: 500;
}

.form-section {
  background-color: $primary;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-description {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  height: 45px;
  background-color: $secondary;
  border-radius: 6px;
  border: none;
  padding: 0 1rem;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
}

.form-actions {
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

.status-message {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;

  &.success {
    background-color: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
  }

  &.error {
    background-color: rgba(244, 67, 54, 0.2);
    color: #F44336;
  }
}
</style>
