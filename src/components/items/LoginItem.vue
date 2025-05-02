<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import api from "@/router/api.ts";

const props = defineProps({
  guestId:{type:String,nullable:true},
  vendorId:{type:String},
  timeStart:{type:String},
  timeEnd:{type:String},
  totalDuration:{type:Number},
  serviceId:{type:String},
  packageId:{type:String},
  addons:{type:Array}
})

const paymentMessage = ref<string>('Checkout & Rewards Signup');
const isProcessing = ref<boolean>(false);
const errorOccurred = ref<boolean>(false);

async function redirectToCheckout() {
  isProcessing.value = true;
  paymentMessage.value = 'Redirecting to secure checkout...';
  errorOccurred.value = false;

  try {
    console.log("Addons:",JSON.stringify(props.addons));
    const response = await fetch(api.payment.checkout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guestId: props.guestId,
        vendorId: props.vendorId,
        timeStart: props.timeStart instanceof Date ? props.timeStart.toISOString() : props.timeStart,
        timeEnd: props.timeEnd instanceof Date ? props.timeEnd.toISOString() : props.timeEnd,
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
    <div class="buttons">
      <div class="button fill" @click="redirectToCheckout">{{paymentMessage}}</div>
      <div class="or">or</div>
      <div class="button ghost">Checkout as Guest</div>
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

input{
  background-color: $secondary;
  border: none;
  height: $h-input;
  font-size: $fontNormal;
  border-radius: $br-md;
  font-family: "Outfit", sans-serif;
}

input[type="checkbox"]{
  margin-right: $sp-vw-sm;
}

</style>
