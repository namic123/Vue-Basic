<template>
  <h1>To-Do Page</h1>
  <div v-if='loading'>
    Loading...
  </div>
  <form v-else @submit.prevent='updateTodo'>
    <div class='row'>
      <div class='col-6'>
        <div class="form-group">
          <label>Subject</label>
          <input type='text' class='form-control' v-model='todo.subject'>
        </div>
      </div>
      <div class='col-6'>
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type='button'
              class='btn'
              :class='todo.completed ? "btn-success":"btn-danger"'
              @click="toggleTodoStatus"
            >
              {{todo.completed ? "Completed":"Incompleted"}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button type='submit' class='btn btn-primary' @click='updateTodo' :disabled='todoUpdated'>Save</button>
    <button class='btn btn-outline-dark ml-2' @click='moveToTodoListPage'>Cancle</button>
  </form>
  <Toast v-if='showToast' :message='toastMessage' :type='toastAlertType'/>
</template>
<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {computed, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from 'vue';
import _ from 'lodash'; // Lodash는 기본적으로 인포트 할때 언더스코어(_)를 사용
import Toast from '@/components/Toast.vue'
export default {
  components :{
    Toast
  },
  setup(){
    onBeforeMount(()=>{
      // DOM이 마운트 되기 전 실행할 로직
    });
    onMounted(()=>{
      // 마운트된 후 실행할 로직
    })
    onBeforeUpdate(()=>{
      // State(ref 등)가 업데이트 되기 전 실행 로직
    });
    onUpdated(()=>{
      // State(ref 등)가 업데이트 된 후 실행 로직
    })

    // 아래 Unmount메서드는 주로 해당 컴포넌트를 빠져나가기 전 불필요한 메모리를 정리하는 역할로 사용된다.
    onBeforeUnmount(()=>{
      // 해당 컴포넌트의 DOM에 빠지기 전(예: 페이지 이동) 실행
    })
    onUnmounted(()=>{
    // 해당 컴포넌트의 DOM에 빠진 후(예: 페이지 이동) 실행
    })
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastAlertType = ref('');
    const route = useRoute();
    const router = useRouter();
    // 현재 라우트 객체에 접근하고 싶을 때, useRoute를 사용하여 그 정보를 얻을 수 있다.
    // 라우트 파라미터 접근: URL의 동적 세그먼트 (예: /todos/:id)에 접근할 때 사용한다.
    // 쿼리 파라미터 접근:url의 쿼리 파라미터(예: /todos?id=1)에 접근할 떄 사용
    // 메타 필드 접근: 라우트에 정의된 메타 필드에 접근할 때 사용
    console.log(route.params.id);
    // id에 해당하는 db가져오기
    const getTodo = async () => {
      try{
      const res = await axios.get('http://localhost:3000/todos/'+ route.params.id);
      todo.value = {...res.data}; // 객체의 주소를 할당하는 것이 아닌 데이터 그 자체를 복사
      originalTodo.value = {...res.data};
      loading.value = false;
    }catch (error){
        triggerToast("오류가 발생했습니다!", "danger");
      }
    };

    // todo의 변경사항이 있는지 확인하는 메서드
    const todoUpdated = computed(()=>{
      // 기존 투두에 변경사항이 있는지 확인
      return _.isEqual(todo.value, originalTodo.value);  // lodash의 참조값이 아닌 값 자체 비교 메서드
    })

    getTodo();

    // Todo의 완료 상태 핸들 메서드
    async function toggleTodoStatus(){
      todo.value.completed = !todo.value.completed
      // await axios.patch('http://localhost:3000/todos/'+ route.params.id,{
      //   completed:!todo.value.completed,
      // })
    }

    // Todos페이지로 이동
    function moveToTodoListPage(){
      router.push({
          name:'Todos',
      });
    }

    function triggerToast(message, type='success'){
      toastMessage.value = message;
      toastAlertType.value = type;
      showToast.value = true;
      setTimeout(()=>{
        toastMessage.value = "";
        toastAlertType.value = "";
        showToast.value = false;
      },3000)
    }
    async function updateTodo(){
      try {
        const res = await axios.put(`http://localhost:3000/todos/${route.params.id}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });
        originalTodo.value = {...res.data};
        triggerToast("Todo가 성공적으로 업데이트 되었습니다!", "success");
      }catch(error){
        console.log(error);
        triggerToast("오류가 발생했습니다!", "danger");
      }
    }
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      updateTodo,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
    }
  }
}
</script>
<style>

</style>