<template>
  <!-- container -->
  <div class="container">
    <h4>count: {{ count }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count:{{ doubleCountMethod() }}</h4>
    <button @click="count++">Add One</button>
    <h2>To-Do List</h2>
    <!-- 자식 컴포넌트에서 데이터를 보내고 addTodo 메서드 실행-->
    <TodoSimpleForm @add-todo="addTodo" />
    <!-- todos가 비어 있는 경우 출력 -->
    <div v-if="!todos.length">작성된 todo가 없습니다. todo를 등록해주세요.</div>
    <!-- todos 배열의 요소를 각각 출력 -->
    <!--부모 컴포넌트가 자식 컴포넌트에게 데이터를 보냄-->
    <TodoList
      :todos="todos"
      @handle-todo-complete="handleComplete"
      @handle-todo-delete="deleteTodo"
    />
  </div>
</template>
<script>
import {ref, computed} from "vue";
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
    function deleteTodo(index) {
      // pop은 마지막 요소를 삭제
      // todos.value.pop();
      // splice(인덱스, 개수)
      todos.value.splice(index, 1);
    }

    function addTodo(todo) {
      todos.value.push(todo);
    }

    const count = ref(1);

    // computed
    const doubleCountComputed = computed(() => {
      return count.value * 2;
    });
    // 일반 method
    const doubleCountMethod = () => {
      return count.value * 2;
    };

    // computed와 일반 method의 차이는 캐싱과 반응성에 차이가 있음.
    // 메서드는 호출될 때마다 계산을 수행하지만, computed 속성은 의존하는 데이터가 '변경되었을 때만 계산을 수행'하고 그 결과를 캐싱함.
    // 또한, computed는 자동으로 반응형 시스템에 등록되어 의존성을 추적한다.

    return {
      todos,
      todoStyle,
      deleteTodo,
      addTodo,
      handleComplete,
      count,
      doubleCountComputed,
      doubleCountMethod,
    };
  },
};
</script>
<style>
.todo {
  color: grey;
  text-decoration: line-through;
}
</style>
