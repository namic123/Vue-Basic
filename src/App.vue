<template>
  <!-- container -->
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <hr />
    <!-- 자식 컴포넌트에서 데이터를 보내고 addTodo 메서드 실행-->
    <TodoSimpleForm @add-todo="addTodo" />
    <!-- 응답 error 출력   -->
    <div style="color:red">{{error}}}</div>
    <!-- todos가 비어 있는 경우 출력 -->
    <div v-if="!filteredTodos.length">확인된 todo가 없습니다.</div>
    <!-- todos 배열의 요소를 각각 출력 -->
    <!--부모 컴포넌트가 자식 컴포넌트에게 데이터를 보냄-->
    <TodoList
      :todos="filteredTodos"
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
import axios from "axios";

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
    const searchText = ref("");
    const error = ref("");

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
      // Database에 todo를 저장
      // id는 autoIncreament로 저장됨.
      error.value = '';
      axios.post('http://localhost:3000/todos',{
        subject:todo.subject,
        completed:todo.completed,
      }).then((res)=>{
        console.log(res);
        todos.value.push(res.data);
      }).catch((err)=>{
        console.log(err);
        error.value = 'Something went wrong.';
      });
    }
    // 검색 로직 메서드
    const filteredTodos = computed(() => {
      // searchText가 빈문자열이 아닐때
      if (searchText.value) {
        // todos 배열 요소를 각각 꺼내서 filtering
        return todos.value.filter((todo) => {
          // 배열의 요소가 searchText가 포함된 것만 리턴
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });
    return {
      todos,
      todoStyle,
      error,
      deleteTodo,
      addTodo,
      handleComplete,
      searchText,
      filteredTodos,
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
