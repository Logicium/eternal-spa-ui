<script setup lang="ts">

import LocationIcon from "@/assets/icons/LocationIcon.vue";
import TImeIcon from "@/assets/icons/TimeIcon.vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const dateTime = new Date(props.data.time);
const day = dateTime.toLocaleString('en-US', {weekday: 'long'});
const date = dateTime.getDate();
const month = dateTime.toLocaleString('en-US', {month: 'long'});
const time = dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });

</script>

<template>

  <div class="event">
    <div class="date">
      <div>{{month}}</div>
      <div class="num">{{date}}</div>
      <div>{{day}}</div>
    </div>
    <div class="info">
      <div class="name">{{data.name}}</div>
      <div class="desc">{{data.desc}}</div>
      <div class="info2">
        <div class="location"><LocationIcon/> {{data.location}} </div>
        <div class="time"><TimeIcon/> {{time}}</div>
      </div>
      <div class="cta">See More</div>
    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Colors";
@import "../../assets/Fonts";

.event{
  display: flex;
  padding-bottom: 1vw;
  padding-top: 1vw;
  border-bottom: 4px solid $secondary;
}

.date{
  min-width: 150px;
  aspect-ratio: 1/1;
  margin-right: 1vw;
  background-color: $secondary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.num,.name{
  font-size: $fontMed;
  font-weight: 500;
}

.location,.time{
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-right: 1vw;
}

.info{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-overflow: ellipsis;
  overflow: hidden;
}

.info2{
  display: flex;
}

.desc{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cta{
  border-bottom: 4px solid $secondary;
  width: fit-content;
  cursor: pointer;
}

</style>
