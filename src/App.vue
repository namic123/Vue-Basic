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
    <!-- 페이지네이션 -->
    <TodoPagination
      @get-todos="setTodoList"
      @get-todos-error='getTodoError'
    />
  </div>
</template>
<script>
import {ref, computed, watch} from 'vue';
// 다른 컴포넌트 import
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
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
    const a = ref(1);

    // 명시적으로 감시할 특정 소스를 지정해야함.(reactive state(반응형 참조), 반응형 객체의속성 등)
    // 소스의 이전 값과 현재 값을 콜백 함수로 받을 수 있으며, 주로 특정 데이터의 변경을 정확하게 감시하고자 할 때 사용.
    // watchEffect와의 차이점
    // 1. watch는 명시적으로 감시할 대상 지정, watchEffect는 콜백 함수 내에서 접근한 모든 반응형 상태를 자동 감지
    // 2. watch는 보다 세밀한 제어 옵션(예: 이전 값과 현재 값의 비교, 지연 실행 등)을 제공,
    // 반면, watchEffect는 사용의 편의성을 제공하지만 그만큼 제어 옵션이 제한적
    // 3. watchEffect는 정의되자마자 즉시 실행되며, 의존성이 변경될 때마다 재실행, watch는 감시 대상의 변경 시에만 콜백 함수가 실행
    watch(a,(a, prev)=>{
      // 1번 인자에는 현재 상태, 2번 인자에는 이전 상태
      console.log(a, prev); // 2, 1 출력
    })

    a.value = 2;

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
    // Todo 가져오기 (페이지네이션)
    function setTodoList(data){
      todos.value = data;
    }
    function setTodoError(data){
      error.value = data;
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
      setTodoList,
      setTodoError,
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
