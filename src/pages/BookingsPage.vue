<script setup lang="ts">

import TuneIcon from "@/assets/icons/TuneIcon.vue";
import {DatePicker as VDatePicker} from "v-calendar";
import data from "@/data.ts";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import {computed, ref, watch} from "vue";
import Timeslot from "@/components/items/Timeslot.vue";
import NextIcon from "@/assets/icons/NextIcon.vue";
import Summary from "@/components/Summary.vue";
import BackIcon from "@/assets/icons/BackIcon.vue";

const dates = [];

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

const compareDates = function(unixTimestamp: number, dateString:any) {
  const firstDate = new Date(unixTimestamp);
  const secondDate = new Date(dateString);

  return (firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
    && firstDate.getUTCMonth() === secondDate.getUTCMonth()
    && firstDate.getDate() === secondDate.getDate());
};

const compareServiceTypes = function(serviceName:string,searchedName:string){
  return (serviceName.toLowerCase() === searchedName.toLowerCase())
}

const selectedService = ref(null);
const allBookings = ref(data.bookings);
const selectedBooking = ref(null);
const searchedBookings = ref(new Array(0));
const allServiceBookings = ref(Array(0));

const selectTime = function(id:number){
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

const resetSelection = function(){
  allBookings.value.forEach(booking =>{
    booking.selected = false;
  });
}

const nextClick = ref(false);

const nextPanelClick = function (){
  nextClick.value = !nextClick.value;
}

watch(date,(newValue,oldValue)=>{
  searchedBookings.value = data.bookings.filter(booking =>
    (compareDates(booking.timeslot,newValue) &&
      compareServiceTypes(booking.serviceType,selectedService.value))
  );
  selectedBooking.value = null;
  resetSelection();
});

watch(selectedService,(newValue,oldValue)=>{

  allServiceBookings.value = data.bookings.filter(booking =>
      compareServiceTypes(booking.serviceType,newValue)
  );

  attributes.value = [{
    dot:true,dates:allServiceBookings.value.map(booking  => booking.timeslot)
  }];

  searchedBookings.value = data.bookings.filter(booking =>
    (compareDates(booking.timeslot,date.value) &&
      compareServiceTypes(booking.serviceType,newValue))
  );

  serviceData.value = data.services.find(service => (service.name === newValue));
  serviceImage.value = computed(()=> 'url("'+serviceData.value.image+'")').value;

  selectedBooking.value = null;
  resetSelection();

});

const serviceData = ref();
const serviceImage = ref();
const selectedPackage = ref({desc:'',duration:0,price:0});
const selectedPackageName = ref(null);
const selectedAddons = ref([]);
const selectedAddonsNames = ref([]);

watch(selectedAddonsNames,(newValue,oldValue)=>{
  selectedAddons.value = serviceData.value.addOns.filter( addOn => (
    selectedAddonsNames.value.includes(addOn.name)
  ));
});

watch(selectedPackageName,(newValue,oldValue)=>{
  if(selectedPackageName.value) {
    selectedPackage.value = serviceData.value.packages.find(packageItem => (
      packageItem.name === newValue
    ));
  }
});

</script>

<template>

  <div class="header">
    BOOKINGS
  </div>

  <Summary :class="!nextClick?'panelHidden':''" :toggle="nextClick" :back-click="nextPanelClick" :data="selectedBooking"/>

  <div :class=" [(nextClick ? 'bookings panelHidden':'bookings'),(nextClick==false ?'slideIn':'')]">
    <div class="bookingsWrap">
      <div class="controls">

        <div class="input">
          <select id="services" v-model="selectedService">
            <option :value="null" disabled>Select a Service</option>
            <template v-for="service in data.services">
              <option>{{service.name}}</option>
            </template>
          </select>
        </div>

        <div class="filters"><TuneIcon/></div>

      </div>

      <div class="title">Service Selection</div>

      <div class="bookingsGrid">

        <div class="border">
          <VDatePicker transparent borderless expanded is-required :attributes="attributes" v-model="date"/>
        </div>

        <div class="timeslotsWrap">

          <div class="timeslots">

            <template v-for="booking in searchedBookings">
              <Timeslot @click="selectTime(booking.id)" :selected="booking.selected" :time="formatTime( new Date(booking.timeslot) )"/>
            </template>

          </div>

          <div class="empty" v-if="searchedBookings.length===0">
            No Bookings for {{selectedService}} on {{date.toDateString()}}.
          </div>

        </div>

      </div>

    </div>

    <div class="packages">

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

      <div class="title">Package Selection</div>

      <div class="pkgSelection">
        <template v-if="serviceData">

          <div>{{selectedPackage?.desc}}</div>

          <div>Duration: {{selectedPackage.duration}} minutes</div>

          <div>Price: ${{selectedPackage.price}}</div>

          <div class="title">Add ons</div>

          <div class="addOns">
            <div v-for="(addOn,index) in serviceData.addOns" class="addOn">
              <input type="checkbox" :id="addOn.name" :value="addOn.name" v-model="selectedAddonsNames"/>
              <label :for="addOn.name">{{addOn.name}}</label>
              <div>Price: ${{addOn.price}}</div>
            </div>
          </div>

          <div class="buttons">

            <div :class=" selectedBooking===null ? 'selectBookingBtn':'selectBookingBtn hidden' ">
              <div>Select a Time</div>
            </div>

            <div :class=" selectedBooking!=null ? 'nextBtn':'nextBtn hidden' " @click="nextPanelClick">
              <div>Next</div><NextIcon/>
            </div>

          </div>

        </template>
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
  transition-behavior: allow-discrete;
  display: none;
  position: absolute;
}

.slideIn{
  animation: 0.5s slidein ease;
}

.controls{
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.timeslots{
  padding-left: 1vw;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

.input{
  display: flex;
  width: 100%;
}

.packages{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 1vw;
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

.searchIcon{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $secondary;
}

.buttons{
  display: flex;
  margin-top: 1vw;
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
  margin-left: auto;
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
  margin-left: auto;
  opacity: 1;
  transition: 0.5s;
}

.hidden{
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
}

.title{
  font-size: $fontMed;
}

.header{
  letter-spacing: 2.5vw;
  background-size: cover;
  color: $primary;
  background-position: 100% 20%;
  background-image: url("/events/event2.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 25vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}


.filters{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  min-width: 45px;
  background-color: $secondary;
  color: $quaternary;
  border-radius: 6px;
  cursor: pointer;
}

select{
  height: 45px;
  font-size: $fontNormal;
  border: none;
  color: $quaternary;
  background-color: $secondary;
  border-radius: 6px;
  width: 100%;
  font-family: "Outfit", sans-serif;
  margin-right: 1vw;
  transition: 0.5s;
}

</style>
