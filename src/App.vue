<script setup lang="ts">
import Options from './components/Options.vue'
import Fetcher from './components/Fetcher.vue'
import { ref, computed } from 'vue'
import makeUrl from './makeUrl'

const checkedCategories = ref<string[]>([])
const checkedBlackLists = ref<string[]>([])
const checkedJokeTypes = ref<string[]>([])

const apiUrl = computed(() => {
  return makeUrl(
    checkedCategories.value,
    checkedBlackLists.value,
    checkedJokeTypes.value
  )
})
</script>

<template>
  <h1>Joke Teller</h1>
  <Options
    v-model:checkedCategories="checkedCategories"
    v-model:checkedBlackLists="checkedBlackLists"
    v-model:checkedJokeTypes="checkedJokeTypes"
  />
  <Fetcher :url="apiUrl" />
</template>

<style scoped>
h1 {
  font-size: 4rem;
  font-weight: bold;
}
</style>
