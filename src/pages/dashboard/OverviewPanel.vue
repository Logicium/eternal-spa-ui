<script setup lang="ts">

import CalEventIcon from "@/assets/icons/cal/CalEventIcon.vue";
import PersonIcon from "@/assets/icons/PersonIcon.vue";
import CalRangeIcon from "@/assets/icons/cal/CalRangeIcon.vue";
import WalletIcon from "@/assets/icons/WalletIcon.vue";
import ChartCard from "@/components/cards/ChartCard.vue";

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
      <div class="row">
        <div class="">Upcoming Reservations</div>
        <div class="icon right"><CalEventIcon/></div>
      </div>
      <div class="number">2</div>
    </div>

    <div class="overviewCard">
      <div class="row">
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
      <div class="row">
        <div class="">Monthly Earnings</div>
        <div class="icon right"><WalletIcon/></div>
      </div>
      <div class="number">$289</div>
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
  grid-template-rows: 20vh;
  grid-auto-rows: 1fr;
  background-color: $tertiary;
  grid-gap: 2rem;
  height: 100%;
  padding: 2rem;
}

.icon{
  min-height: 45px;
  max-height: 45px;
  min-width: 45px;
  max-width: 45px;
  border-radius: 50%;
  border: 2px solid $quaternary;
  color: $quaternary;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overviewCard{
  background-color: $primary;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1vw;
}

.border{
  border: 2px solid $quaternary;
}

.filled{
  background-color: $secondary;
}

.overviewRow{
  background-color: $primary;
  grid-column: span 4;
  border-radius: 6px;
}

.row{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.center{
  justify-self: center;
  text-align: center;
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
