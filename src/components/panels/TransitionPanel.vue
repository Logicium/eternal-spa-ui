<script setup lang="ts">

</script>

<template>
  <div class="panelWrap">
    <transition-group name="fade" appear>
      <slot/>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Library";

.panelWrap{
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

</style>
