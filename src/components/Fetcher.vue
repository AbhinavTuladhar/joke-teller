<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { JokeResponse, TwoPartJoke, OnePartJoke } from "@/types";

interface Props {
  url: string;
}

const props = defineProps<Props>();

const isInitialLoad = ref(true);
const loading = ref(false);
const error = ref<any>("");
const apiResponse = ref<JokeResponse>();
const synth = ref<SpeechSynthesis>(window.speechSynthesis);
const voices = ref<SpeechSynthesisVoice[]>();
const utterer = ref<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance());

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

  const { type: jokeType } = apiResponse.value || {};

  let textToSpeak;
  if (jokeType === "single") {
    const response = apiResponse.value as OnePartJoke;
    const { joke } = response;
    textToSpeak = joke;
  } else if (jokeType === "twopart") {
    const response = apiResponse.value as TwoPartJoke;
    const { setup, delivery } = response;
    textToSpeak = setup + delivery;
  }

  utterer.value.text = textToSpeak || "Failed to fetch a joke";
  synth.value?.speak(utterer.value);
};

onMounted(() => {
  setTimeout(() => {
    const synthTemp = window.speechSynthesis;
    const voiceList = synthTemp.getVoices();
    const utterThis = new SpeechSynthesisUtterance();
    synth.value = synthTemp;
    voices.value = voiceList;

    // Voice configuration
    utterer.value = utterThis;
    utterer.value.rate = 1.25;

    // Male british english voice
    utterer.value.voice = voiceList[3];
  }, 2000);
});
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
  max-width: 100%;
  text-align: center;
  white-space: pre-line;
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
