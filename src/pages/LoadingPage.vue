<script setup lang="ts">
const props = defineProps({
  big:{
    default: false,
    type: Boolean
  }
});

</script>

<template>
  <div :class="big ? 'loading big':'loading'">
    <div class="loadingCard pulse"></div>
    <div class="loadingCard narrow pulse"></div>
  </div>
</template>

<style scoped lang="scss">

@import "../assets/Library";

.loading{
  height: 100vh;
  display: grid;
  grid-gap: 2rem;
  position: relative;
  grid-template-rows: 25vh;
  margin-bottom: 2rem;
}

.loading.big{
  grid-template-rows: 70vh;
}

.loadingCard{
  background-color: $secondary;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

.narrow{
  width: 80%;
  justify-self: center;
}

.pulse::before{
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, transparent, $primary, transparent);
  animation: pulsate 2s infinite;
}

@keyframes pulsate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}


</style>
