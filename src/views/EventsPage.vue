<script setup lang="ts">

import ListIcon from "@/components/icons/ListIcon.vue";
import GridIcon from "@/components/icons/GridIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import {ref} from "vue";
import ListItem from "@/components/ListItem.vue";
import data from "@/data.ts";
import GridItem from "@/components/GridItem.vue";

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
        <ListItem v-for="event in data.events" :data="event"/>
      </div>

      <div v-if="gridActive" class="gridView">
        <GridItem v-for="event in data.events" :data="event"/>
      </div>

      <div v-if="calActive" class="calendarView">

      </div>

    </div>

  </div>


</template>

<style scoped lang="scss">

@import "../assets/Colors";

.listView{
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-self: center;
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
  color: $primary;
  transition: 0.5s;
}

.control .active{
  background-color: $quaternary;
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
  letter-spacing: 2.5vw;
  background-size: cover;
  color: $primary;
  background-position: 100% 100%;
  background-image: url("/salt1.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 25vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

input{
  height:45px;
  width: 100%;
  margin-right: 2rem;
}

</style>
