<script setup lang="ts">
import Options from "./components/Options.vue";
import Fetcher from "./components/Fetcher.vue";
</script>

<template>
  <h1>Joke Teller</h1>
  <p>Using the JokesAPI.</p>
  <Options />
  <Fetcher />
</template>

<style scoped>
h1 {
  font-size: 4rem;
  font-weight: bold;
}
</style>
