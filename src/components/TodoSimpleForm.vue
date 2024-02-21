<template>
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
    <div v-show="hasError" style="color: red">빈 내용은 등록이 불가합니다.</div>
  </form>
</template>
<script>
import {ref} from 'vue';
export default {
  // context : 자식 컴포넌트가 부모 컴포넌트에게 데이터를 보냄. (emit()메서드를 사용)
  setup(props, context){
    const todo = ref("");
    const hasError = ref(false);
    // todo 등록
    function onSubmit() {
      if (todo.value.length <= 0) {
        hasError.value = true;
      } else {
        // 부모 컴포넌트에 데이터를 보냄.
        context.emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = "";
      }
    }
    return{
    todo,
    hasError,
      onSubmit,
  }
  }
};
</script>

<style></style>
