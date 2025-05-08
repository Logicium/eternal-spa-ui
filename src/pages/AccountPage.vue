<script setup lang="ts">

import router from "@/router";
import {useAuthStore} from "../stores/AuthStore";
import {useAccountStore} from "../stores/AccountStore";
import { computed } from 'vue';
import LoadingPage from "@/pages/LoadingPage.vue";

const authStore = useAuthStore();
const accountStore = useAccountStore();

const init = async function (){
  if(authStore.token) {
    await accountStore.fill(authStore.token);
  }
}
init();

const logoutClick = function(){
  authStore.token = null;
  router.push('/login')
}

</script>

<template>
  <LoadingPage v-if="!accountStore.guest"/>
  <div v-else-if="authStore.token && accountStore.guest && accountStore.guest.reservations">
    <div class="header">ACCOUNT</div>
    <div class="panelFull">

      <div class="filled summary">
        <div class="title">Hi {{accountStore.guest.firstName}}</div>
        <div class="empty"><div>No upcoming reservations.</div></div>
      </div>

      <div class="accountGrid">

        <div class="item filled">
          <div class="wrap">
            <div class="title">Bookings</div>
            <div class="button underline rev">View All</div>
          </div>
          <div class="filledRev stat">
            <div class="title">{{accountStore.guest.reservations.length}}</div>
            <div>Reservations</div>
          </div>
        </div>

        <div class="item filled">
          <div class="wrap">
            <div class="title">Rewards</div>
            <div class="button underline rev">View Rewards</div>
          </div>
          <div class="filledRev stat">
            <div class="title">{{accountStore.guest.rewardsPoints}}</div>
            <div>Rewards Points</div>
          </div>
        </div>

        <div class="outline span">

          <div class="settings">
            <div class="title">Settings</div>
            <div>Contact Info</div>
            <div class="names">
              <input class="underline gap" type="text" v-model="accountStore.guest.firstName" placeholder="First Name"/>
              <input class="underline" type="text" v-model="accountStore.guest.lastName" placeholder="Last Name"/>
            </div>
            <input class="underline" type="text" placeholder="Phone" v-model="accountStore.guest.phone">
            <input class="underline" type="email" placeholder="Email" v-model="accountStore.guest.email"/>
            <div class="top">Contact Preferences</div>
            <div><input type="checkbox" /> Email Notifications</div>
            <div><input type="checkbox"/> SMS Notifications</div>
            <div><input type="checkbox"/> Newsletter Signup</div>
            <div class="buttons">
              <div class="row">
                <div class="button underline rev">Security & Data</div>
                <div class="button underline rev" @click="logoutClick">Logout</div>
              </div>
              <div class="button mt-a">Save Settings</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
  <template v-else-if="!authStore.token">
    {{router.push('/login')}}
  </template>

</template>

<style scoped lang="scss">

@import "../assets/Library";

.header{
  background-image: url("/spa/spa5.jpg");
}

.wrap{
  padding: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mt-a{
  margin-top: auto;
}

.empty{
  position: absolute;
  align-self: center;
  justify-self: center;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
}

.settings{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.names{
  display: flex;
  width: 100%;
}

.buttons{
  display: flex;
  justify-content: space-between;
}

.summary{
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1vw;
  height: 25vh;
}

.accountGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 25vh 1fr;
  grid-gap: 1vw;
  margin-top: 1vw;
}

.span{
  grid-row: span 2;
  grid-column: span 2;
}

.panelFull{
  display: grid;
  margin: 2rem;
  width: 80%;
  justify-self: center;
}

.outline{
  padding: 1vw;
  border-radius: 6px;
  border: 4px solid $secondary;
}

.filled{
  background-color: $secondary;
  border-radius: 6px;
}

.filledRev{
  color: $primary;
  background-color: $quaternary;
  border-radius: 6px;
}

.item{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.stat{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title{
  font-size: $fontMed;
}

input{
  margin-bottom: 1vw;
}

</style>
