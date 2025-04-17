<script setup lang="ts">

</script>

<template>
  <div class="loginItem">
    <div class="title">Guest Info</div>
    <div class="inputs">
      <input type="text" placeholder="Name*" required>
      <input type="email" placeholder="Email*" required>
      <input type="text" placeholder="Phone">
      <div class="notifs">
        <input type="checkbox">
        <div>I agree to receive text or email booking updates at the number/email provided.</div>
      </div>
      <div class="tos">
        <input type="checkbox">
        <div>I agree to the Terms of Service and Privacy Policy.*</div>
      </div>
    </div>
    <div class="buttons">
      <div class="button fill">Checkout & Rewards Signup</div>
      <div class="or">or</div>
      <div class="button ghost">Checkout as Guest</div>
    </div>

  </div>
</template>

<style scoped lang="scss">

@import "../../assets/Library";

.loginItem{
  margin-top: 2rem;
  border: 4px solid $secondary;
  border-radius: 6px;
  padding: 1vw;
  display: flex;
  flex-direction: column;
}

.notifs,.tos{
  display: flex;
  align-items: center;
}

.inputs{
  display: grid;
  grid-gap: 1vw;
}

.or{
  padding: 0 1vw;
}

.title{
  font-size: $fontMed;
}

.buttons{
  display: flex;
  margin-top: 1vw;
  align-items: center;
}

.button{
  width: fit-content;
  height: 45px;
  border-radius: 6px;
  padding: 1vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button.ghost{
  background-color: transparent;
  border: 4px solid $secondary;
}

.button.fill{
  background-color: $quaternary;
  color: $primary;
}

input{
  background-color: $secondary;
  border: none;
  height: 45px;
  font-size: $fontNormal;
  border-radius: 6px;
  font-family: "Outfit", sans-serif;
}

input[type="checkbox"]{
  margin-right: 1vw;
}

</style>
