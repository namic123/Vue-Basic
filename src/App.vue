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
    <div style="color: red">{{ error }}</div>
    <!-- todos가 비어 있는 경우 출력 -->
    <div v-if="!filteredTodos.length">확인된 todo가 없습니다.</div>
    <!-- todos 배열의 요소를 각각 출력 -->
    <!--부모 컴포넌트가 자식 컴포넌트에게 데이터를 보냄-->
    <TodoList
      :todos="filteredTodos"
      @handle-todo-complete="handleComplete"
      @handle-todo-delete="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
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
    // 페이지네이션
    const totalPage = ref(0);
    const limit = 5;
    const page = ref(1);


    // method
    // todo 완료 여부
    async function handleComplete(index) {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: !todos.value[index].completed,
        });
        todos.value[index].completed = !todos.value[index].completed;
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

        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    }
    // db에서 todos 데이터 가져오기
    const getTodos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_page=${page.value}&_limit=${limit}`
        );
        // res.headers["x-total-count"] : 데이터의 총 개수. 즉, todos의 개수
        // 버전 문제가 있을 수 있음 : npm install -g json-server@0.17.0
        totalPage.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    };
    getTodos();
    // todo 입력 async(비동기 함수 선언)
    async function addTodo(todo) {
      error.value = "";
      try {
        // await 키워드가 선언되었으므로, axios요청이 끝날 때까지 다음 코드가 실행되지 않는다.
        const res = await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });
        // 위 axios 요청에 await이 선언되었으므로, 요청 끝나고 todos에 push가 실행됨
        todos.value.push(res.data);
      } catch (err) {
        // 아래 axios 코드와 동일하게 동작 try-catch
        console.log(err);
        error.value = "Something went wrong.";
      }
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
