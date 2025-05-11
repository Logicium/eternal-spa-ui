import { ref } from 'vue';
import api from "@/router/api.ts";
import { useAuthStore } from "@/stores/AuthStore";
import { useAccountStore } from "@/stores/AccountStore";

/**
 * Handles Google login process
 * @param onSuccess - Callback function to execute after successful login
 * @returns Object containing state variables and handler functions
 */
export function useGoogleAuth(onSuccess: () => Promise<void>) {
  const authStore = useAuthStore();
  const accountStore = useAccountStore();
  const googleLoginError = ref<string>('');
  const isProcessing = ref<boolean>(false);

  /**
   * Handles successful Google login
   * @param data - Data received from Google login
   */
  async function handleGoogleLoginSuccess(data: any) {
    console.log('Google login successful:', data);
    isProcessing.value = true;
    googleLoginError.value = '';

    try {
      // Check if we have an authorization code from Google
      if (!data.code) {
        throw new Error('No authorization code received from Google');
      }

      // Send the code to the backend API to exchange for tokens
      const response = await fetch(api.guest.googleLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: data.code,
          provider: 'google',
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI
        })
      });

      if (!response.ok) {
        let errorMsg = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorBody = await response.json();
          errorMsg = `Error: ${errorBody.message || errorMsg}`;
        } catch (e) { /* Ignore */ }
        throw new Error(errorMsg);
      }

      // Process the response from the backend
      const authData = await response.json();

      // Store the JWT token
      if (authData.token) {
        authStore.token = authData.token;

        // Load guest data using the token
        await accountStore.fill(authData.token);

        // Execute the success callback
        await onSuccess();
      } else {
        throw new Error('No authentication token received from server');
      }
    } catch (error) {
      console.error('Failed to process Google login:', error);
      googleLoginError.value = 'Failed to process login. Please try again.';
      isProcessing.value = false;
    }
  }

  /**
   * Handles Google login errors
   * @param error - Error received from Google login
   */
  function handleGoogleLoginError(error: any) {
    console.error('Google login error:', error);
    googleLoginError.value = 'Google sign-in failed. Please try again.';
  }

  return {
    googleLoginError,
    isProcessing,
    handleGoogleLoginSuccess,
    handleGoogleLoginError
  };
}
