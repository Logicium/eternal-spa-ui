<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import BackIcon from "@/assets/icons/nav/BackIcon.vue";

const props = defineProps({
  activePanel: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['changePanel']);

const backToAccount = function() {
  emit('changePanel', 'account');
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

    <div class="bookings-container">
      <div class="outline section">
        <div class="title">Upcoming Reservations</div>
        <div class="empty-state">
          <div>You have no upcoming reservations.</div>
          <div class="button mt-a">Book a New Appointment</div>
        </div>
      </div>

      <div class="outline section">
        <div class="title">Past Reservations</div>
        <div class="empty-state">
          <div>No past reservations found.</div>
        </div>
      </div>
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

.bookings-container {
  display: flex;
  flex-direction: column;
  gap: 1vw;
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
