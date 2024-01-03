<script setup lang="ts">
import { ref } from "vue";

interface Props {
  url: string;
}

const props = defineProps<Props>();

const response = ref();
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  const response = await fetch(props.url);
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
  {{ url }}
  <p v-if="loading">Loading...</p>
  <p v-else>
    {{ response?.joke }}
  </p>
</template>
