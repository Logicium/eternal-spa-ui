<script setup lang="ts">

import TuneIcon from "@/assets/icons/TuneIcon.vue";
import {DatePicker as VDatePicker} from "v-calendar";
import data from "@/data/data.ts"; // Keep for fallback
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import {computed, onMounted, ref, watch} from "vue";
import Timeslot from "@/components/cards/Timeslot.vue";
import NextIcon from "@/assets/icons/nav/NextIcon.vue";
import SummaryPanel from "@/components/panels/SummaryPanel.vue";
import BackIcon from "@/assets/icons/nav/BackIcon.vue";
import {useServicesStore} from "@/stores/ServiceStore.ts";
import api from "@/router/api";
import type {Booking} from "@/interfaces/Booking.ts";
import type {Addon} from "@/interfaces/Addon.ts";
import type {Package} from "@/interfaces";

const dates:any = [];

const attributes = ref([{
      dot: true,
      dates: dates,
}]);

const date = ref(new Date());

const formatTime = function(date: Date){
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return formatter.format(date);
};

const compareDates = function(unixTimestamp: string, dateString:any) {
  const firstDate = new Date(unixTimestamp);
  const secondDate = new Date(dateString);
  return (firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
    && firstDate.getMonth() === secondDate.getMonth()
    && firstDate.getDate() === secondDate.getDate());
};

const compareServiceTypes = function(serviceName:string,searchedName:string|null){
  if(searchedName) return (serviceName.toLowerCase() === searchedName.toLowerCase())
}

const selectedService = ref(null);
const allBookings = ref<Booking[]>();
const selectedBooking = ref<Booking | null>(null);
const searchedBookings = ref(Array(0));
const allServiceBookings = ref(Array(0));
const isLoading = ref(true);

// Fetch bookings from API
const fetchBookings = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(api.bookings);
    if (response.ok) {
      const bookingsData = await response.json();
      // Map the received data to add the missing selected ref property
      allBookings.value = bookingsData.map((booking:Booking) => ({
        ...booking,
        selected: ref(false)
      }));
    } else {
      console.error('Failed to fetch bookings');
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch bookings when component is mounted
onMounted(() => {
  fetchBookings();
});

const allServicesData = useServicesStore();

const selectTime = function(id:string){
  if(allBookings.value) {
    for (let i = 0; i < allBookings.value.length; i++) {
      if (allBookings.value[i].id !== id) {
        allBookings.value[i].selected = false
      }
      else {
        allBookings.value[i].selected = true;
        selectedBooking.value = allBookings.value[i];
      }
    }

  }

}

const resetSelection = function(){
  if(allBookings.value) {
    allBookings.value.forEach(booking =>{
      booking.selected = false;
    });
  }
}

const nextClick = ref(false);
const summaryClick = ref(false);
const showBookingsPanel = ref(true);
const showPackagesPanel = ref(false);
const showSummaryPanel = ref(false);

const showBookingsPanelClick = function (){
  showBookingsPanel.value = true;
  showPackagesPanel.value = false;
  showSummaryPanel.value = false;
}

const showPackagesPanelClick = function (){
  showBookingsPanel.value = false;
  showPackagesPanel.value = true;
  showSummaryPanel.value = false;
}

const showSummaryPanelClick = function (){
  showBookingsPanel.value = false;
  showPackagesPanel.value = false;
  showSummaryPanel.value = true;
}

const nextPanelClick = function (){
  nextClick.value = !nextClick.value;
}

watch(date,(newValue,oldValue)=>{
  if(allBookings.value && selectedService.value && newValue){
    searchedBookings.value = allBookings.value.filter(booking =>
      (compareDates(booking.timeStart,newValue) &&
        compareServiceTypes(booking.serviceType,selectedService.value))
    );
    selectedBooking.value = null;
    resetSelection();
  }
});

watch(selectedService,(newValue,oldValue)=>{
  if(allBookings.value && newValue) {
    allServiceBookings.value = allBookings.value.filter(booking =>
      compareServiceTypes(booking.serviceType,newValue)
    );

    attributes.value = [{
      dot:true,dates:allServiceBookings.value.map(booking  => booking.timeStart)
    }];

    searchedBookings.value = allBookings.value.filter(booking =>
      (compareDates(booking.timeStart,date.value) &&
        compareServiceTypes(booking.serviceType,newValue))
    );

    serviceData.value = allServicesData?.services?.find(service => (service.name === newValue));
    serviceImage.value = computed(()=> 'url("'+serviceData.value.image+'")').value;

    selectedBooking.value = null;
    resetSelection();
  }
});

const serviceData = ref();
const serviceImage = ref();
const selectedPackage = ref({desc:'',duration:0,price:0});
const selectedPackageName = ref(null);
const selectedAddons = ref([]);
const selectedAddonsNames = ref<String[]>(Array());

watch(selectedAddonsNames,(newValue,oldValue)=>{
  selectedAddons.value = serviceData.value.addons.filter((addOn:Addon) => (
    selectedAddonsNames.value.includes(addOn.name)
  ));
});

watch(selectedPackageName,(newValue,oldValue)=>{
  if(selectedPackageName.value) {
    selectedPackage.value = serviceData.value.packages.find((packageItem:Package) => (
      packageItem.name === newValue
    ));
  }
});

</script>

<template>

  <div class="header">
    BOOKINGS
  </div>

  <SummaryPanel
    :class="showSummaryPanel?'':'panelHidden'"
    :toggle="showSummaryPanel"
    :back-click="showPackagesPanelClick"
    :data="selectedBooking"
    :selected-package-name="selectedPackageName"
    :selected-addons-names="selectedAddonsNames"
  />

  <div :class=" [(showBookingsPanel ? 'bookings slideIn':'bookings panelHidden')]">
    <div class="bookingsWrap">

      <div class="title">Service Selection</div>

      <div class="controls">

        <div class="input">
          <select id="services" v-model="selectedService">
            <option :value="null" disabled>Select a Service</option>
            <template v-for="service in allServicesData.services">
              <option>{{service.name}}</option>
            </template>
          </select>
        </div>

      </div>

      <div class="bookingsGrid">

        <div class="border">
          <VDatePicker transparent borderless expanded is-required :attributes="attributes" v-model="date"/>
        </div>

        <div class="timeslotsWrap">

          <div v-if="isLoading" class="loading">
            Loading bookings...
          </div>

          <div v-else class="timeslots">
            <template v-for="booking in searchedBookings" :key="booking.id">
              <Timeslot @click="selectTime(booking.id)" :selected="booking.selected" :time="formatTime( new Date(booking.timeStart) )"/>
            </template>
          </div>

          <div class="empty" v-if="!isLoading && searchedBookings.length===0">
            No Bookings for {{selectedService}} on {{date.toDateString()}}.
          </div>

        </div>

      </div>

      <div class="buttons">
        <div :class=" selectedBooking===null ? 'selectBookingBtn':'selectBookingBtn hidden' ">
          <div>Select a Time</div>
        </div>
        <div :class=" selectedBooking!=null ? 'nextBtn':'nextBtn hidden' " @click="showPackagesPanelClick">
          <div>Next: Package Selection</div><NextIcon/>
        </div>
      </div>

    </div>

  </div>

  <div :class="showPackagesPanel? 'packagesWrap':'packagesWrap panelHidden'">

    <div :class="showPackagesPanel?'packages slideIn':'packages'" >

      <div class="title">Package Selection</div>

      <div class="controls">

        <template v-if="selectedService">
          <select id="packages" v-model="selectedPackageName">
            <option :value="null" disabled>Select a Package</option>
            <template v-for="packageItem in serviceData.packages">
              <option>{{packageItem.name}}</option>
            </template>
          </select>
        </template>
      </div>

      <div class="pkgSelection">
        <template v-if="serviceData">

          <div>{{selectedPackage?.desc}}</div>

          <div>Duration: {{selectedPackage.duration}} minutes</div>

          <div>Price: ${{selectedPackage.price}}</div>

          <div class="title">Add ons</div>

          <div class="addOns">
            <div v-for="(addOn,index) in serviceData.addons" class="addOn">
              <input type="checkbox" :id="addOn.name" :value="addOn.name" v-model="selectedAddonsNames"/>
              <label :for="addOn.name">{{addOn.name}}</label>
              <div>Price: ${{addOn.price}}</div>
            </div>
          </div>
        </template>
        <div class="buttonsWrap">
          <div class="backBtn" @click="showBookingsPanelClick"><BackIcon/>Back: Service Selection</div>
          <div class="buttons">
            <div :class=" selectedPackage.price === 0 ? 'selectBookingBtn':'selectBookingBtn hidden' ">
              <div>Select a Package</div>
            </div>
            <div :class=" selectedPackage.price != 0 ? 'nextBtn':'nextBtn hidden' " @click="showSummaryPanelClick">
              <div>Next: Booking Summary</div><NextIcon/>
            </div>
          </div>
        </div>


      </div>

    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../assets/Library";

.vc-arrow,.vc-title{
  background-color: $secondary !important;
}

.timeslotsWrap{
  display: flex;
}

.empty{
  display: flex;
  animation: 1s fadein forwards;
  margin-bottom: 1vw;
}

.panelHidden{
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
  transform: translateX(5%) !important;
  transition-behavior: allow-discrete;
  display: none !important;
  position: absolute !important;
}

.slideIn{
  animation: 0.5s slidein ease;
}

.controls{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vw;
}

.packagesWrap{
  overflow: hidden;
}

.bookingsGrid{
  display: flex;
};

.bookings{
  width: 80%;
  justify-self: center;
  margin-top: 2rem;
  border-radius: 6px;
  margin-bottom: 2rem;
}

.bookingsWrap{
  padding: 1vw;
  border:4px solid $secondary;
  border-radius: 6px;
  margin-bottom: 2rem;
}

.border{
  background-color: $secondary;
  border-radius: 6px;
  min-width: 50%;
}

.buttonsWrap{
  display: flex;
}

.timeslots{
  padding-left: 1vw;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: $fontNormal;
  color: $quaternary;
  width: 100%;
}

.input{
  display: flex;
  width: 100%;
}

.packages{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 1vw;
  width: 80%;
  margin: 2rem;
  justify-self: center;
  transform: translateX(0%);
  transition: 0.5s;
}

.addOns{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 1vw;
}

.addOn{
  background-color: $secondary;
  border-radius: 6px;
  padding: 1vw;
}

.buttons{
  display: flex;
  margin-top: 1vw;
}

.backBtn{
  height: 45px;
  width: fit-content;
  background-color: $secondary;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1vw;
  margin-top: 1vw;
  margin-right: 1vw;
}

.selectBookingBtn{
  background-color: $secondary;
  border-radius: 6px;
  height: 45px;
  padding: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  cursor: default;
  opacity: 1;
  transition: 0.5s;
}

.nextBtn{
  position: absolute;
  background-color: $quaternary;
  color: $primary;
  border-radius: 6px;
  height: 45px;
  padding: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  opacity: 1;
  transition: 0.5s;
}

.title{
  font-size: $fontMed;
}

.header{
  background-image: url("/events/event2.jpg");
}

</style>
