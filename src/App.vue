<template>
  <div class="container">
    <h2>To-Do List</h2>
    <!-- @submit.prevent = event.preventDefault -->
    <form @submit.prevent="onSubmit" class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input class="form-control" type="text" v-model="todo" placeholder="Type new to-do"/>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </form>
    {{todos}}
  </div>
</template>
<script>
import {ref} from "vue";

export default {
  setup() {
    const todo = ref("");
    const todos = ref([]);
    function onSubmit() {
      todos.value.push({
        id:Date.now(),
        subject:todo.value,
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
<style>

</style>
