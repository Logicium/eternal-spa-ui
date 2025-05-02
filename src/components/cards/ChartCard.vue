<script setup lang="ts">
import { computed, type PropType } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,         // Element type for Bar chart
  CategoryScale,      // Scale for X-axis (labels like 'Monday')
  LinearScale,        // Scale for Y-axis (numerical values)
  type ChartData,          // Type helper for chart data
  type ChartOptions        // Type helper for chart options
} from 'chart.js';

import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// 4. Define the expected structure for the input data prop
interface WeekdayChartData {
  monday?: number;
  tuesday?: number;
  wednesday?: number;
  thursday?: number;
  friday?: number;
  saturday?:number;
  sunday?:number;
}

// 5. Define component props using defineProps
const props = defineProps({

  rawData: {
    type: Object as PropType<WeekdayChartData>,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Weekday Activity' // Default title
  },
  datasetLabel: {
    type: String,
    default: 'Value' // Default label for the data bars
  }
});

// 6. Create computed chart data formatted for Chart.js
// This will automatically update if the rawData prop changes.
const chartData = computed<ChartData<'bar'>>(() => {
  // Extract data for each day, defaulting to 0 if missing from props
  const mondayData = props.rawData?.monday ?? 0;
  const tuesdayData = props.rawData?.tuesday ?? 0;
  const wednesdayData = props.rawData?.wednesday ?? 0;
  const thursdayData = props.rawData?.thursday ?? 0;
  const fridayData = props.rawData?.friday ?? 0;
  const saturdayData = props.rawData?.saturday ?? 0;
  const sundayData = props.rawData?.sunday ?? 0;

  return {
    // Labels for the X-axis
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
    // Data series
    datasets: [
      {
        label: props.datasetLabel, // Label for this dataset (shows in legend/tooltip)
        backgroundColor: [ // You can customize colors
          '#A9B5DF', // Blue
        ],
        borderRadius:6,
        borderWidth: 1,
        data: [mondayData, tuesdayData, wednesdayData, thursdayData, fridayData,saturdayData,sundayData],
      },
    ],
  };
});

// 7. Define computed chart options (customize appearance and behavior)
const chartOptions = computed<ChartOptions<'bar'>>(() => ({
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
        display: false, // <<< HIDE X-axis grid lines
      }
    }
  },
}));

</script>

<template>
  <div class="chartCard">
    <div class="chartContainer">
      <Bar class="fullHeight"
        v-if="props.rawData"
        :data="chartData"
        :options="chartOptions"
        :chart-id="'monday-friday-bar-chart'"
        :dataset-id-key="'weekday-dataset'"
      />
      <div v-else class="no-data-message">
        <p>No data provided for chart.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.chartCard, .chartContainer, .fullHeight{
  height: 100% !important;
}

</style>
