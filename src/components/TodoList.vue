<template>
  <div
    v-for="(todoItem, todoIndex) in todos"
    :key="todoItem.id"
    class="card mt-2"
  >
    <div
      class="card-body p-2 d-flex align-items-center"
      style='cursor:pointer'
      @click='moveToPage(todoItem.id)'
    >
      <div class="flex-grow-1">
        <input
          class='ml-2 mr-2'
          type="checkbox"
          :checked="todoItem.completed"
          @click.stop="handleTodoCompleted(todoIndex, $event)"
        />
        <!-- 해당 todo가 completed true일때만 스타일 적용 -->
        <span :class="{todo: todoItem.completed}"
          >{{ todoItem.subject }}
        </span>
      </div>
      <div>
        <button
          class="btn btn-danger btn-sm"
          @click.stop="openModal(todoItem.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
<!-- Vue3의 새로운 기능 Teleport
 teleport는 컴포넌트를 현재 위치에서 다른 위치로 이동시킬 때 사용,
 이 기능은 모달, 알림 또는 어떤 팝업을 화면의 다른 부분으로 이동시키고자 할 때 유용
 이는 DOM 구조상 부모- 자식 관계에 구속되지 않고 더 높은 z-index레벨을 가진 요소들 위에
 렌더링 되어야 하는 UI 요소들을 쉽게 관리할 수 있게 해준다.

 Teleport 컴포넌트는 to 속성을 사용해서 컨텐츠를 이동시킬 대상 위치를 지정한다.
 이 속성에는 css 선택자 또는 실제 DOM 객체가 올 수 있다.
 -->
  <teleport to='#modal'>
    <Modal
      v-if="showModal"
      @close="closeModal"
      @delete='handleTodoDelete'
    />
  </teleport>
</template>
<script>
import { useRouter} from 'vue-router';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';
// props 주의할 점, props는 단방향 바인딩 (부모 -> 자식)이므로,
// 자식 컴포넌트에서 부모 컴포넌트가 가진 데이터를 변경하면 안된다.
export default {
  components: {
    Modal
  },
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
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    const router = useRouter();
    // todo 완료 여부
    function handleTodoCompleted(todoIndex, event) {
      emit("handle-todo-complete", todoIndex, event.target.checked);
    }
    function handleTodoDelete() {
      emit("handle-todo-delete", todoDeleteId.value);

      // delete 후 modal 사라지고, id 초기화
      showModal.value = false;
      todoDeleteId.value = null;
    }
    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };
    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };
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
      moveToPage,
      showModal,
      openModal,
      closeModal,
    };

  },
};
</script>

<style></style>
