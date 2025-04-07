<script setup lang="ts">

import {computed} from "vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const imageUrl = computed(()=> 'url("'+props.data.image+'")').value;

const dateTime = new Date(props.data.time);
const day = dateTime.toLocaleString('en-US', {weekday: 'short'});
const date = dateTime.getDate();
const month = dateTime.toLocaleString('en-US', {month: 'short'});
const time = dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });

</script>

<template>

  <div class="event">
    <div class="image">
      <div class="date">
        <div class="month">{{month}}</div>
        <div class="num">{{date}}</div>
      </div>
    </div>
    <div class="name">{{data.name}}</div>
    <div class="location"><LocationIcon/> {{data.location}}</div>
    <div class="time"><TimeIcon/> {{time}} </div>
    <div class="cta">See More</div>
  </div>

</template>

<style scoped lang="scss">

@import "../assets/Colors";

.event{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $secondary;
  border-radius: 6px;
  padding: 1vw;
}

.image{

  background-image: v-bind(imageUrl);
  background-size: cover;
  background-position: 100% 100%;
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
}

.name{
  font-weight: 500;
}

.location,.time{
  display: flex;
  align-items: center;
  font-weight: 500;
}

.date{
  margin: 1vw;
  min-width: 90px;
  background-color: $secondary;
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.num{
  font-size: calc(12px + 2vw);
  font-weight: 500;
}

.cta{
  border-bottom: 4px solid $quaternary;
  width: fit-content;
  cursor: pointer;
}

</style>
