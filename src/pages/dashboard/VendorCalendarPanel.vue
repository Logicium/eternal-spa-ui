<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVendorStore } from '../../stores/VendorStore';
import { VCalendar } from 'vuetify/labs/VCalendar'



const vendorStore = useVendorStore();
const viewType = ref('month'); // 'day', 'week', or 'month'
const selectedDate = ref([new Date()]);

// Get all reservations
const reservations = computed(() => {
  if (!vendorStore.vendor || !vendorStore.vendor.reservations) {
    return [];
  }
  return vendorStore.vendor.reservations;
});

// Format reservations for Vuetify Calendar display
const calendarEvents = computed(() => {
  return reservations.value.map(reservation => {
    const startDate = new Date(reservation.timeStart);
    const endDate = new Date(reservation.timeEnd);

    return {
      name: reservation.name,
      start: startDate,
      end: endDate,
      color: reservation.confirmed ? 'green' : 'orange',
      timed: true,
      details: reservation,
      serviceName: reservation.service?.name || 'No service specified'
    };
  });
});


// Handle reservation click
const handleReservationClick = (event:any) => {
  // Navigate to reservation details or perform action
  console.log('Reservation clicked:', event);
};

// Change view type
const setViewType = (type:any) => {
  viewType.value = type;
};
</script>

<template>

  <div class="calendar-panel">
    <div class="calendar-header">
      <h2>Reservations Calendar</h2>
      <div class="view-controls">
        <button
          class="view-btn"
          :class="{ active: viewType === 'day' }"
          @click="setViewType('day')"
        >
          Day
        </button>
        <button
          class="view-btn"
          :class="{ active: viewType === 'week' }"
          @click="setViewType('week')"
        >
          Week
        </button>
        <button
          class="view-btn"
          :class="{ active: viewType === 'month' }"
          @click="setViewType('month')"
        >
          Month
        </button>
      </div>
    </div>

    <div class="calendar-container">
      <!-- Vuetify Calendar for all views -->
      <v-sheet>
        <v-calendar
          :events="calendarEvents"
          :view-mode="viewType"
          :type="viewType"
          v-model="selectedDate"
          :hide-week-number="true"
          @click:date="selectedDate = date"
          @click:event="handleReservationClick"
          class="vuetify-calendar"
        >

          <template v-slot:event="{ event }" @click="handleReservationClick($event) ">
            <div class="v-event" :class="{ 'confirmed': event?.color === 'green' }">
              <div class="v-event-name">{{ event?.name }}</div>
              <div class="v-event-service">{{ event?.serviceName }}</div>
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.calendar-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: $sp-xl;
  background-color: $tertiary;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $sp-xl;

  h2 {
    font-size: $fontMed;
    margin: 0;
  }
}

.view-controls {
  display: flex;
  gap: $sp-sm;
}

.view-btn {
  background-color: $primary;
  border: none;
  border-radius: $br-md;
  padding: $sp-sm $sp-md;
  cursor: pointer;
  transition: 0.3s;
  font-family: inherit;

  &:hover {
    background-color: $secondary;
  }

  &.active {
    background-color: $quaternary;
    color: $primary;
    font-weight: bold;
  }
}

.calendar-container {
  flex: 1;
  background-color: $primary;
  border-radius: $br-md;
  padding: $sp-md;
  overflow: hidden;

  .vuetify-calendar {
    height: 100%;
    border-radius: $br-md;
    overflow: hidden;

    :deep(.v-calendar-weekly__head-weekday) {
      font-size: $fontNormal;
      padding: $sp-sm;
      color: $quaternary;
    }

    :deep(.v-calendar-daily__day) {
      border-radius: 0;
      border-color: $secondary;
    }

    :deep(.v-calendar-daily__intervals-body) {
      border-color: $secondary;
    }

    :deep(.v-calendar-weekly__day) {
      border-color: $secondary;
    }

    :deep(.v-event) {
      border-radius: $br-sm;
      border-left-width: 3px;
    }
  }

  .v-event-content {
    padding: $sp-xs;

    &.confirmed {
      background-color: rgba(0, 128, 0, 0.2);
      border-left: 3px solid green;
    }

    &:not(.confirmed) {
      background-color: rgba(255, 165, 0, 0.2);
      border-left: 3px solid orange;
    }
  }

  .v-event-name {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .v-event-service {
    font-size: 10px;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}


</style>
