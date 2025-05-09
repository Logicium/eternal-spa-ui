<script setup lang="ts">

import CalEventIcon from "@/assets/icons/cal/CalEventIcon.vue";
import PersonIcon from "@/assets/icons/PersonIcon.vue";
import CalRangeIcon from "@/assets/icons/cal/CalRangeIcon.vue";
import WalletIcon from "@/assets/icons/WalletIcon.vue";
import ChartCard from "@/components/cards/ChartCard.vue";
import DonutChart from "@/components/cards/DonutChart.vue";
import { useVendorStore } from "../../stores/VendorStore";
import { computed, ref } from "vue";
import utils from "@/utils/utils.ts";

const vendorStore = useVendorStore();

// Define emits
const emit = defineEmits(['navigateToReservations']);

// Function to format price
const formatPrice = (price:number) => {
  return utils.calc.formatPrice(price);
};

// Calculate monthly earnings
const monthlyEarnings = computed(() => {
  if (!vendorStore.vendor || !vendorStore.vendor.reservations) {
    return 0;
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter reservations for the current month and confirmed status
  const monthlyReservations = vendorStore.vendor.reservations.filter(reservation => {
    if (!reservation.confirmed) return false;

    const reservationDate = new Date(reservation.timeStart);
    return reservationDate.getMonth() === currentMonth &&
           reservationDate.getFullYear() === currentYear;
  });

  // Sum up the totalPrice of each reservation
  return monthlyReservations.reduce((total, reservation) => {
    return total + (reservation.totalPrice || 0);
  }, 0);
});

// Calculate upcoming reservations count
const upcomingReservationsCount = computed(() => {
  if (!vendorStore.vendor || !vendorStore.vendor.reservations) {
    return 0;
  }

  const now = new Date();

  // Filter reservations for future dates and confirmed status
  return vendorStore.vendor.reservations.filter(reservation => {
    if (!reservation.confirmed) return false;

    const reservationDate = new Date(reservation.timeStart);
    return reservationDate > now;
  }).length;
});

// Computed property to get vendor reservations or empty array if not available
const vendorReservations = computed(() => {
  return vendorStore.vendor?.reservations || [];
});

// Get upcoming reservations sorted by date (nearest first)
const upcomingReservations = computed(() => {
  if (!vendorStore.vendor || !vendorStore.vendor.reservations) {
    return [];
  }

  const now = new Date();

  // Filter confirmed reservations that are in the future
  const upcoming = vendorStore.vendor.reservations.filter(reservation => {
    if (!reservation.confirmed) return false;

    const reservationDate = new Date(reservation.timeStart);
    return reservationDate > now;
  });

  // Sort by date (nearest first)
  return upcoming.sort((a, b) => {
    return new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime();
  }); // Return all upcoming reservations
});

// Calculate service popularity based on number of reservations
const servicePopularity = computed(() => {
  if (!vendorStore.vendor || !vendorStore.vendor.reservations || !vendorStore.vendor.services) {
    return [];
  }

  const serviceMap = new Map();

  // Initialize map with all services
  vendorStore.vendor.services.forEach(service => {
    serviceMap.set(service.id, {
      id: service.id,
      name: service.name,
      count: 0,
      price: service.price || 0
    });
  });

  // Count reservations for each service
  vendorStore.vendor.reservations.forEach(reservation => {
    if (reservation.confirmed) {
      let serviceId = null;

      // Try to get serviceId from reservation.service
      if (reservation.service && reservation.service.id) {
        serviceId = reservation.service.id;
      }
      // If not found, try to get serviceId from reservation.package
      else if (reservation.package && reservation.package.serviceId) {
        serviceId = reservation.package.serviceId;
      }

      if (serviceId && serviceMap.has(serviceId)) {
        const service = serviceMap.get(serviceId);
        service.count += 1;
      }
    }
  });

  // Convert map to array and sort by count (descending)
  return Array.from(serviceMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Get top 5 services
});

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

</script>

<template>

  <div class="overview">

    <div class="overviewCard">
      <div class="row between">
        <div class="">Upcoming Reservations</div>
        <div class="badge right"><CalEventIcon/></div>
      </div>
      <div class="number">{{ upcomingReservationsCount }}</div>
    </div>

    <div class="overviewCard">
      <div class="row between">
        <div class="">Monthly Guests</div>
        <div class="badge right"><PersonIcon/></div>
      </div>
      <div class="number">5</div>
    </div>

    <div class="overviewCard filled">
      <div class="row">
        <div class="">Monthly Bookings</div>
        <div class="badge right"><CalRangeIcon/></div>
      </div>
      <div class="number">7</div>
    </div>

    <div class="overviewCard filled">
      <div class="row between">
        <div class="">Monthly Earnings</div>
        <div class="badge right"><WalletIcon/></div>
      </div>
      <div class="number">{{ formatPrice(monthlyEarnings) }}</div>
    </div>

    <div class="overviewRow">
      <ChartCard :raw-data="{ reservations: vendorReservations }" chartTitle="Current Week Reservations" datasetLabel="Reservations"/>
    </div>


    <div class="overviewHalf">
      <div class="halfTitle">Upcoming Reservations</div>
      <div class="reservationsList">
        <div v-if="upcomingReservations.length === 0" class="noData">
          No upcoming reservations
        </div>
        <div v-for="reservation in upcomingReservations" :key="reservation.id" class="reservationItem">
          <div class="reservationHeader">
            <div class="reservationName">{{ reservation.name }}</div>
            <div class="reservationPrice">{{ formatPrice(reservation.totalPrice) }}</div>
          </div>
          <div class="reservationDetails">
            <div class="reservationService">{{ reservation.package?.name || 'No package specified' }}</div>
            <div class="reservationTime">{{ formatDate(reservation.timeStart) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="overviewHalf">
      <DonutChart
        :raw-data="{ reservations: vendorReservations }"
        chartTitle="Popular Packages"
        datasetLabel="Bookings"
      />
    </div>

  </div>


</template>

<style scoped lang="scss">

@import "../../assets/Library";

.overview{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr minmax(0,2fr);
  background-color: $tertiary;
  grid-gap: $sp-xl;
  max-height: $h-vh-full;
  padding: $sp-xl;
}

.badge{
  min-height: $h-icon-lg;
  max-height: $h-icon-lg;
  min-width: $w-icon-lg;
  max-width: $w-icon-lg;
  border-radius: $br-full;
  border: $bw-sm solid $quaternary;
  color: $quaternary;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overviewCard{
  background-color: $primary;
  border-radius: $br-md;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: $sp-vw-sm;
}

.border{
  border: $bw-sm solid $quaternary;
}

.filled{
  background-color: $secondary;
}

.overviewRow{
  background-color: $primary;
  grid-column: span 4;
  border-radius: $br-md;
}

.overviewHalf{
  background-color: $primary;
  grid-column: span 2;
  border-radius: $br-md;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.row{
  align-items: center;
}

.center{
  justify-self: center;
}

.right{
  margin-left: auto;
}

.number{
  justify-self: center;
  font-size: $fontMed;
  line-height: $fontMed;
}

.halfTitle {
  font-size: $fontSm;
  font-weight: bold;
  padding: $sp-md;
  flex-shrink: 0;
}

.reservationsList, .servicesList {
  display: flex;
  flex-direction: column;
  gap: $sp-md;
  padding: 0 $sp-md;
  overflow-y: auto;
  flex: 1;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}

.reservationItem, .serviceItem {
  background-color: $tertiary;
  border-radius: $br-sm;
  padding: $sp-md;
}

.reservationHeader, .serviceHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: $sp-sm;
}

.reservationName, .serviceName {
  font-weight: bold;
}

.reservationPrice, .serviceCount {
  color: $quaternary;
}

.reservationDetails {
  display: flex;
  justify-content: space-between;
  font-size: $fontXs;
  color: $quaternary;
}

.serviceBar {
  height: 8px;
  background-color: $primary;
  border-radius: $br-full;
  margin-top: $sp-sm;
  overflow: hidden;
}

.serviceBarFill {
  height: 100%;
  background-color: $quaternary;
  border-radius: $br-full;
}

.noData {
  text-align: center;
  color: $quaternary;
  padding: $sp-xl;
}

.viewAllContainer {
  padding: $sp-md;
  text-align: center;
  flex-shrink: 0;
}

</style>
