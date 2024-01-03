<script setup lang="ts">
import Options from "./components/Options.vue";
import Fetcher from "./components/Fetcher.vue";
import { ref } from "vue";
import makeUrl from "./makeUrl";

const url = ref<string>("");

const checkedCategories = ref<string[]>([]);
const checkedBlackLists = ref<string[]>([]);
const checkedJokeTypes = ref<string[]>([]);
</script>

<template>
  <h1>Joke Teller</h1>
  {{ checkedCategories }}
  {{ checkedBlackLists }}
  {{ checkedJokeTypes }}
  <p>Using the JokesAPI.</p>
  <Options
    v-model:checkedCategories="checkedCategories"
    v-model:checkedBlackLists="checkedBlackLists"
    v-model:checkedJokeTypes="checkedJokeTypes"
  />
  <Fetcher />
</template>

<style scoped>
h1 {
  font-size: 4rem;
  font-weight: bold;
}
</style>
