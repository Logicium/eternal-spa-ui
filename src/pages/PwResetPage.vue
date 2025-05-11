<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/router/api.ts';

const route = useRoute();
const router = useRouter();

const password = ref('');
const confirmPassword = ref('');
const token = ref('');
const message = ref('');
const isSuccess = ref(false);
const isLoading = ref(false);
const isTokenValid = ref(true);

onMounted(() => {
  // Extract token from URL query parameters
  token.value = route.query.token as string;

  if (!token.value) {
    message.value = 'Invalid or missing reset token. Please request a new password reset link.';
    isTokenValid.value = false;
  }
});

const resetPassword = async () => {
  // Validate passwords
  if (password.value.length < 8) {
    message.value = 'Password must be at least 8 characters long';
    return;
  }

  if (password.value !== confirmPassword.value) {
    message.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;
  message.value = '';

  try {
    const response = await fetch(api.auth.resetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token.value,
        newPassword: password.value
      })
    });

    if (response.ok) {
      isSuccess.value = true;
      message.value = 'Your password has been successfully reset. You will be redirected to the login page.';

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      const data = await response.json();
      message.value = data.message || 'Failed to reset password. Please try again or request a new reset link.';
    }
  } catch (error) {
    message.value = 'An error occurred. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="reset-password-container">
    <div class="reset-password-card">
      <h1>Reset Your Password</h1>

      <div v-if="!isTokenValid" class="message error">
        {{ message }}
        <div class="action-links">
          <a href="/login">Return to Login</a>
        </div>
      </div>

      <template v-else>
        <p v-if="!isSuccess">Please enter your new password below.</p>

        <div v-if="message" class="message" :class="{ 'success': isSuccess, 'error': !isSuccess && message }">
          {{ message }}
        </div>

        <form v-if="!isSuccess" @submit.prevent="resetPassword">
          <div class="form-group">
            <label for="password">New Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter new password"
              :disabled="isLoading"
            >
          </div>

          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              placeholder="Confirm new password"
              :disabled="isLoading"
            >
          </div>

          <button type="submit" class="reset-button" :disabled="isLoading">
            {{ isLoading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </form>

        <div v-if="isSuccess" class="action-links">
          <a href="/login">Return to Login</a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/Library";

.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.reset-password-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 500px;
}

h1 {
  font-size: $fontMed;
  margin-bottom: 20px;
  text-align: center;
}

p {
  margin-bottom: 20px;
  text-align: center;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.reset-button {
  width: 100%;
  padding: 12px;
  background-color: $quaternary;
  color: $primary;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: lighten($quaternary, 10%);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.message {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.action-links {
  margin-top: 20px;
  text-align: center;

  a {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
