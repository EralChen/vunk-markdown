<template>
  <ul>
    <li v-for="(item, index) in todoItems" :key="index">
      {{ item.text }}
    </li>
    <li>
      <form @submit.prevent="submitNewTodo()">
        <input v-model="newTodo" type="text" />

        <button type="submit">Add to-do</button>
      </form>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import { ref } from "vue";

const { todoItemsInitial } = useData<Data>();
const todoItems = ref<{ text: string }[]>(todoItemsInitial);
const newTodo = ref("");

const submitNewTodo = async () => {
  const text = newTodo.value;
  todoItems.value.push({ text });
  newTodo.value = "";
};
</script>
