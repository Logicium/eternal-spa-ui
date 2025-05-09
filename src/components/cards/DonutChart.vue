<script setup lang="ts">
import { computed, type PropType } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,         // Element type for Donut/Pie chart
  type ChartData,     // Type helper for chart data
  type ChartOptions   // Type helper for chart options
} from 'chart.js';

import { Doughnut } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Define interfaces for our data structures
interface PackageCount {
  id: string;
  name: string;
  count: number;
}

interface Reservation {
  package?: {
    id: string;
    name: string;
  };
  confirmed: boolean;
  [key: string]: any; // Allow other properties
}

// Define component props using defineProps
const props = defineProps({
  // We can accept either pre-calculated package counts or raw reservations
  rawData: {
    type: Object as PropType<PackageCount[] | { reservations: Reservation[] }>,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Popular Packages' // Default title
  },
  datasetLabel: {
    type: String,
    default: 'Bookings' // Default label for the data
  }
});

// Function to calculate package counts from reservations
const calculatePackageCounts = (reservations: Reservation[]): PackageCount[] => {
  const packageMap = new Map<string, PackageCount>();

  // Count reservations for each package
  reservations.forEach(reservation => {
    if (!reservation.confirmed || !reservation.package) return;

    const packageId = reservation.package.id;
    const packageName = reservation.package.name;

    if (packageId) {
      if (packageMap.has(packageId)) {
        // Increment count for existing package
        const packageData = packageMap.get(packageId)!;
        packageData.count += 1;
      } else {
        // Add new package to map
        packageMap.set(packageId, {
          id: packageId,
          name: packageName || 'Unknown Package',
          count: 1
        });
      }
    }
  });

  // Convert map to array and sort by count (descending)
  return Array.from(packageMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Get top 5 packages
};

// Create computed property to get package counts from either format of rawData
const packageCounts = computed(() => {
  // Check if rawData is an array (pre-calculated package counts)
  if (Array.isArray(props.rawData)) {
    return props.rawData as PackageCount[];
  }
  // Check if rawData has reservations property
  else if ('reservations' in props.rawData) {
    // If it does, calculate package counts from reservations
    return calculatePackageCounts(props.rawData.reservations);
  }
  // Default to empty array if data format is unexpected
  else {
    return [] as PackageCount[];
  }
});

// Create computed chart data formatted for Chart.js
const chartData = computed<ChartData<'doughnut'>>(() => {
  // Extract names and counts from packageCounts
  const labels = packageCounts.value.map(pkg => pkg.name);
  const data = packageCounts.value.map(pkg => pkg.count);

  // Generate colors for each package (using a predefined palette)
  const colors = [
    '#A9B5DF', // Blue
    '#F2C4CE', // Pink
    '#C3E5AE', // Green
    '#F9D9AA', // Orange
    '#D0C5E8', // Purple
  ];

  return {
    labels: labels,
    datasets: [
      {
        label: props.datasetLabel,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 1,
        data: data,
      },
    ],
  };
});

// Define computed chart options
const chartOptions = computed<ChartOptions<'doughnut'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%', // Controls the size of the donut hole
  animation: {
    duration: 0 // Disable animations completely
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw as number;
          return `${label}: ${value} bookings`;
        }
      }
    }
  },
}));
</script>

<template>
  <div class="chartCard">
    <div class="chartTitle" v-if="chartTitle">{{ chartTitle }}</div>
    <div class="chartContainer">
      <Doughnut class="fullHeight"
        v-if="packageCounts.length > 0"
        :data="chartData"
        :options="chartOptions"
        :chart-id="'package-popularity-donut-chart'"
        :dataset-id-key="'package-dataset'"
      />
      <div v-else class="no-data-message">
        <p>No package data available</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.chartCard {
  height: 100% !important;
  display: flex;
  flex-direction: column;
}

.chartTitle {
  font-size: $fontSm;
  font-weight: bold;
  margin-bottom: $sp-md;
  padding: $sp-md $sp-md 0 $sp-md;
}

.chartContainer {
  position: relative;
  height: 100%;
  max-height: 100%;
  padding-bottom: $sp-lg;
  transition: 0s;
}

.fullHeight {
  height: 100% !important;
  max-height: 100% !important;
}

.no-data-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: $quaternary;
}
</style>
