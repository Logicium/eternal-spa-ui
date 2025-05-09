<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,        // Element type for Line chart
  PointElement,       // Element type for points on Line chart
  CategoryScale,      // Scale for X-axis (labels like 'Monday')
  LinearScale,        // Scale for Y-axis (numerical values)
  type ChartData,          // Type helper for chart data
  type ChartOptions        // Type helper for chart options
} from 'chart.js';

import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Define interfaces for our data structures
interface WeekdayChartData {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

interface Reservation {
  timeStart: string;
  confirmed: boolean;
  [key: string]: any; // Allow other properties
}

// Define component props using defineProps
const props = defineProps({
  // We can accept either pre-calculated day counts or raw reservations
  rawData: {
    type: Object as PropType<WeekdayChartData | { reservations: Reservation[] }>,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Weekday Activity' // Default title
  },
  datasetLabel: {
    type: String,
    default: 'Value' // Default label for the data
  }
});

// Add state to track the current week offset (0 = current week, -1 = previous week, 1 = next week)
const weekOffset = ref(0);

// Function to calculate day counts from reservations
const calculateDayCounts = (reservations: Reservation[]): WeekdayChartData => {
  // Get current date and calculate the start of the week (Monday)
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust for week starting on Monday

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - daysSinceMonday + (weekOffset.value * 7)); // Apply week offset
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Initialize counts for each day
  const dayCounts: WeekdayChartData = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  };

  // Map day number to day name with type safety
  const dayMap: Record<number, keyof WeekdayChartData> = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
    0: 'sunday'
  };

  // Filter reservations for the current week and count by day
  reservations.forEach(reservation => {
    if (!reservation.confirmed) return;

    const reservationDate = new Date(reservation.timeStart);

    // Check if the reservation is in the current week
    if (reservationDate >= startOfWeek && reservationDate <= endOfWeek) {
      // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
      const day = reservationDate.getDay();

      // Increment the count for this day using the day map
      const dayName = dayMap[day];
      if (dayName) {
        dayCounts[dayName]++;
      }
    }
  });

  return dayCounts;
};

// Create computed property to get day counts from either format of rawData
const dayCounts = computed<WeekdayChartData>(() => {
  // Check if rawData has reservations property
  if ('reservations' in props.rawData) {
    // If it does, calculate day counts from reservations
    return calculateDayCounts(props.rawData.reservations);
  } else {
    // Otherwise, assume it's already in WeekdayChartData format
    return props.rawData as WeekdayChartData;
  }
});

// Create computed chart data formatted for Chart.js
// This will automatically update if the rawData prop changes.
const chartData = computed<ChartData<'line'>>(() => {
  // Extract data for each day from the computed dayCounts
  const mondayData = dayCounts.value.monday;
  const tuesdayData = dayCounts.value.tuesday;
  const wednesdayData = dayCounts.value.wednesday;
  const thursdayData = dayCounts.value.thursday;
  const fridayData = dayCounts.value.friday;
  const saturdayData = dayCounts.value.saturday;
  const sundayData = dayCounts.value.sunday;

  return {
    // Labels for the X-axis
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
    // Data series
    datasets: [
      {
        label: props.datasetLabel, // Label for this dataset (shows in legend/tooltip)
        backgroundColor: 'rgba(169, 181, 223, 0.2)', // Light blue with transparency
        borderColor: '#A9B5DF', // Blue
        pointBackgroundColor: '#A9B5DF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#A9B5DF',
        tension: 0.4, // Makes the line curved
        fill: true,
        data: [mondayData, tuesdayData, wednesdayData, thursdayData, fridayData, saturdayData, sundayData],
      },
    ],
  };
});

// Define computed chart options (customize appearance and behavior)
const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true, // Chart resizes with its container
  maintainAspectRatio: false, // Allows chart to fill container dimensions independently
  plugins: {
    legend: {
      display: false, // Set to false to hide the legend
    },
    tooltip: {
      enabled: true, // Show tooltips on hover
    }
  },
  scales: {
    y: {
      beginAtZero: true, // Ensure Y-axis starts at 0
      grid: {
        display: false,
      }
    },
    x: {
      grid: {
        display: false, // Hide X-axis grid lines
      }
    }
  },
  elements: {
    line: {
      borderWidth: 2 // Line thickness
    },
    point: {
      radius: 3, // Point size
      hoverRadius: 5 // Point size on hover
    }
  }
}));

// Function to navigate to previous week
const goToPreviousWeek = () => {
  weekOffset.value--;
};

// Function to navigate to next week
const goToNextWeek = () => {
  weekOffset.value++;
};

// Computed property to get the date range for display
const weekDateRange = computed(() => {
  const now = new Date();
  const currentDay = now.getDay();
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - daysSinceMonday + (weekOffset.value * 7));

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
});

</script>

<template>
  <div class="chartCard">
    <div class="chartHeader">
      <div class="chartTitle">{{ props.chartTitle }}</div>
      <div class="weekNavigation">
        <button class="navButton" @click="goToPreviousWeek">←</button>
        <span class="dateRange">{{ weekDateRange }}</span>
        <button class="navButton" @click="goToNextWeek">→</button>
      </div>
    </div>
    <div class="chartContainer">
      <Line class="fullHeight"
        v-if="props.rawData"
        :data="chartData"
        :options="chartOptions"
        :chart-id="'weekly-line-chart'"
        :dataset-id-key="'weekday-dataset'"
      />
      <div v-else class="no-data-message">
        <p>No data provided for chart.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.chartCard {
  display: flex;
  flex-direction: column;
  height: 100% !important;
  max-height: 100% !important;
  padding: $sp-md;
}

.chartHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $sp-md;
}

.chartTitle {
  font-weight: bold;
}

.weekNavigation {
  display: flex;
  align-items: center;
  gap: $sp-sm;
}

.dateRange {
  font-size: $fontXs;
  color: $quaternary;
}

.navButton {
  background: none;
  border: none;
  cursor: pointer;
  color: $quaternary;
  font-size: $fontSm;
  padding: $sp-xs;
  border-radius: $br-sm;

  &:hover {
    background-color: $tertiary;
  }
}

.chartContainer, .fullHeight {
  max-height: 100% !important;
  height: 100% !important;
}

</style>
