<script setup lang="ts">
import { ref } from "vue";

const categoryData = [
  { id: "Programming", label: "Programming" },
  { id: "Misc", label: "Misc" },
  { id: "Dark", label: "Dark" },
  { id: "Pun", label: "Pun" },
  { id: "Spooky", label: "Spooky" },
  { id: "Christmas", label: "Christmas" },
];

const blacklistData = [
  { id: "Nsfw", label: "Nsfw" },
  { id: "Religious", label: "Religious" },
  { id: "Political", label: "Political" },
  { id: "Racist", label: "Racist" },
  { id: "Sexist", label: "Sexist" },
  { id: "Explicit", label: "Explicit" },
];

const jokeTypeData = [
  { id: "Single", label: "Single" },
  { id: "Double", label: "Double" },
];

const checkedCategories = ref<string[]>([]);
const checkedBlackLists = ref<string[]>([]);
const checkedJokeTypes = ref<string[]>([]);
</script>

<template>
  <div class="options">
    <h2>Choose the options:</h2>
    <div class="options-wrapper">
      {{ checkedCategories }}
      {{ checkedBlackLists }}
      {{ checkedJokeTypes }}
      <table>
        <tr>
          <td>Select the category or categories:</td>
          <td>
            <div class="options__box">
              <div
                class="checkbox-container"
                v-for="category in categoryData"
                :key="category.id"
              >
                <input
                  type="checkbox"
                  :id="category.id"
                  :value="category.id"
                  v-model="checkedCategories"
                />
                <label :for="category.id"> {{ category.label }}</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Select the flags to blacklist:</td>
          <td>
            <div class="options__box">
              <div
                class="checkbox-container"
                v-for="blacklist in blacklistData"
                :key="blacklist.id"
              >
                <input
                  type="checkbox"
                  :id="blacklist.id"
                  :value="blacklist.id"
                  v-model="checkedBlackLists"
                />
                <label :for="blacklist.id"> {{ blacklist.label }}</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Select at least one joke type:</td>
          <td>
            <div class="options__box">
              <div
                class="checkbox-container"
                v-for="jokeType in jokeTypeData"
                :key="jokeType.id"
              >
                <input
                  type="checkbox"
                  :id="jokeType.id"
                  :value="jokeType.id"
                  v-model="checkedJokeTypes"
                />
                <label :for="jokeType.id"> {{ jokeType.label }}</label>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
table > tr > td:nth-child(2) {
  padding-left: 2rem;
}

table > tr > td {
  padding-bottom: 1rem;
}

.options {
  width: 90%;
  padding: 0.5rem 1rem;
  margin-inline: auto;
  border: 2px solid white;
  border-radius: 10px;
}

.options__box {
  padding: 0.5rem 2rem;
  display: flex;
  gap: 1rem;
  border: 1px solid white;
  border-radius: 12px;
}

.checkbox-container {
  display: flex;
  gap: 0.25rem;
}

h2 {
  font-weight: bold;
}
</style>
