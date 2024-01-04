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

const isInitialLoad = ref(true);
const loading = ref(false);
const error = ref<any>("");
const apiResponse = ref<JokeResponse>();

const fetchData = async (): Promise<void> => {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(props.url);
    const data = await response.json();
    apiResponse.value = data;
  } catch (error: any) {
    console.error(error);
    error.value = error;
  } finally {
    loading.value = false;
  }
};

const handleClick = async () => {
  isInitialLoad.value = false;
  await fetchData();
};
</script>

<template>
  <button @click="handleClick">Fetch a joke!</button>
  <div class="url-container">
    {{ url }}
  </div>
  <p class="loading-text" v-if="loading">Loading...</p>
  <p v-else-if="isInitialLoad"></p>
  <p v-else-if="apiResponse?.type === 'single'">
    {{ apiResponse.joke }}
  </p>
  <p v-else-if="apiResponse?.type === 'twopart'">
    {{ apiResponse.setup }} <br />
    {{ apiResponse.delivery }}
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
