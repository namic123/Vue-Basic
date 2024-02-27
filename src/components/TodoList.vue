<template>
  <div
    v-for="(todoItem, todoIndex) in todos"
    :key="todoItem.id"
    class="card mt-2"
  >
    <div
      class="card-body p-2 d-flex align-items-center"
      @click='moveToPage(todoItem.id)'
    >
      <div class="form-check flex-grow-1">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="todoItem.completed"
          @change="handleTodoCompleted(todoIndex)"
        />
        <!-- 해당 todo가 completed true일때만 스타일 적용 -->
        <label class="form-check-label" :class="{todo: todoItem.completed}"
          >{{ todoItem.subject }}
        </label>
      </div>
      <div>
        <button
          class="btn btn-danger btn-sm"
          @click="handleTodoDelete(todoIndex)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter} from 'vue-router';
// props 주의할 점, props는 단방향 바인딩 (부모 -> 자식)이므로,
// 자식 컴포넌트에서 부모 컴포넌트가 가진 데이터를 변경하면 안된다.
export default {
  // 부모 컴포넌트가 보낸 데이터 꺼내기
  // props: ['todos'], 이런 형식도 가능
  props: {
    // 부모 컴포넌트에게 받은 prop의 타입을 명시하여 일관성 보장
    todos: {
      type: Array,
      required: true,
    },
  },
  // Vue3의 emits 변경 사항, 위 props 처럼 배열안에 이벤트를 넣어준다.
  // 장점 : context.emit의 중복을 피함, emit하는 이벤트를 한 눈에 볼 수 있으므로, 가독성 증가.
  emits: ["handle-todo-complete", "delete-todo"],
  setup(props, {emit}) {
    const router = useRouter();
    // todo 완료 여부
    function handleTodoCompleted(todoIndex) {
      emit("handle-todo-complete", todoIndex);
    }
    function handleTodoDelete(todoIndex) {
      emit("handle-todo-delete", todoIndex);
    }
    const moveToPage = (todoId) => {
      console.log(todoId);
      // push한 url로 이동시킴
      // react의 useNavigate와 같은 역할
      // router.push('/todos/' + todoId); 아래 코드와 같은 역할
      // 아래 코드가 명시적이므로, 가독성이나 유지보수에 좋음
      router.push({
        name:'Todo',
        params:{
          id: todoId
        }
      });
    }
    return {
      handleTodoCompleted,
      handleTodoDelete,
      moveToPage
    };

  },
};
</script>

<style scoped></style>
