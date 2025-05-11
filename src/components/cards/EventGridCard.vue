<script setup lang="ts">

import {computed} from "vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import DateCard from "@/components/DateCard.vue";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

const imageUrl = computed(()=> 'url("'+props.data.image+'")').value;

const dateTime = new Date(props.data.time);
const time = dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });

</script>

<template>

  <div class="event">
    <div class="image">
      <DateCard :date="data.time" size="small" />
    </div>
    <div class="name">{{data.name}}</div>
    <div class="location"><LocationIcon/> {{data.location}}</div>
    <div class="time"><TimeIcon/> {{time}} </div>
    <RouterLink :to="'/event/'+data.id"><div class="button underline rev">See More</div></RouterLink>
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

</style>
