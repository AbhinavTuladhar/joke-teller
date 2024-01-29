<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { JokeResponse, TwoPartJoke, OnePartJoke } from '@/types'

interface Props {
  url: string
}

const { url } = defineProps<Props>()

const isInitialLoad = ref(true)
const loading = ref(false)
const error = ref<any>('')
const apiResponse = ref<JokeResponse>()
const synth = window.speechSynthesis
const voices = ref<SpeechSynthesisVoice[]>([])
const utterer = new SpeechSynthesisUtterance()
const selectedVoiceIndex = ref<number>(0)

const fetchData = async (): Promise<void> => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(url)
    const data = await response.json()
    apiResponse.value = data
  } catch (error: any) {
    console.error(error)
    error.value = error
  } finally {
    loading.value = false
  }
}

// Fetch the joke and read it.
const handleClick = async () => {
  isInitialLoad.value = false
  await fetchData()

  sayJoke()
}

// Just says the joke.
const sayJoke = () => {
  const { type: jokeType } = apiResponse.value || {}

  let textToSpeak
  if (jokeType === 'single') {
    const response = apiResponse.value as OnePartJoke
    const { joke } = response
    textToSpeak = joke
  } else if (jokeType === 'twopart') {
    const response = apiResponse.value as TwoPartJoke
    const { setup, delivery } = response
    textToSpeak = setup + '. ' + delivery
  }

  utterer.text = textToSpeak || 'Failed to fetch a joke'
  synth?.speak(utterer)
}

// On initial load, a timeout is used in order to give the browser some time to load the voice list.
onMounted(() => {
  setTimeout(() => {
    const synthTemp = window.speechSynthesis
    const voiceList = synthTemp.getVoices()

    voiceList.forEach((voice) => {
      voices.value.push(voice)
    })

    // Voice configuration
    utterer.rate = 1
    utterer.voice = voices.value[0]
  }, 5000)
})

// Executed whenever a separate voice is selected.
const handleVoiceChange = () => {
  utterer.voice = voices.value[selectedVoiceIndex.value]
}
</script>

<template>
  <div class="btn-container">
    <button @click="handleClick">Fetch a joke!</button>
    <button @click="sayJoke">Say the joke again!</button>
  </div>

  <select
    v-if="voices.length > 0"
    v-model="selectedVoiceIndex"
    @click="handleVoiceChange"
  >
    <option v-for="(voice, index) in voices" :key="voice.name" :value="index">
      {{ voice.name }}
    </option>
  </select>

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

.btn-container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
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

select {
  width: fit-content;
  margin-inline: 2rem;
}
</style>
