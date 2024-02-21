<template>
<!-- 조건문 작성 v-show vs v-if  -->
<!-- 공식문서 기준 v-if는 toggle시 비용이 많이 발생하고 v-show는 초기 렌더링에 비용이 많이든다. -->
  <div v-show="toggle">v-show = true</div>
  <div v-show="!toggle">v-show = false</div>
  <div v-if="toggle">v-if = true</div>
  <div v-else>v-else = false</div>
  <div></div>
  <button @click="onToggle">Toggle</button>
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
    const toggle = ref(false);
    const todo = ref("");
    const todos = ref([
      {id: 1, subject: "휴대폰 사기"},

      {id: 2, subject: "장보기"},
    ]);
    function onToggle() {
      toggle.value = !toggle.value;
    }
    function onSubmit() {
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    }

    return {
      todo,
      todos,
      toggle,
      onToggle,
      onSubmit,
    };
  },
};
</script>
<style></style>
