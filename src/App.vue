<template>
  <!-- container -->
  <div class="container">
    <h2>To-Do List</h2>
<!-- 자식 컴포넌트에서 데이터를 보내고 addTodo 메서드 실행-->
    <TodoSimpleForm @add-todo="addTodo"/>
    <!-- todos가 비어 있는 경우 출력 -->
    <div v-if="!todos.length">작성된 todo가 없습니다. todo를 등록해주세요.</div>
    <!-- todos 배열의 요소를 각각 출력 -->
  <!--부모 컴포넌트가 자식 컴포넌트에게 데이터를 보냄-->
    <TodoList :todos="todos" @handle-todo-complete="handleComplete"/>
  </div>
</template>
<script>
import {ref} from "vue";
// 다른 컴포넌트 import
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  // 컴포넌트 등록
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    // field
    const todos = ref([]);
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    // method
    // todo 완료 여부
    function handleComplete(index) {
      todos.value[index].completed = !todos.value[index].completed;
    }
    function deleteTodo(idx) {
      // pop은 마지막 요소를 삭제
      // todos.value.pop();
      // splice(인덱스, 개수)
      todos.value.splice(idx, 1);
    }

    function addTodo(todo){
      todos.value.push(todo);
    }
    return {
      todos,
      todoStyle,
      deleteTodo,
      addTodo,
      handleComplete,
    };
  },
};
</script>
<style>
.todo {
  color:grey;
  text-decoration: line-through;
}
</style>
