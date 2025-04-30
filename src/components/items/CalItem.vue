<script setup lang="ts">

import LocationIcon from "@/assets/icons/LocationIcon.vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";
import {ref} from "vue";
import utils from "@/utils/utils";

const props = defineProps({
  data: { type: Object, default: ()=>{}},
})

let dateTime = new Date(props.data.time);
let day = utils.date.formatWeekday(dateTime);
let date = ref(dateTime.getDate());
let month = utils.date.formatMonth(dateTime);
let time = utils.date.formatTimeShort(dateTime);

</script>

<template>
  <div class="event">

    <div class="date">
      <div class="month">{{month}}</div>
      <div class="num">{{new Date(data.time).getDate()}}</div>
      <div class="day">{{day}}</div>
    </div>

    <div class="info">
      <div class="name">{{data.name}}</div>
      <div class="location"><LocationIcon/>{{data.location}} | <TimeIcon/> {{time}} </div>
      <div class="time"></div>
      <RouterLink :to="'/event/'+data.id"><div class="cta">See More</div></RouterLink>
    </div>

  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Keyframes";
@import "../../assets/Colors";

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

.cta{
  border-bottom: 4px solid $secondary;
  width: fit-content;
  cursor: pointer;
}

.date{
  margin-right: 1vw;
  aspect-ratio: 1/1;
  width: 100px;
  background-color: $secondary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  line-height: calc(12px + 1.5vw);
}
.name{
  font-weight: 500;
}

.num{
  font-size: calc(12px + 2vw);
  font-weight: 500;
}

a{
  color: initial;
}

</style>
