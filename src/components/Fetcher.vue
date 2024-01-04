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
    setup.value = response?.setup;
    delivery.value = response?.delivery;
    jokeType.value = type;
  } else {
    resetValues();
    error.value = "No jokes with the given filters were found.";
  }
};

const fetchData = async (): Promise<JokeResponse> => {
  loading.value = true;
  const response = await fetch(props.url);
  const data = await response.json();
  loading.value = false;
  return data;
};

const handleClick = async () => {
  const fetchedData = await fetchData();
  processData(fetchedData);
};
</script>

<template>
  <button @click="handleClick">Fetch a joke!</button>
  <div class="url-container">
    {{ url }}
  </div>
  <p class="loading-text" v-if="loading">Loading...</p>
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
.url-container {
  border: 1px solid white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
}

p {
  text-align: center;
}

.loading-text {
  color: red;
  font-weight: bold;
}

button {
  padding: 0.5rem 1rem;
  font-size: inherit;
  background-color: green;
  color: white;
  border-radius: 16px;
  border: none;
  outline: none;
  transition: all 0.8s ease;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: limegreen;
  }

  &:focus {
    outline-offset: 2px;
    outline: 1px solid green;
  }
}
</style>
