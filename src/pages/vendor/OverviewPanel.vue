<script setup lang="ts">

import CalEventIcon from "@/assets/icons/cal/CalEventIcon.vue";
import PersonIcon from "@/assets/icons/PersonIcon.vue";
import CalRangeIcon from "@/assets/icons/cal/CalRangeIcon.vue";
import WalletIcon from "@/assets/icons/WalletIcon.vue";
import ChartCard from "@/components/cards/ChartCard.vue";
import { useVendorStore } from "../../stores/VendorStore";
import { computed } from "vue";
import utils from "@/utils/utils.ts";

const vendorStore = useVendorStore();

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

const sampleChartData = {
  monday:1,
  tuesday:2,
  wednesday:0,
  thursday:2,
  friday:3,
  saturday:5,
  sunday:3
}

</script>

<template>

  <div class="overview">

    <div class="overviewCard">
      <div class="row between">
        <div class="">Upcoming Reservations</div>
        <div class="icon right"><CalEventIcon/></div>
      </div>
      <div class="number">{{ upcomingReservationsCount }}</div>
    </div>

    <div class="overviewCard">
      <div class="row between">
        <div class="">Monthly Guests</div>
        <div class="icon right"><PersonIcon/></div>
      </div>
      <div class="number">5</div>
    </div>

    <div class="overviewCard filled">
      <div class="row">
        <div class="">Monthly Bookings</div>
        <div class="icon right"><CalRangeIcon/></div>
      </div>
      <div class="number">7</div>
    </div>

    <div class="overviewCard filled">
      <div class="row between">
        <div class="">Monthly Earnings</div>
        <div class="icon right"><WalletIcon/></div>
      </div>
      <div class="number">{{ formatPrice(monthlyEarnings) }}</div>
    </div>

    <div class="overviewRow">
      <ChartCard :raw-data="sampleChartData"/>
    </div>
    <div class="overviewRow"></div>

  </div>


</template>

<style scoped lang="scss">

@import "../../assets/Library";

.overview{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: $h-vh-sm;
  grid-auto-rows: 1fr;
  background-color: $tertiary;
  grid-gap: $sp-xl;
  height: $h-vh-full;
  padding: $sp-xl;
}

.icon{
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
  font-size: $fontBig;
  line-height: $fontBig;
}

</style>
