<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';
import BackIcon from "@/assets/icons/nav/BackIcon.vue";
import ReservationCard from "@/components/cards/ReservationCard.vue";
import GuestReservationDetailPanel from "@/components/panels/GuestReservationDetailPanel.vue";
import { useAccountStore } from "@/stores/AccountStore";
import { useAuthStore } from "@/stores/AuthStore";
import type { Reservation } from "@/interfaces";

const props = defineProps({
  activePanel: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['changePanel']);
const accountStore = useAccountStore();
const authStore = useAuthStore();
const selectedReservation = ref<Reservation | null>(null);
const showDetailPanel = ref(false);

const backToAccount = function() {
  emit('changePanel', 'account');
}

const viewReservationDetails = (reservation: Reservation) => {
  selectedReservation.value = reservation;
  showDetailPanel.value = true;
}

const closeDetailPanel = () => {
  showDetailPanel.value = false;
  selectedReservation.value = null;
}

// Handle reschedule event
const handleReschedule = async (updatedReservation: Reservation) => {
  try {
    // Refresh the guest data to show the updated reservation
    if(authStore.token) await accountStore.fill(authStore.token);

    // Close the detail panel
    closeDetailPanel();
  } catch (error) {
    console.error('Error refreshing guest data after reschedule:', error);
    alert('Your reservation was rescheduled, but we had trouble refreshing the page. Please reload to see your updated reservation.');
    closeDetailPanel();
  }
}

// Handle cancel event
const handleCancel = async (reservation: Reservation) => {
  try {
    // Refresh the guest data to show the updated reservation list
    if(authStore.token) await accountStore.fill(authStore.token);

    // Close the detail panel
    closeDetailPanel();
  } catch (error) {
    console.error('Error refreshing guest data after cancellation:', error);
    alert('Your reservation was cancelled, but we had trouble refreshing the page. Please reload to see your updated reservations.');
    closeDetailPanel();
  }
}

// Computed properties to filter upcoming and past reservations
const upcomingReservations = computed(() => {
  if (!accountStore.guest?.reservations) return [];

  const now = new Date();
  return accountStore.guest.reservations
    .filter(reservation => new Date(reservation.timeStart) > now)
    .sort((a, b) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime());
});

const pastReservations = computed(() => {
  if (!accountStore.guest?.reservations) return [];

  const now = new Date();
  return accountStore.guest.reservations
    .filter(reservation => new Date(reservation.timeStart) <= now)
    .sort((a, b) => new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime());
});

const capitalizeFirstLetter = function(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <div class="panelFull">
    <div class="filled header-bar">
      <div class="back-button" @click="backToAccount">
        <BackIcon/> Back to Account
      </div>
      <div class="title">Bookings</div>
    </div>

    <div class="panel-container">
      <transition-group name="slide">
        <div v-if="!showDetailPanel" key="bookings-list" class="bookings-container">
          <div class="outline section">
            <div class="title">Upcoming Reservations</div>
            <div v-if="upcomingReservations.length === 0" class="empty-state">
              <div>You have no upcoming reservations.</div>
              <div class="button mt-a">Book a New Appointment</div>
            </div>
            <div v-else class="reservations-list">
              <ReservationCard
                v-for="reservation in upcomingReservations"
                :key="reservation.id"
                :reservation="reservation"
                @view-details="viewReservationDetails"
              />
            </div>
          </div>

          <div class="outline section">
            <div class="title">Past Reservations</div>
            <div v-if="pastReservations.length === 0" class="empty-state">
              <div>No past reservations found.</div>
            </div>
            <div v-else class="reservations-list">
              <ReservationCard
                v-for="reservation in pastReservations"
                :key="reservation.id"
                :reservation="reservation"
                @view-details="viewReservationDetails"
              />
            </div>
          </div>
        </div>

        <!-- Reservation Detail Panel -->
        <GuestReservationDetailPanel
          v-if="showDetailPanel && selectedReservation"
          key="reservation-detail"
          :reservation="selectedReservation"
          @close="closeDetailPanel"
          @reschedule="handleReschedule"
          @cancel="handleCancel"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.panelFull {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: 80%;
  justify-self: center;
}

.header-bar {
  display: flex;
  align-items: center;
  padding: 1vw;
  margin-bottom: 1vw;
  border-radius: 6px;
}

.back-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: auto;

  &:hover {
    text-decoration: underline;
  }

  .arrow {
    margin-right: 0.5vw;
    font-size: 1.2em;
  }
}

.title {
  font-size: $fontMed;
}

.panel-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.bookings-container {
  display: flex;
  flex-direction: column;
  gap: 1vw;
  width: 100%;
}

.section {
  padding: 1vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2vw;
  text-align: center;
}

.reservations-list {
  display: flex;
  flex-direction: column;
}

.outline {
  border-radius: 6px;
  border: 4px solid $secondary;
}

.filled {
  background-color: $secondary;
  border-radius: 6px;
}

.mt-a {
  margin-top: 1vw;
}

.button {
  cursor: pointer;
  text-decoration: underline;
}
</style>
