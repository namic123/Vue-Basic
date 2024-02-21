<template>
  <!-- container -->
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm />
    <!-- todos가 비어 있는 경우 출력 -->
    <div v-if="!todos.length">작성된 todo가 없습니다. todo를 등록해주세요.</div>
    <!-- todos 배열의 요소를 각각 출력 -->
    <div
      v-for="(todoItem, todoIndex) in todos"
      :key="todoItem.id"
      class="card mt-2"
    >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todoItem.completed"
            @click="handleTodoCompleted(todoItem.id)"
          />
          <!-- 해당 todo가 completed true일때만 스타일 적용 -->
          <label class="form-check-label" :class="{todo: todoItem.completed}"
            >{{ todoItem.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(todoIndex)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from "vue";
// 다른 컴포넌트 import
import TodoSimpleForm from "./components/TodoSimpleForm.vue";

export default {
  // 컴포넌트 등록
  components: {
    TodoSimpleForm,
  },
  setup() {
    // field
    const todo = ref("");
    const todos = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    // method
    // todo 완료 여부
    function handleTodoCompleted(todoItem) {
      todos.value.forEach((item) => {
        if (item.id === todoItem) {
          item.completed = !item.completed;
          console.log(item);
        }
      });
    }
    function deleteTodo(idx) {
      // pop은 마지막 요소를 삭제
      // todos.value.pop();
      // splice(인덱스, 개수)
      todos.value.splice(idx, 1);
    }
    // todo 등록
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
      todoStyle,
      deleteTodo,
      handleTodoCompleted,
      onSubmit,
    };
  },
};
</script>
<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
