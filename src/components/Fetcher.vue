<script setup lang="ts">
import { ref } from "vue";
import type { JokeResponse } from "@/types";

interface Props {
  url: string;
}

// setTimeout(() => {
//   console.log(window.speechSynthesis.getVoices());
// }, 1000);

const props = defineProps<Props>();

const response = ref();
const loading = ref(false);
const error = ref("");
const apiResponse = ref<JokeResponse>();
const joke = ref("");
const setup = ref("");
const delivery = ref("");
const jokeType = ref("");

const resetValues = () => {
  joke.value = "";
  setup.value = "";
  delivery.value = "";
  jokeType.value = "";
};

const processData = (response: any) => {
  const { type = "" } = response;
  if (type === "single") {
    joke.value = response.joke;
    jokeType.value = type;
  } else if (type === "twopart") {
    setup.value = response.setup;
    delivery.value = response.delivery;
    jokeType.value = type;
  } else {
    resetValues();
    error.value = "No jokes with the given filters were found.";
  }
};

const fetchData = async () => {
  loading.value = true;
  const response = await fetch(props.url);
  const data = await response.json();
  loading.value = false;
  return data;
};

const handleClick = async () => {
  const fetchedData = await fetchData();
  console.log(fetchedData);
  processData(fetchedData);
};
</script>

<template>
  <button @click="handleClick">Fetch a joke!</button>
  {{ url }}
  <p v-if="loading">Loading...</p>
  <p v-else-if="jokeType === 'single'">
    {{ joke }}
  </p>
  <p v-else-if="jokeType === 'twopart'">
    {{ setup }} <br />
    {{ delivery }}
  </p>
  <p v-else>No joke with the above filters were found.</p>
</template>

<style scoped>
p {
  text-align: center;
}
</style>
