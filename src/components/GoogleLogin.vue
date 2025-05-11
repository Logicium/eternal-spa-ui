<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define emits for parent component communication
const emit = defineEmits(['login-success', 'login-error']);

// State variables
const isLoading = ref(false);
const errorMessage = ref('');
const googleInitialized = ref(false);

// Get Google client ID from environment variables
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Function to initialize Google Identity Services
function initializeGoogleAuth() {
  return new Promise<void>((resolve, reject) => {
    // Check if Google API script is already loaded
    if (document.getElementById('google-api-script')) {
      if (window.google && window.google.accounts) {
        googleInitialized.value = true;
        resolve();
      } else {
        // Script is there but not initialized yet
        const checkGoogleInterval = setInterval(() => {
          if (window.google && window.google.accounts) {
            clearInterval(checkGoogleInterval);
            googleInitialized.value = true;
            resolve();
          }
        }, 100);
      }
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.id = 'google-api-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Wait for Google API to initialize
      const checkGoogleInterval = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(checkGoogleInterval);
          googleInitialized.value = true;
          resolve();
        }
      }, 100);
    };

    script.onerror = (error) => {
      console.error('Failed to load Google API script:', error);
      reject(new Error('Failed to load Google API script'));
    };

    document.head.appendChild(script);
  });
}

// Function to handle Google login
async function handleGoogleLogin() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Initialize Google Auth if not already initialized
    if (!googleInitialized.value) {
      await initializeGoogleAuth();
    }

    // Configure Google OAuth client
    const client = window?.google?.accounts.oauth2.initCodeClient({
      client_id: googleClientId,
      scope: 'email profile openid',
      ux_mode: 'popup',
      callback: async (response) => {
        if (response.error) {
          console.error('Google OAuth error:', response.error);
          errorMessage.value = `Google sign-in failed: ${response.error}`;
          emit('login-error', response.error);
          isLoading.value = false;
          return;
        }

        try {
          // In a real implementation, you would send this code to your backend
          // to exchange it for tokens and user info
          console.log('Google auth code received:', response.code);

          // For now, we'll simulate a successful login with the code
          emit('login-success', {
            provider: 'google',
            code: response.code,
            // We don't have actual user data yet as that would require a backend exchange
            // This would normally come from your backend after token exchange
          });
        } catch (error) {
          console.error('Failed to process Google auth code:', error);
          errorMessage.value = 'Failed to process login. Please try again.';
          emit('login-error', error);
        } finally {
          isLoading.value = false;
        }
      }
    });

    // Start the OAuth flow
    client?.requestCode();
  } catch (error) {
    console.error('Google login failed:', error);
    errorMessage.value = 'Failed to sign in with Google. Please try again.';
    emit('login-error', error);
    isLoading.value = false;
  }
}

// Initialize Google Auth on component mount
onMounted(async () => {
  try {
    await initializeGoogleAuth();
  } catch (error) {
    console.error('Failed to initialize Google Auth:', error);
  }
});
</script>

<template>
  <div class="google-login-container">
    <button
      class="google-login-button"
      @click="handleGoogleLogin"
      :disabled="isLoading"
    >
      <div class="button-content">
        <!-- Google logo SVG -->
        <div class="google-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
        </div>
        <span>{{ isLoading ? 'Signing in...' : 'Sign in with Google' }}</span>
      </div>
    </button>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/Library";

.google-login-container {
  width: 100%;
  margin: $sp-vw-sm 0;
}

.google-login-button {
  width: 100%;
  height: $h-btn;
  border-radius: $br-md;
  background-color: white;
  border: 1px solid #dadce0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  cursor: pointer;
  padding: 0 $sp-vw-sm;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
}

.error-message {
  color: #d93025;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
}
</style>
