<template>
  <!-- container -->
  <div class="container">
    <h2>To-Do List</h2>
    <!-- @submit.prevent = event.preventDefault -->
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
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
      </div>
      <div v-show="hasError" style="color: red">
        빈 내용은 등록이 불가합니다.
      </div>
    </form>
    <!-- todos 배열의 요소를 각각 출력 -->
    <div v-for="todoItem in todos" :key="todoItem.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todoItem.completed"
            @click="handleTodoCompleted(todoItem.id)"
          />
          <label class="form-check-label">{{ todoItem.subject }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from "vue";

export default {
  setup() {
    // field
    const todo = ref("");
    const todos = ref([]);
    const hasError = ref(false);

    // method
    function handleTodoCompleted(todoItem) {
      todos.value.forEach((item) => {
        if (item.id === todoItem) {
          item.completed = !item.completed;
          console.log(item);
        }
      });
    }
    function onSubmit() {
      if (todo.value.length <= 0) {
        hasError.value = true;
      } else {
        hasError.value = false;
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        todo.value = "";
      }
    }

    return {
      todo,
      todos,
      hasError,
      handleTodoCompleted,
      onSubmit,
    };
  },
};
</script>
<style></style>
