<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';
import api from '@/router/api';
import utils from '@/utils/utils';
import { useAuthStore } from "@/stores/AuthStore";
import TransitionPanel from "@/components/panels/TransitionPanel.vue";
import DateCard from "@/components/DateCard.vue";
import type {Reservation} from "@/interfaces";

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

const authStore = useAuthStore();

// Status message variables
const statusMessage = ref("");
const showStatus = ref(false);
const statusType = ref("success"); // success or error
const saveButtonText = ref("Save Settings");

// Computed property to find the nearest upcoming reservation
const nearestReservation = computed(() => {
  if (!props.guest.reservations || props.guest.reservations.length === 0) {
    return null;
  }

  const now = new Date();

  // Filter future reservations
  const futureReservations = props.guest.reservations.filter((res:Reservation) => {
    const startTime = new Date(res.timeStart);
    return startTime > now;
  });

  if (futureReservations.length === 0) {
    return null;
  }

  // Sort by start time (ascending)
  futureReservations.sort((a:Reservation, b:Reservation) => {
    return new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime();
  });

  // Return the nearest upcoming reservation
  return futureReservations[0];
});

// Format date for display
const formatDate = (dateString:string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Show status message
const showStatusMessage = (message:string, type = "success") => {
  utils.ui.showStatusMessage(message, type, 3000, statusMessage, statusType, showStatus);
};

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

const saveSettings = async function() {
  saveButtonText.value = "Saving...";

  try {
    const response = await fetch(api.guest.settings, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        id: props.guest.id,
        firstName: props.guest.firstName,
        lastName: props.guest.lastName,
        phone: props.guest.phone,
        email: props.guest.email,
        emailBookingAlerts: props.guest.emailBookingAlerts,
        smsBookingAlerts: props.guest.smsBookingAlerts,
        newsletterAlerts: props.guest.newsletterAlerts
      })
    });

    if (response.ok) {
      showStatusMessage("Settings saved successfully!");
    } else {
      showStatusMessage("Failed to save settings. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error saving settings:", error);
    showStatusMessage("An error occurred. Please try again.", "error");
  }

  saveButtonText.value = "Save Settings";
}
</script>

<template>
  <div class="panelFull">

    <div class="filled summary">

      <div v-if="!nearestReservation" class="empty center">
        <div class="title">Hi {{guest.firstName}}</div>
        <div>No upcoming reservations.</div>
      </div>

      <div v-else class="reservation-summary">

        <div>
          <div class="title">Hi {{guest.firstName}}</div>
          <div class="bold">Your Upcoming Reservation </div>
          <div class="">
            Service: {{nearestReservation.service.name}}
          </div>
          <div class="packageName">
            Package: {{nearestReservation.package.name}}
          </div>
          <div class="addons">
            Addons: {{(nearestReservation.addons.length === 0 ? 'None' : nearestReservation.addons.toString())}}
          </div>
        </div>

        <div class="serviceTime">
          {{utils.date.formatTime(new Date(nearestReservation.timeStart))}}
          -             {{utils.date.formatTime(new Date(nearestReservation.timeEnd))}}
        </div>

        <DateCard :date="nearestReservation.timeStart" size="big"/>
      </div>
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
          <transition-group name="fadefast">
            <div v-if="showStatus" class="statusWrap">
              <div class="status-message" :class="statusType">
                {{ statusMessage }}
              </div>
            </div>
          </transition-group>
          <div class="blurWrap" :class="{blur: showStatus}">
            <div class="title">Settings</div>
            <div>Contact Info</div>
            <div class="names">
              <input class="underline gap" type="text" v-model="guest.firstName" placeholder="First Name"/>
              <input class="underline" type="text" v-model="guest.lastName" placeholder="Last Name"/>
            </div>
            <input class="underline" type="text" placeholder="Phone" v-model="guest.phone">
            <input class="underline" type="email" placeholder="Email" v-model="guest.email"/>
            <div class="top">Contact Preferences</div>
            <div><input type="checkbox" v-model="guest.emailBookingAlerts" /> Email Notifications</div>
            <div><input type="checkbox" v-model="guest.smsBookingAlerts" /> SMS Notifications</div>
            <div><input type="checkbox" v-model="guest.newsletterAlerts" /> Newsletter Signup</div>
            <div class="buttons">
              <div class="col">
                <div class="button underline rev" @click="securityClick">Security & Data</div>
                <div class="button underline rev" @click="logoutClick">Logout</div>
              </div>
              <div class="button mt-a" @click="saveSettings">{{ saveButtonText }}</div>
            </div>
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

.date{
  background-color: $quaternary;
  color: $primary;
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
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.blurWrap{
  transition: 1s;
}

.blur{
  filter: blur(2px);
  transition: 1s;
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

.statusWrap{
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.status-message {
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &.success {
    background-color: rgba(0, 128, 0, 0.3);
    color: green;
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.3);
    color: red;
  }
}

.reservation-summary {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .upcoming-title {

  }

  .serviceName {
    font-weight: 600;
  }

  .packageName {

  }

  .serviceTime{
    font-size: $fontMed;
  }

  .reservation-service {

  }
}
</style>
