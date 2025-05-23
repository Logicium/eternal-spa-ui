<script setup lang="ts">

import ListIcon from "@/assets/icons/ListIcon.vue";
import GridIcon from "@/assets/icons/GridIcon.vue";
import CalendarIcon from "@/assets/icons/cal/CalendarIcon.vue";
import {ref, watch} from "vue";
import EventListCard from "@/components/cards/EventListCard.vue";
import data from "@/data/data.ts";
import EventGridCard from "@/components/cards/EventGridCard.vue";
import {DatePicker as VDatePicker} from "v-calendar";
import CalCard from "@/components/cards/CalCard.vue";

const listActive = ref(true);
const gridActive = ref(false);
const calActive = ref(false);
const enableList = function (){
  listActive.value = true;
  gridActive.value = false;
  calActive.value = false;
}
const enableGrid = function (){
  listActive.value = false;
  gridActive.value = true;
  calActive.value = false;
}
const enableCal = function (){
  listActive.value = false;
  gridActive.value = false;
  calActive.value = true;
}
const date = ref(new Date());

const compareDates = function(unixTimestamp: number, dateString:any) {
  const firstDate = new Date(unixTimestamp);
  const secondDate = new Date(dateString);

  console.log("First Date: ",firstDate,"Second Date: ",secondDate)
  return (firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
    && firstDate.getUTCMonth() === secondDate.getUTCMonth()
    && firstDate.getDate() === secondDate.getDate());
};

const searchedEvents = ref(new Array(0));

watch(date,(newValue,oldValue)=>{
  searchedEvents.value = data.events.filter(event =>
    (compareDates(event.time,newValue) )
  );
  console.log("Matching results: ",searchedEvents.value);
});

const dates = data.events.map(  event  => event.time );
const attributes = ref([
  {
    dot: true,
    dates: dates,
  }
  ]
);

</script>

<template>

  <div class="header">
    EVENTS
  </div>

  <div class="events">

    <div class="controls">
      <div class="title">6 Upcoming Events</div>
      <div class="viewControls">
        <div :class="listActive ? 'control active' : 'control' " @click="enableList"><ListIcon/></div>
        <div :class="gridActive ? 'control active' : 'control' " @click="enableGrid"><GridIcon/></div>
        <div :class="calActive ? 'control active' : 'control' " @click="enableCal"><CalendarIcon/></div>
      </div>
    </div>

    <div class="views">

      <div v-if="listActive" class="listView">
        <EventListCard v-for="event in data.events" :data="event"/>
      </div>

      <div v-if="gridActive" class="gridView">
        <EventGridCard v-for="event in data.events" :data="event"/>
      </div>

      <div v-if="calActive" class="calendarView">
        <div class="eventView">
<!--          {{date}}-->
          <div class="eventSearch">
            <CalCard v-for="event in searchedEvents" :data="event"/>
            <div class="empty" v-if="searchedEvents.length===0">No Events on {{date.toDateString()}}.</div>
          </div>
        </div>
        <div class="calendarWrap">
          <VDatePicker borderless expanded transparent is-required :attributes="attributes" v-model="date"/>
        </div>
      </div>

    </div>

  </div>


</template>

<style scoped lang="scss">

@import "../assets/Library";

.calendarWrap{
  background-color: $secondary;
  border-radius: 6px;
}

.calendarView{
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  height: 50vh;
  justify-self: center;
  margin-bottom: 2rem;
}

.empty{
  display: flex;
  animation: 1s fadein forwards;
}

.listView{
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-self: center;
  margin-bottom: 2rem;
}

.gridView{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-bottom: 2rem;
  width: 80%;
  justify-self: center;
}

.active{
  background-color: $quaternary;
  color: $primary;
  border-radius: 6px;
  transition: 0.5s;
}

.title{
  font-size: calc(12px + 2vw);
}

.events{
  display: flex;
  flex-direction: column;
}

.viewControls{
  display: flex;
  justify-content: space-between;
  background-color: $secondary;
  border-radius: 6px;
}

.control{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  cursor: pointer;
  transition: 0.5s;
}

.control:hover{
  background-color: $quaternary;
  border-radius: 6px;
  color: $primary;
  transition: 0.5s;
}


.controls{
  padding: 2rem 0;
  width: 80%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  border-radius: 6px;
}

.header{
  background-image: url("/events/event2.jpg");
}

input{
  margin-right: 2rem;
}

</style>
