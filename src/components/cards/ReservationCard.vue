<script setup lang="ts">
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import TimeIcon from "@/assets/icons/TimeIcon.vue";
import DateCard from "@/components/DateCard.vue";
import type { Reservation } from "@/interfaces";

const props = defineProps({
  reservation: {
    type: Object as () => Reservation,
    required: true
  },
});

const emit = defineEmits(['viewDetails']);

const dateTime = new Date(props.reservation.timeStart);
const time = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const viewDetails = () => {
  emit('viewDetails', props.reservation);
};
</script>

<template>
  <div class="reservation" @click="viewDetails">
    <DateCard :date="reservation.timeStart" size="small" />

    <div class="info">
      <div class="name">{{ reservation.service?.name || 'Service' }}</div>
      <div class="desc">{{ reservation.package?.name || 'Package' }}</div>
      <div class="info2">
        <div class="time"><TimeIcon/> {{ time }}</div>
        <div class="price">${{ reservation.totalPrice.toFixed(2) }}</div>
      </div>
      <div class="button underline">View Details</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/Library";

.reservation {
  display: flex;
  padding-bottom: 1vw;
  padding-top: 1vw;
  border-bottom: 4px solid $secondary;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba($secondary, 0.1);
  }
}

.name {
  font-size: $fontMed;
  font-weight: 500;
}

.time, .price {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-right: 1vw;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.info2 {
  display: flex;
}

.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
