<template>
  <router-view/>
  <!-- container -->
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter='searchTodo'
    />
    <hr />
    <!-- 자식 컴포넌트에서 데이터를 보내고 addTodo 메서드 실행-->
    <TodoSimpleForm @add-todo="addTodo" />
    <!-- 응답 error 출력   -->
    <div style="color: red">{{ error }}</div>
    <!-- todos가 비어 있는 경우 출력 -->
    <div v-if="!todos.length">확인된 todo가 없습니다.</div>
    <!-- todos 배열의 요소를 각각 출력 -->
    <!--부모 컴포넌트가 자식 컴포넌트에게 데이터를 보냄-->
    <TodoList
      :todos="todos"
      @handle-todo-complete="handleComplete"
      @handle-todo-delete="deleteTodo"
    />
    <hr />
    <!-- 페이지네이션 -->
    <TodoPagination
      :searchText='searchText'
      @set-todos="setTodoList"
      @get-todos-error='setTodoError'
      ref='getTodoRef'
    />
  </div>
</template>
<script>
import {ref} from 'vue';
// 다른 컴포넌트 import
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import TodoPagination from "@/components/TodoPagination.vue"
import axios from "axios";

export default {
  // 컴포넌트 등록
  components: {
    TodoSimpleForm,
    TodoList,
    TodoPagination,
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
    const getTodoRef = ref(null);
    // method
    // todo 완료 여부
    async function handleComplete(index, checked) {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: checked,
        });
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    }

    async function deleteTodo(index) {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.delete("http://localhost:3000/todos/" + id);

        if(getTodoRef.value){
          getTodoRef.value.getTodos(1);
        }
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    }

    // todo 입력 async(비동기 함수 선언)
    async function addTodo(todo) {
      error.value = "";
      try {
        // await 키워드가 선언되었으므로, axios요청이 끝날 때까지 다음 코드가 실행되지 않는다.
        await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });
        if(getTodoRef.value){
          getTodoRef.value.getTodos(1);
        }
      } catch (err) {
        // 아래 axios 코드와 동일하게 동작 try-catch
        console.log(err);
        error.value = "Something went wrong.";
      }
    }

    // 검색 input에 값 입력 후 엔터 시 getTodos 실행
    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodoRef.value.getTodos(1);
    }
    // Todo 가져오기 (페이지네이션)
    function setTodoList(data){
      todos.value = data;
    }
    function setTodoError(data){
      error.value = data;
    }

    // // 검색 로직 메서드
    // const filteredTodos = computed(() => {
    //   // searchText가 빈문자열이 아닐때
    //   if (searchText.value) {
    //     // todos 배열 요소를 각각 꺼내서 filtering
    //     return todos.value.filter((todo) => {
    //       // 배열의 요소가 searchText가 포함된 것만 리턴
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   return todos.value;
    // });
    return {
      todos,
      todoStyle,
      error,
      deleteTodo,
      addTodo,
      handleComplete,
      searchText,
      // filteredTodos,
      setTodoList,
      setTodoError,
      getTodoRef,
      searchTodo,
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
