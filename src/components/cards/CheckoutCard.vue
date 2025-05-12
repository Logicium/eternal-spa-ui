<script setup lang="ts">

import router from "@/router";
import {ref, computed, watch} from "vue";
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
  price:{type:Number, required:true},
  addons:{type:Array}
})

const paymentMessage = ref<string>('Checkout & Rewards Signup');
const isProcessing = ref<boolean>(false);
const errorOccurred = ref<boolean>(false);
const redeemPoints = ref<number>(0);
const showRedemptionInput = ref<boolean>(false);
const confirmedRedeemPoints = ref<number>(0);
const originalPrice = ref<number>(props.price);

watch(()=>props.price, (newPrice:number) => {
  console.log(newPrice)
  originalPrice.value = newPrice;
})

// Calculate discount based on confirmed points (1 dollar off per 10 points)
const pointsDiscount = computed(() => {
  return confirmedRedeemPoints.value / 10;
});

// Calculate new total after discount
const newTotal = computed(() => {
  return Math.max(0, originalPrice.value - pointsDiscount.value);
});

const init = async function (){
  if(authStore.token) {
    await accountStore.fill(authStore.token);
  }
}
init();

const validateRedeemPoints = () => {
  const maxPoints = accountStore.guest?.rewardsPoints || 0;
  // Ensure redeemPoints is not negative
  if (redeemPoints.value < 0) {
    redeemPoints.value = 0;
  }
  // Ensure redeemPoints is not greater than available points
  if (redeemPoints.value > maxPoints) {
    redeemPoints.value = maxPoints;
  }
};

// Toggle the redemption input visibility
const toggleRedemptionInput = () => {
  showRedemptionInput.value = !showRedemptionInput.value;
  if (!showRedemptionInput.value) {
    // Reset the input value when hiding
    redeemPoints.value = 0;
  }
};

// Confirm the redemption amount
const confirmRedemption = () => {
  confirmedRedeemPoints.value = redeemPoints.value;
  showRedemptionInput.value = false;
};

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
        addons: props.addons,
        redeemPoints: accountStore.guest ? confirmedRedeemPoints.value : 0
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

        <!-- Redemption rate information -->
        <div class="info-row redemption-rate">
          <span class="info-value">Earn 1 point per $1 spent, get $1 off per 10 points redeemed</span>
        </div>

        <!-- Redemption controls -->
        <div class="info-row rewards-redemption" v-if="!confirmedRedeemPoints">
          <div v-if="!showRedemptionInput">
            <div class="button ghost redeem-button" @click="toggleRedemptionInput">Redeem Points</div>
          </div>
          <div v-else class="redemption-input-container">
            <span class="info-label">Redeem Points:</span>
            <div class="redemption-controls">

              <div class="redemption-buttons">
                <input
                  type="number"
                  v-model="redeemPoints"
                  min="0"
                  :max="accountStore.guest.rewardsPoints || 0"
                  @input="validateRedeemPoints"
                >
                <div class="button" @click="confirmRedemption">Confirm</div>
                <div class="button ghost" @click="toggleRedemptionInput">Cancel</div>

              </div>
              <span class="points-available">Available: {{ accountStore.guest.rewardsPoints || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- Show confirmed redemption and price breakdown -->
        <div v-if="confirmedRedeemPoints > 0" class="price-breakdown">
          <div class="breakdown-row">
            <span>Original Price:</span>
            <span>${{ originalPrice.toFixed(2) }}</span>
          </div>
          <div class="breakdown-row discount">
            <span>Points Discount:</span>
            <span>-${{ pointsDiscount.toFixed(2) }}</span>
          </div>
          <div class="breakdown-row total">
            <span>New Total:</span>
            <span>${{ newTotal.toFixed(2) }}</span>
          </div>
          <div class="button ghost small reset-button" @click="confirmedRedeemPoints = 0">Reset Redemption</div>
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

.rewards-redemption {
  margin-top: $sp-vw-sm;
}

.redemption-controls {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.redemption-controls input {
  width: 100%;
  padding: 8px;
  border: $bw-sm solid $secondary;
  border-radius: $br-sm;
}

.points-available {
  font-size: 12px;
  color: $secondary;
  margin-top: 4px;
}

.redemption-rate {
  font-style: italic;
  font-size: 14px;
  margin-top: $sp-vw-xs;
  margin-bottom: $sp-vw-xs;
  color: $secondary;
}

.redeem-button {
  margin-top: $sp-vw-xs;
  margin-bottom: $sp-vw-xs;
}

.redemption-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.redemption-buttons {
  display: flex;
  gap: $sp-vw-xs;
  margin-top: $sp-vw-xs;
}

.button.small {
  height: auto;
  padding: $sp-vw-xs $sp-vw-sm;
  font-size: 14px;
}

.price-breakdown {
  margin-top: $sp-vw-sm;
  padding: $sp-vw-sm;
  border: $bw-sm solid $secondary;
  border-radius: $br-sm;
  background-color: rgba($secondary, 0.05);
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: $sp-vw-xs;
}

.breakdown-row.discount {
  color: #d93025;
}

.breakdown-row.total {
  font-weight: bold;
  margin-top: $sp-vw-xs;
  padding-top: $sp-vw-xs;
  border-top: $bw-sm solid $secondary;
}

.reset-button {
  margin-top: $sp-vw-sm;
  width: 100%;
}

.error-message {
  color: #d93025;
  font-size: 14px;
  margin-top: $sp-vw-sm;
  text-align: center;
}

</style>
