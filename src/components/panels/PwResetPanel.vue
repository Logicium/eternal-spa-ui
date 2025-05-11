<script setup lang="ts">

import NextIcon from "@/assets/icons/nav/NextIcon.vue";
import {ref} from "vue";
import BackIcon from "@/assets/icons/nav/BackIcon.vue";
import api from "@/router/api.ts";

const props = defineProps({
  toggleGuestLoginClick:{
    type:Function,
    required:true
  },
});

const email = ref('');
const buttonText = ref('Reset Password');
const message = ref('');
const isSuccess = ref(false);

const loginClick = async function (e: Event) {
  e.preventDefault();

  if (!email.value) {
    message.value = 'Please enter your email address';
    return;
  }

  buttonText.value = 'Sending...';

  try {
    const response = await fetch(api.auth.forgotPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    });

    if (response.ok) {
      isSuccess.value = true;
      message.value = 'Password reset link has been sent to your email';
      buttonText.value = 'Email Sent';
    } else {
      const data = await response.json();
      message.value = data.message || 'Failed to send reset link. Please try again.';
      buttonText.value = 'Reset Password';
    }
  } catch (error) {
    message.value = 'An error occurred. Please try again later.';
    buttonText.value = 'Reset Password';
  }
}

</script>

<template>

  <div class="panel">
    <form @submit.prevent="loginClick">
      <div class="loginInfo">
        <div class="title">Password Reset</div>
        <div class="desc">Please enter your email to reset your password. If there's an email on file you will be sent a reset link.</div>
        <input type="email" v-model="email" placeholder="Email" :disabled="isSuccess">

        <div v-if="message" class="message" :class="{ 'success': isSuccess, 'error': !isSuccess && message }">
          {{ message }}
        </div>

        <div class="buttons">
          <div class="button ghost gap" @click="toggleGuestLoginClick()"><BackIcon/> Back</div>
          <input type="submit" class="button" :value="buttonText" :disabled="isSuccess"/>
        </div>
      </div>
    </form>
    <div class="loginImage"/>
  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

.loginInfo{
  display: grid;
  grid-gap: 1vw;
}

.loginImage{
  background-image: url("/spa/spa1.jpg");
  background-position: 100% 100%;
  background-size: cover;
  border-radius: 6px;
}

.title{
  font-size: $fontMed;
}

.buttons{
  display: flex;
  align-items: center;
}

.link{
  cursor: pointer;
  transition: 0.5s;
  width: fit-content;
}

.link:hover{
  font-weight: 500;
  transition: 0.5s;
}

.message {
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
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

</style>
