<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  date: { type: [Date, String], required: true },
  size: { type: String, default: 'small', validator: (value: string) => ['small', 'big'].includes(value) }
});

const dateObj = computed(() => {
  return props.date instanceof Date ? props.date : new Date(props.date);
});

const day = computed(() => {
  return props.size === 'big'
    ? dateObj.value.toLocaleString('en-US', {weekday: 'long'})
    : dateObj.value.toLocaleString('en-US', {weekday: 'short'});
});

const date = computed(() => {
  return dateObj.value.getDate();
});

const month = computed(() => {
  return props.size === 'big'
    ? dateObj.value.toLocaleString('en-US', {month: 'long'})
    : dateObj.value.toLocaleString('en-US', {month: 'short'});
});
</script>

<template>
  <div class="date" :class="{ 'date-big': size === 'big', 'date-small': size === 'small' }">
    <div class="month">{{ month }}</div>
    <div class="num">{{ date }}</div>
    <div class="day">{{ day }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/Library";

.date {
  aspect-ratio: 1/1;
  background-color: $secondary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  line-height: calc(12px + 1.5vw);
}

.date-small {
  width: 100px;
  height: fit-content;
  margin: 1vw;
  color: $quaternary;
}

.date-big {
  width: 150px;
  min-width: 150px;
  margin-right: 1vw;
}

.num {
  font-size: calc(12px + 2vw);
  font-weight: 500;
}

</style>
