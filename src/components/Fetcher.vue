<script setup lang="ts">
import { ref } from "vue";

const response = ref();
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  const url =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=single";
  const response = await fetch(url);
  const data = await response.json();
  loading.value = false;
  return data;
};

const handleClick = async () => {
  const fetchedData = await fetchData();
  response.value = fetchedData;
  console.log(response.value);
};
</script>

<template>
  <button @click="handleClick">Fetch a joke!</button>
  <p v-if="loading">Loading...</p>
  <p v-else>
    {{ response?.joke }}
  </p>
</template>
