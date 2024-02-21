<template>
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
            :value="todoItem.completed"
            @change="handleTodoCompleted(todoIndex)"
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
</template>
<script>
// props 주의할 점, props는 단방향 바인딩 (부모 -> 자식)이므로,
// 자식 컴포넌트에서 부모 컴포넌트가 가진 데이터를 변경하면 안된다.
export default {
  // 부모 컴포넌트가 보낸 데이터 꺼내기
  // props: ['todos'], 이런 형식도 가능
  props : {
    // 부모 컴포넌트에게 받은 prop의 타입을 명시하여 일관성 보장
    todos:{
      type: Array,
      required:true
    }
  },
  setup(props, context){
    // todo 완료 여부
    function handleTodoCompleted(todoIndex) {
      context.emit('handle-todo-complete', todoIndex);
    }
    return {
      handleTodoCompleted,
    }
  }
}
</script>

<style scoped>

</style>