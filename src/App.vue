<template>
  <div class="container">
    <h2>To-Do List</h2>
    <!-- @submit.prevent = event.preventDefault -->
    <form @submit.prevent="onSubmit" class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </form>
    <div v-for="todoItem in todos" :key="todoItem.id" class="card mt-2">
      <div class="card-body p-2">
        {{ todoItem.subject }}
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from "vue";

export default {
  setup() {
    const todo = ref("");
    const todos = ref([
      {id: 1, subject: "휴대폰 사기"},

      {id: 2, subject: "장보기"},
    ]);
    function onSubmit() {
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    }

    return {
      todo,
      todos,
      onSubmit,
    };
  },
};
</script>
<style></style>
