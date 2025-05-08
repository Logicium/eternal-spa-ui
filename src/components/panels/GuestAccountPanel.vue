<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  guest: {
    type: Object,
    required: true
  },
  activePanel: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['logout', 'changePanel']);

const logoutClick = function() {
  emit('logout');
}

const securityClick = function() {
  emit('changePanel', 'settings');
}

const bookingsClick = function() {
  emit('changePanel', 'bookings');
}

const rewardsClick = function() {
  emit('changePanel', 'rewards');
}
</script>

<template>
  <div class="panelFull">
    <div class="filled summary">
      <div class="title">Hi {{guest.firstName}}</div>
      <div class="empty center"><div>No upcoming reservations.</div></div>
    </div>

    <div class="accountGrid">
      <div class="item filled">
        <div class="wrap">
          <div class="title">Bookings</div>
          <div class="button underline rev" @click="bookingsClick">View All</div>
        </div>
        <div class="filledRev stat">
          <div class="title">{{guest.reservations.length}}</div>
          <div>Reservations</div>
        </div>
      </div>

      <div class="item filled">
        <div class="wrap">
          <div class="title">Rewards</div>
          <div class="button underline rev" @click="rewardsClick">View Rewards</div>
        </div>
        <div class="filledRev stat">
          <div class="title">{{guest.rewardsPoints}}</div>
          <div>Rewards Points</div>
        </div>
      </div>

      <div class="outline span">
        <div class="settings">
          <div class="title">Settings</div>
          <div>Contact Info</div>
          <div class="names">
            <input class="underline gap" type="text" v-model="guest.firstName" placeholder="First Name"/>
            <input class="underline" type="text" v-model="guest.lastName" placeholder="Last Name"/>
          </div>
          <input class="underline" type="text" placeholder="Phone" v-model="guest.phone">
          <input class="underline" type="email" placeholder="Email" v-model="guest.email"/>
          <div class="top">Contact Preferences</div>
          <div><input type="checkbox" /> Email Notifications</div>
          <div><input type="checkbox"/> SMS Notifications</div>
          <div><input type="checkbox"/> Newsletter Signup</div>
          <div class="buttons">
            <div class="row">
              <div class="button underline rev" @click="securityClick">Security & Data</div>
              <div class="button underline rev" @click="logoutClick">Logout</div>
            </div>
            <div class="button mt-a">Save Settings</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

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
  height: 100%;
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
