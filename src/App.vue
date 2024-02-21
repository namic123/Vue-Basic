<template>
  <!-- 조건문 작성 v-show vs v-if  -->
  <!-- 공식문서 기준 v-if는 toggle시 비용이 많이 발생하고 v-show는 초기 렌더링에 비용이 많이든다. -->
  <div v-show="toggle">v-show = true</div>
  <div v-show="!toggle">v-show = false</div>
  <div v-if="toggle">v-if = true</div>
  <div v-else>v-else = false</div>
  <button @click="onToggle">Toggle</button>
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
    const toggle = ref(false);
    const todo = ref("");
    const todos = ref([]);
    const hasError = ref(false);

    // method
    function onToggle() {
      toggle.value = !toggle.value;
    }
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
      toggle,
      hasError,
      handleTodoCompleted,
      onToggle,
      onSubmit,
    };
  },
};
</script>
<style></style>
