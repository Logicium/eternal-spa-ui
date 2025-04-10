<script setup lang="ts">

import TuneIcon from "@/assets/icons/TuneIcon.vue";
import {DatePicker as VDatePicker} from "v-calendar";
import data from "@/data.ts";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import {ref, watch} from "vue";
import Timeslot from "@/components/items/Timeslot.vue";
import NextIcon from "@/assets/icons/NextIcon.vue";

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
  const formattedTime = formatter.format(date);
  return formattedTime;
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

const selectedService = ref();
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

  selectedBooking.value = null;
  resetSelection();

})

</script>

<template>

  <div class="header">
    BOOKINGS
  </div>

  <div class="bookings">

    <div class="controls">

      <div class="input">
        <div class="searchIcon"><SearchIcon/></div>
        <select id="services" v-model="selectedService">
          <template v-for="service in data.services">
            <option>{{service.name}}</option>
          </template>
        </select>
      </div>

      <div class="filters"><TuneIcon/></div>

    </div>

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

      <div class="buttons">

        <div :class=" selectedBooking===null ? 'selectBookingBtn':'selectBookingBtn hidden' ">
          <div>Select a Time</div>
        </div>

        <div :class=" selectedBooking!=null ? 'nextBtn':'nextBtn hidden' " @click="">
          <div>Next</div><NextIcon/>
        </div>

      </div>

    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../assets/Colors";
@import "../assets/Fonts";
@import "../assets/Keyframes";

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

.controls{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.bookingsGrid{
  display: flex;
};

.bookings{
  width: 80%;
  justify-self: center;
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

.searchIcon{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $secondary;
}

.buttons{
  display: flex;
  justify-content: end;
  margin-left: auto;
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
  padding-left: 24px;
  background-color: $primary;
  border: none;
  color: $quaternary;
  border-bottom: 4px solid $secondary;
  width: 100%;
  font-family: "Outfit", sans-serif;
  margin-right: 1vw;
  font-size: 18px;
  transition: 0.5s;
}

select:focus{
  outline: none;
  border-bottom: 4px solid $quaternary;
  color: $quaternary;
  transition: 0.5s;
}

::placeholder{
  color: $secondary;
  transition: 0.5s;
}

</style>
