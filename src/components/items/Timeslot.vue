<script setup lang="ts">

const props = defineProps(['selected','time']);

</script>

<template>

  <div :class="selected ? 'timeslot selected': 'timeslot'">
    <div class="time">{{time}}</div>
  </div>

</template>

<style scoped lang="scss">

@import "../../assets/Colors";

.time{
  font-weight: 500;
}

.timeslot{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid $secondary;
  padding: 1rem;
  height: 100px;
  cursor: pointer;
  transition: 0.5s;
}

.selected{
  background-color: $quaternary;
  border: 4px solid $quaternary;
  color: $primary;
  transition: 0.5s;
}

</style>
