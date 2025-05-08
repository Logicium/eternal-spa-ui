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
        <div>{{day}}</div>
      </div>
    </div>
    <div class="name">{{data.name}}</div>
    <div class="location"><LocationIcon/> {{data.location}}</div>
    <div class="time"><TimeIcon/> {{time}} </div>
    <RouterLink :to="'/event/'+data.id"><div class="cta">See More</div></RouterLink>
  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

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
  width: 100px;
  aspect-ratio: 1/1;
  background-color: $secondary;
  color: $quaternary;
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  line-height: calc(12px + 1.5vw);
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

a{
  color: initial;
}

</style>
