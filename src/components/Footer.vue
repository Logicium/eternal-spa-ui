<script setup lang="ts">

</script>

<template>

<div class="footer">

  <div class="links">

    <div class="navigation">
      <div class="name">NAVIGATION</div>
      <div>Home</div>
      <div>Services</div>
      <div>Vendors</div>
      <div>Podcast</div>
    </div>

    <div class="socials">
      <div class="name">SOCIAL</div>
      <div>Facebook</div>
      <div>Instagram</div>
      <div>Messenger</div>
    </div>

    <div class="resources">
      <div class="name">RESOURCES</div>
      <div>About</div>
      <div>Contact</div>
      <div>Terms of Service</div>
    </div>

  </div>

  <div class="ctaWrap">
    <div class="ctaText">Sign up to earn reward points and get notified of new events.</div>
    <div class="cta">
      <input type="email" placeholder="Email">
      <div class="button">SIGN UP</div>
    </div>
  </div>

</div>

</template>

<style lang="scss" scoped>
@import "../assets/Colors";

.footer{
  padding-bottom: 2rem;
  background-color: $secondary;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ctaWrap{
  width: 60%;
}

.ctaText{
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 3vw;
}

.cta{
  display: flex;
  justify-content: space-between;
}

.name{
  font-weight: 600;
}

.links{
  margin-top: 2rem;
  display: flex;
  width: 60%;
  justify-content: space-between;
}

.button{
  cursor: pointer;
  color: $primary;
  width: 20%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $quaternary;
  border-radius: 6px;
  padding: 1vw;
  margin-left: 1vw;
}

input{
  width: 80%;
  border-radius: 6px;
  border: none;
}

</style>
