<script setup lang="ts">

import router from "@/router";
import {useAuthStore} from "../stores/AuthStore";
import {useAccountStore} from "../stores/AccountStore";
import { computed } from 'vue';

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

// Computed properties with getters and setters for form fields
const firstName = computed({
  get: () => accountStore.guest?.firstName || '',
  set: (value) => accountStore.updateGuestProperty('firstName', value)
});

const lastName = computed({
  get: () => accountStore.guest?.lastName || '',
  set: (value) => accountStore.updateGuestProperty('lastName', value)
});

const phone = computed({
  get: () => accountStore.guest?.phone || '',
  set: (value) => accountStore.updateGuestProperty('phone', value)
});

const email = computed({
  get: () => accountStore.guest?.email || '',
  set: (value) => accountStore.updateGuestProperty('email', value)
});

</script>

<template>
  <div v-if="authStore.token">
    <div class="header">ACCOUNT</div>
    <div class="panelFull">

      <div class="outline">
        <div class="title">Hi {{accountStore?.guest?.firstName}}</div>
        <div>No upcoming reservations.</div>
      </div>

      <div class="accountGrid">

        <div class="item filled">
          <div class="wrap">
            <div class="title">Bookings</div>
            <div class="button underline rev">View All</div>
          </div>
          <div class="filledRev stat">
            <div class="title">{{accountStore?.guest?.reservations?.length}}</div>
            <div>Reservations</div>
          </div>
        </div>

        <div class="filled span">

          <div class="settings">
            <div class="title">Settings</div>
            <div>Contact Info</div>
            <div class="names">
              <input class="gap" type="text" v-model="firstName" placeholder="First Name"/>
              <input type="text" v-model="lastName" placeholder="Last Name"/>
            </div>
            <input type="text" placeholder="Phone" v-model="phone">
            <input type="email" placeholder="Email" v-model="email"/>
            <div class="button underline rev">Contact Preferences</div>
            <div class="button underline rev">Security & Data</div>
            <div class="button underline rev" @click="logoutClick">Logout</div>
<!--            <div><input type="checkbox" /> Email Notifications</div>-->
<!--            <div><input type="checkbox"/> SMS Notifications</div>-->
<!--            <div><input type="checkbox"/> Newsletter Signup</div>-->
            <div class="buttons">
              <div class="button gap">Save Settings</div>

            </div>

          </div>

        </div>



        <div class="item filled">
          <div class="wrap">
            <div class="title">Rewards</div>
            <div class="button underline rev">View Rewards</div>
          </div>
          <div class="filledRev stat">
            <div class="title">{{accountStore?.guest?.rewardsPoints}}</div>
            <div>Rewards Points</div>
          </div>
        </div>


      </div>
    </div>
  </div>
  <template v-else>
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

.settings{
  display: flex;
  padding: 1vw;
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
}

.accountGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 50vh;
  grid-gap: 1vw;
  margin-top: 2rem;
}

.span{
  grid-row: span 2;
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
  height: 45px;
  background-color: $secondary;
  border: none;
  border-radius: 6px;
  width: 100%;
  font-family: "Outfit", sans-serif;
  font-size: $fontNormal;
}

input[type="checkbox"]{
  margin-right: 1vw;
  width: fit-content;
  height: fit-content;
}
</style>
