<template>
  <!-- container -->
  <div>
    <div class='d-flex justify-content-between mb-3 mt-2'>
      <h2>To-Do List</h2>
      <button class='btn btn-primary' @click='moveToCreatePage'>
        Create Todo
      </button>
    </div>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter='searchTodo'
    />
    <hr />
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
      :triggerToast='triggerToast'
      @set-todos="setTodoList"
      @get-todos-error='setTodoError'
      ref='getTodoRef'
    />
  </div>
  <Toast v-if='showToast' :message='toastMessage' :type='toastAlertType'/>
</template>
<script>
import {ref} from 'vue';
// 다른 컴포넌트 import
import TodoList from "@/components/TodoList.vue";
import TodoPagination from "@/components/TodoPagination.vue";
import Toast from '@/components/Toast.vue';
import axios from '@/axios';
import {useToast} from '@/composables/toast';
import {useRouter} from 'vue-router';

export default {
  // 컴포넌트를 사용할 수 있도록 등록
  components: {
    TodoList,
    TodoPagination,
    Toast,
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

    const router = useRouter();

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    // todo 완료 여부
    async function handleComplete(index, checked) {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.patch("todos/" + id, {
          completed: checked,
        });
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        triggerToast("오류가 발생했습니다!", "danger");
        error.value = "Something went wrong.";
      }
    }

    async function deleteTodo(id) {
      error.value = "";
      try {
        await axios.delete("todos/" + id);

        if(getTodoRef.value){
          getTodoRef.value.getTodos(1);
        }
      } catch (err) {
        console.log(err);
        triggerToast("오류가 발생했습니다!", "danger");

        error.value = "Something went wrong.";
      }
    }

    // todo 입력 async(비동기 함수 선언)
    async function addTodo(todo) {
      error.value = "";
      try {
        // await 키워드가 선언되었으므로, axios요청이 끝날 때까지 다음 코드가 실행되지 않는다.
        await axios.post("todos", {
          subject: todo.subject,
          completed: todo.completed,
        });
        if(getTodoRef.value){
          getTodoRef.value.getTodos(1);
        }
      } catch (err) {
        // 아래 axios 코드와 동일하게 동작 try-catch
        console.log(err);
        triggerToast("오류가 발생했습니다!", "danger");

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

    function moveToCreatePage(){
      router.push({
        name:'TodoCreate',
      })
    }

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
      showToast,
      toastAlertType,
      toastMessage,
      triggerToast,
      moveToCreatePage,
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
