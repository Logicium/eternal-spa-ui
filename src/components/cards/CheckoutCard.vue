<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import api from "@/router/api.ts";
import {useAuthStore} from "@/stores/AuthStore";
import {useAccountStore} from "@/stores/AccountStore";
import GoogleLogin from "@/components/GoogleLogin.vue";
import { useGoogleAuth } from "@/utils/googleAuth";

const authStore = useAuthStore();
const accountStore = useAccountStore();

const props = defineProps({
  vendorId:{type:String},
  timeStart:{type:String, required:true},
  timeEnd:{type:String,required:true},
  totalDuration:{type:Number},
  serviceId:{type:String},
  packageId:{type:String},
  addons:{type:Array}
})

const paymentMessage = ref<string>('Checkout & Rewards Signup');
const isProcessing = ref<boolean>(false);
const errorOccurred = ref<boolean>(false);

const init = async function (){
  if(authStore.token) {
    await accountStore.fill(authStore.token);
  }
}
init();

// Define the success callback for Google login
const onGoogleLoginSuccess = async () => {
  // Proceed with checkout
  redirectToCheckout();
};

// Use the Google authentication utility
const { googleLoginError, handleGoogleLoginSuccess, handleGoogleLoginError } = useGoogleAuth(onGoogleLoginSuccess);

async function redirectToCheckout() {
  isProcessing.value = true;
  paymentMessage.value = 'Redirecting to secure checkout...';
  errorOccurred.value = false;

  try {
    const response = await fetch(api.payment.checkout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guestId: accountStore.guest ? accountStore.guest.id : null,
        vendorId: props.vendorId,
        timeStart: new Date(props.timeStart).toISOString(),
        timeEnd: new Date(props.timeEnd).toISOString(),
        totalDuration: props.totalDuration,
        serviceId: props.serviceId,
        packageId: props.packageId,
        addons: props.addons
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
  <div class="loginItem">
    <!-- Show guest info if signed in -->
    <div v-if="authStore.token && accountStore.guest">
      <div class="title">Guest Info</div>
      <div class="guest-info">
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">{{ accountStore.guest.firstName }} {{ accountStore.guest.lastName || '' }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Reward Points:</span>
          <span class="info-value">{{ accountStore.guest.rewardsPoints || 0 }}</span>
        </div>
      </div>
      <div class="buttons">
        <div class="button fill" @click="redirectToCheckout">{{paymentMessage}}</div>
      </div>
    </div>

    <!-- Show login form if not signed in -->
    <div v-else>
      <div class="title">Guest Info</div>
      <div class="inputs">
        <input type="text" placeholder="Name*" required>
        <input type="email" placeholder="Email*" required>
        <input type="text" placeholder="Phone">
        <div class="notifs">
          <input type="checkbox">
          <div>I agree to receive text or email booking updates at the number/email provided.</div>
        </div>
        <div class="tos">
          <input type="checkbox">
          <div>I agree to the Terms of Service and Privacy Policy.*</div>
        </div>
      </div>
      <GoogleLogin
        @login-success="handleGoogleLoginSuccess"
        @login-error="handleGoogleLoginError"
      />
      <div class="buttons">
        <div class="button fill" @click="redirectToCheckout">{{paymentMessage}}</div>
        <div class="or">or</div>
        <div class="button ghost" @click="redirectToCheckout">Checkout as Guest</div>
      </div>
      <!-- Display Google login error if any -->
      <div v-if="googleLoginError" class="error-message">
        {{ googleLoginError }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Library";

.loginItem{
  margin-top: $sp-xl;
  border: $bw-md solid $secondary;
  border-radius: $br-md;
  padding: $sp-vw-sm;
  display: flex;
  flex-direction: column;
}

.notifs,.tos{
  display: flex;
  align-items: center;
}

.inputs{
  display: grid;
  grid-gap: $sp-vw-sm;
}

.or{
  padding: 0 $sp-vw-sm;
}

.title{
  font-size: $fontMed;
}

.buttons{
  display: flex;
  margin-top: $sp-vw-sm;
  align-items: center;
}

.button{
  width: fit-content;
  height: $h-btn;
  border-radius: $br-md;
  padding: $sp-vw-sm;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button.ghost{
  background-color: transparent;
  border: $bw-md solid $secondary;
}

.button.fill{
  background-color: $quaternary;
  color: $primary;
}

.guest-info {
  display: grid;
  grid-gap: $sp-vw-sm;
  margin-bottom: $sp-vw-sm;
}

.info-row {
  display: flex;
  align-items: center;
}

.info-label {
  font-weight: bold;
  margin-right: $sp-vw-sm;
}

.info-value {
  flex: 1;
}

.error-message {
  color: #d93025;
  font-size: 14px;
  margin-top: $sp-vw-sm;
  text-align: center;
}

</style>
