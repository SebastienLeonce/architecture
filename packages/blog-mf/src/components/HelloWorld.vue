<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 class="not-mobile">
      Welcome to the Blog. Please enter your name and email address to register or log in.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 900;
  font-size: 2.6rem;
  top: -10px;

}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  .not-mobile {
    display: block;
  }
}

@media (max-width: 1024px) {
  .not-mobile {
    display: none;
  }
}
</style>
