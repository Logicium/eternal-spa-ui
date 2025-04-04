<script setup lang="ts">

import ListIcon from "@/components/icons/ListIcon.vue";
import GridIcon from "@/components/icons/GridIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
</script>

<template>

  <div class="header">
    EVENTS
  </div>

  <div class="events">

    <div class="controls">
      <div class="title">6 Upcoming Events</div>
      <div class="viewControls">
        <div class="control"><ListIcon/></div>
        <div class="control"><GridIcon/></div>
        <div class="control"><CalendarIcon/></div>
      </div>
    </div>

    <div class="views">

      <div class="listView"></div>

      <div class="gridView"></div>

      <div class="calendarView"></div>

    </div>

  </div>


</template>

<style scoped lang="scss">

@import "../assets/Colors";

.title{
  font-size: calc(12px + 3vw);
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
  padding: 0 2rem;
  width: 60%;
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
