<script setup lang="ts">

import LocationIcon from "@/assets/icons/LocationIcon.vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";
import DateCard from "@/components/DateCard.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const dateTime = new Date(props.data.time);
const time = dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });

</script>

<template>

  <div class="event">

    <DateCard :date="data.time" size="big" />

    <div class="info">
      <div class="name">{{data.name}}</div>
      <div class="desc">{{data.desc}}</div>
      <div class="info2">
        <div class="location"><LocationIcon/> {{data.location}} </div>
        <div class="time"><TimeIcon/> {{time}}</div>
      </div>
      <RouterLink :to="'/event/'+data.id"><div class="button underline">See More</div></RouterLink>
    </div>

  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Library";

.event{
  display: flex;
  padding-bottom: 1vw;
  padding-top: 1vw;
  border-bottom: 4px solid $secondary;
}

.name{
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

</style>
