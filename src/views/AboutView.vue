<template>

  <div class="header">
    ABOUT
  </div>

  <div class="about">

    <div class="title">Located in the heart of Southern Colorado, we offer first class experiences.</div>

  </div>

</template>

<style lang="scss" scoped>

@import "../assets/Colors";

.about{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.title{
  font-size: 3vw;
  width: 60%;
}

.header{
  letter-spacing: 2.5vw;
  background-size: cover;
  color: $primary;
  background-position: 100% 100%;
  background-image: url("/salt1.jpg");
  justify-content: center;
  align-items: center;
  display: flex;
  height: 25vh;
  font-size: calc(12px + 4vw);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

</style>
