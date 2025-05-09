<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useVendorStore } from '../../stores/VendorStore';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const vendorStore = useVendorStore();
const viewType = ref<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
const calendarRef = ref();
const selectedDate = ref(new Date());

// Sidebar state
const showSidebar = ref(false);
const selectedEvent = ref<any>(null);

// Tooltip state
const tooltipState = reactive({
  show: false,
  x: 0,
  y: 0,
  title: '',
  time: '',
  service: ''
});

// Get all reservations
const reservations = computed(() => {
  if (!vendorStore.vendor || !vendorStore.vendor.reservations) {
    return [];
  }
  return vendorStore.vendor.reservations;
});

// Format reservations for FullCalendar display
const calendarEvents = computed(() => {
  return reservations.value.map(reservation => {
    const startDate = new Date(reservation.timeStart);
    const endDate = new Date(reservation.timeEnd);

    return {
      title: reservation.name,
      start: startDate,
      end: endDate,
      backgroundColor: reservation.confirmed ? 'green' : 'orange',
      borderColor: reservation.confirmed ? 'green' : 'orange',
      extendedProps: {
        details: reservation,
        serviceName: reservation.service?.name || 'No service specified'
      }
    };
  });
});

// Calendar options
const calendarOptions = computed(() => {
  return {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: viewType.value,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }, // Using built-in navigation controls
    events: calendarEvents.value,
    initialDate: selectedDate.value,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dayMaxEventRows: true, // For limiting number of rows in month view
    fixedWeekCount: true, // Always show 6 weeks in month view
    weekends: true,
    height: '100%',
    eventClick: handleReservationClick,
    eventDidMount: (info:any) => {
      // Add custom tooltip showing full event name and time
      const eventEl = info.el;
      const startTime = info.event.start ? new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const endTime = info.event.end ? new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const timeText = startTime && endTime ? `${startTime} - ${endTime}` : '';
      const serviceName = info.event.extendedProps?.serviceName || '';

      // Format tooltip text with event title, time, and service name
      const tooltipTitle = `${info.event.title}`;
      const tooltipTime = timeText ? `Time: ${timeText}` : '';
      const tooltipService = serviceName ? `Service: ${serviceName}` : '';

      // Show tooltip on mouseover
      eventEl.addEventListener('mouseover', (e:any) => {
        tooltipState.title = tooltipTitle;
        tooltipState.time = tooltipTime;
        tooltipState.service = tooltipService;

        // Get the calendar panel element
        const calendarPanel = document.querySelector('.calendar-panel');
        if (calendarPanel) {
          // Get the panel's bounding rectangle
          const panelRect = calendarPanel.getBoundingClientRect();

          // Calculate position relative to the panel
          tooltipState.x = e.clientX - panelRect.left;
          tooltipState.y = e.clientY - panelRect.top;
        } else {
          // Fallback to viewport coordinates if panel not found
          tooltipState.x = e.clientX;
          tooltipState.y = e.clientY;
        }

        tooltipState.show = true;
      });

      // Update tooltip position on mousemove
      eventEl.addEventListener('mousemove', (e:any) => {
        // Get the calendar panel element
        const calendarPanel = document.querySelector('.calendar-panel');
        if (calendarPanel) {
          // Get the panel's bounding rectangle
          const panelRect = calendarPanel.getBoundingClientRect();

          // Calculate position relative to the panel
          tooltipState.x = e.clientX - panelRect.left;
          tooltipState.y = e.clientY - panelRect.top;
        } else {
          // Fallback to viewport coordinates if panel not found
          tooltipState.x = e.clientX;
          tooltipState.y = e.clientY;
        }
      });

      // Hide tooltip on mouseout
      eventEl.addEventListener('mouseout', () => {
        tooltipState.show = false;
      });
    },
   };
});

// Handle reservation click
const handleReservationClick = (info: any) => {
  // Store the clicked event details and show the sidebar
  console.log('reservation clicked');
  selectedEvent.value = {
    title: info.event.title,
    start: info.event.start,
    end: info.event.end,
    ...info.event.extendedProps
  };
  showSidebar.value = true;
};

// Close the sidebar
const closeSidebar = () => {
  showSidebar.value = false;
};

// Handle date click
const handleDateClick = (info: any) => {
  selectedDate.value = info.date;
};

// Listen to view changes from FullCalendar
const handleViewChange = (info: any) => {
  viewType.value = info.view.type;
};

// Trigger resize after component is mounted
onMounted(() => {
  // Use setTimeout to ensure DOM is fully rendered
  setTimeout(() => {
    if (calendarRef.value) {
      const calendarApi = calendarRef.value.getApi();
      calendarApi.updateSize();
    }
  }, 100);
});
</script>

<template>

  <div class="calendar-panel">
    <div class="calendar-header">
      <h2>Reservations Calendar</h2>
    </div>

    <div class="calendar-container">
       FullCalendar for all views
      <FullCalendar
        ref="calendarRef"
        :options="calendarOptions"
        @dateClick="handleDateClick"
        @viewDidMount="handleViewChange"
        class="fullcalendar"
      />
    </div>

    <!-- Event Details Sidebar -->
    <div class="event-sidebar" :class="{ 'show': showSidebar }">
      <div class="sidebar-header">
        <h3>Event Details</h3>
        <button class="close-btn" @click="closeSidebar">×</button>
      </div>

      <div v-if="selectedEvent" class="sidebar-content">
        <div class="event-detail">
          <strong>Title:</strong> {{ selectedEvent.title }}
        </div>
        <div class="event-detail">
          <strong>Start:</strong> {{ new Date(selectedEvent.start).toLocaleString() }}
        </div>
        <div class="event-detail">
          <strong>End:</strong> {{ new Date(selectedEvent.end).toLocaleString() }}
        </div>
        <div class="event-detail">
          <strong>Service:</strong> {{ selectedEvent.serviceName }}
        </div>
        <div v-if="selectedEvent.details" class="event-detail">
          <strong>Status:</strong>
          <span :class="selectedEvent.details.confirmed ? 'status-confirmed' : 'status-pending'">
            {{ selectedEvent.details.confirmed ? 'Confirmed' : 'Pending' }}
          </span>
        </div>
        <div v-if="selectedEvent.details && selectedEvent.details.notes" class="event-detail">
          <strong>Notes:</strong>
          <p>{{ selectedEvent.details.notes }}</p>
        </div>
      </div>
    </div>

    <div class="custom-tooltip" v-if="tooltipState.show"
         :style="{
      left: tooltipState.x + 'px',
      top: tooltipState.y + 'px'
    }"
    >
      <div class="tooltip-title">{{ tooltipState.title }}</div>
      <div v-if="tooltipState.time" class="tooltip-time">{{ tooltipState.time }}</div>
      <div v-if="tooltipState.service" class="tooltip-service">{{ tooltipState.service }}</div>
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
  position: relative; /* For absolute positioning of sidebar */
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


.calendar-container {
  flex: 1;
  background-color: $primary;
  border-radius: $br-md;
  padding: $sp-md;
  overflow: hidden;

  .fullcalendar {
    height: 100%;
    border-radius: $br-md;
    overflow: hidden;

    :deep(.fc-header-toolbar) {
      padding: $sp-sm 0;
      margin-bottom: $sp-md;
      display: flex;
      justify-content: space-between;

      .fc-toolbar-chunk {
        // Style for all buttons in the toolbar
        .fc-button {
          background-color: $primary;
          border: none;
          border-radius: $br-md;
          padding: $sp-xs $sp-sm;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          color: $quaternary;

          &:hover {
            background-color: $secondary;
          }

          &.fc-button-active {
            background-color: $quaternary;
            color: $primary;
            font-weight: bold;
          }
        }
      }
    }

    :deep(.fc-day-header) {
      font-size: $fontNormal;
      padding: $sp-sm;
      color: $quaternary;
    }

    :deep(.fc-day) {
      border-color: $secondary;
    }

    :deep(.fc-timegrid-slot) {
      border-color: $secondary;
    }

    :deep(.fc-daygrid-day) {
      border-color: $secondary;
    }

    :deep(.fc-event) {
      border-radius: $br-sm;
      cursor: pointer;

      &.fc-event-start {
        border-left-width: 3px;
      }
    }

    // Style for day and week view events
    :deep(.fc-timegrid-event) {
      padding: $sp-xs;
    }

    // Style for month view events
    :deep(.fc-daygrid-event) {
      padding: $sp-xs;
    }

    // Event title styling
    :deep(.fc-event-title) {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // Event time styling
    :deep(.fc-event-time) {
      font-size: 10px;
      opacity: 0.8;
    }
  }
}

// Event Sidebar Styles
.event-sidebar {
  position: absolute;
  top: 0;
  right: -350px; // Start off-screen
  width: 350px;
  height: 100%;
  background-color: $primary;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  border-left: 1px solid $secondary;

  &.show {
    right: 0; // Slide in
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $sp-md;
    border-bottom: 1px solid $secondary;
    background-color: $quaternary;
    color: $primary;

    h3 {
      margin: 0;
      font-size: $fontNormal;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: $primary;
      padding: 0;
      line-height: 1;

      &:hover {
        color: $tertiary;
      }
    }
  }

  .sidebar-content {
    padding: $sp-md;

    .event-detail {
      margin-bottom: $sp-md;

      strong {
        display: block;
        margin-bottom: $sp-xs;
        color: $quaternary;
      }

      p {
        margin: $sp-xs 0;
      }

      .status-confirmed {
        color: green;
        font-weight: bold;
      }

      .status-pending {
        color: orange;
        font-weight: bold;
      }
    }
  }
}

// Custom tooltip styles
.custom-tooltip {
  position: absolute;
  z-index: 10000;
  background-color: $secondary;
  border-radius: 6px;
  padding: $sp-sm;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Outfit", sans-serif;
  color: $quaternary;
  max-width: 250px;
  pointer-events: none;

  .tooltip-title {
    font-weight: bold;
    margin-bottom: $sp-xs;
  }

  .tooltip-time, .tooltip-service {
    font-size: $fontXs;
    margin-top: $sp-xs;
  }
}
</style>
