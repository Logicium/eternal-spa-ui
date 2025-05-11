<script setup lang="ts">

import LocationIcon from "@/assets/icons/LocationIcon.vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";
import DateCard from "@/components/DateCard.vue";
import utils from "@/utils/utils.ts";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

let dateTime = new Date(props.data.time);
let time = utils.date.formatTimeShort(dateTime);

</script>

<template>
  <div class="event">

    <DateCard :date="data.time" size="small" />

    <div class="info">
      <div class="name">{{data.name}}</div>
      <div class="location"><LocationIcon/>{{data.location}} | <TimeIcon/> {{time}} </div>
      <div class="time"></div>
      <RouterLink :to="'/event/'+data.id"><div class="button underline">See More</div></RouterLink>
    </div>

  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Library";

.location{
  display: flex;
  align-items: center;
  white-space: break-spaces;
}

.event{
  display: flex;
  align-items: center;
  animation: 1s fadein forwards;
  margin-bottom: 2vw;
}

.info{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.name{
  font-weight: 500;
}

</style>
