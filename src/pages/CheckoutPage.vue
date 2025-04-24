<script setup lang="ts">
import { ref } from 'vue';

const paymentMessage = ref<string>('');
const isProcessing = ref<boolean>(false);
const errorOccurred = ref<boolean>(false);

async function redirectToCheckout() {
  isProcessing.value = true;
  paymentMessage.value = 'Redirecting to secure checkout...';
  errorOccurred.value = false;

  try {
    const response = await fetch('https://eternal-spa-service.onrender.com/payment/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ amount: 59000, description: 'Spa Reservation' }) // If needed
    });

    if (!response.ok) {
      let errorMsg = `Error: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMsg = `Error: ${errorBody.message || errorMsg}`;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }

    const resultData = await response.json();
    const url = resultData?.paymentLink?.url;

    if (url && typeof url === 'string') {
      console.log('Received payment link URL, redirecting:', url);
      window.location.href = url;
      paymentMessage.value = 'Redirecting now...';

    } else {
      console.error('Payment link URL not found or invalid in response:', resultData);
      throw new Error('Failed to retrieve a valid payment link URL.');
    }

  } catch (error: any) {
    console.error('Failed to initiate checkout redirect:', error);
    paymentMessage.value = `Error: ${error.message || 'Could not initialize checkout.'}`;
    errorOccurred.value = true; // Flag error
    isProcessing.value = false; // Re-enable button if redirect failed
  }
}
</script>

<template>

  <div class="checkout">

    <div class="header">CHECKOUT</div>

    <div class="checkout-container">
      <h2>Checkout</h2>

      <div class="initiate-section">
        <p v-if="!isProcessing && !errorOccurred">
          Click below to proceed to our secure payment page hosted by Square.
        </p>
        <p v-if="isProcessing">
          Please wait while we redirect you...
        </p>
        <button @click="redirectToCheckout" :disabled="isProcessing">
          {{ isProcessing ? 'Initializing...' : 'Proceed to Secure Payment' }}
        </button>
      </div>

      <div v-if="paymentMessage && !isProcessing" class="payment-message" :class="{ 'error': errorOccurred }">
        {{ paymentMessage }}
      </div>

    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../assets/Library";

.checkout{
  width: 80%;
  justify-self: center;
}

</style>
