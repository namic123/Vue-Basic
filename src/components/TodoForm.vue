<!--Todo 생성페이지와 수정페이지에서 공통으로 사용할 컴포넌트 -->
<template>
  <div v-if='loading'>
    Loading...
  </div>
  <form v-else @submit.prevent='saveTodo'>
    <div class='row'>
      <div class='col-6'>
        <div class="form-group">
          <label>Subject</label>
          <input type='text' class='form-control' v-model='todo.subject'>
          <div v-if='subjectError' style='color:red'>
            {{subjectError}}
          </div>
        </div>
      </div>
      <div class='col-6' v-if='editing'>
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
      <div class='col-12'>
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class='form-control' cols='30' rows='10'>

          </textarea>
        </div>
      </div>
    </div>
    <button type='submit' class='btn btn-primary mt-2' @click='saveTodo' :disabled='todoUpdated'>{{editing?"Update":"Create"}}</button>
    <button class='btn btn-outline-dark ml-2 mt-2' @click='moveToTodoListPage'>Cancle</button>
  </form>
  <transition name="fade">
    <Toast v-if='showToast' :message='toastMessage' :type='toastAlertType'/>
  </transition>
</template>
<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {computed, ref} from 'vue';
import _ from 'lodash'; // Lodash는 기본적으로 인포트 할때 언더스코어(_)를 사용
import Toast from '@/components/Toast.vue'
import {useToast} from '@/composables/toast';

export default {
  components :{
    Toast
  },
  // Todo 생성페이지에서는 todo의 정보를 불러올 필요가 없기 때문에, 생성과 수정 구분을 위한 props.
  props:{
    editing:{
      type:Boolean,
      default:false,
    }
  },
  setup(props){
    const todo = ref({
      subject: "",
      completed:false,
      body:'',
    });
    const originalTodo = ref(null);
    const loading = ref(false);
    const subjectError = ref("");
    const route = useRoute();
    const router = useRouter();

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    // 현재 라우트 객체에 접근하고 싶을 때, useRoute를 사용하여 그 정보를 얻을 수 있다.
    // 라우트 파라미터 접근: URL의 동적 세그먼트 (예: /todos/:id)에 접근할 때 사용한다.
    // 쿼리 파라미터 접근:url의 쿼리 파라미터(예: /todos?id=1)에 접근할 떄 사용
    // 메타 필드 접근: 라우트에 정의된 메타 필드에 접근할 때 사용
    console.log(route.params.id);
    // id에 해당하는 db가져오기
    const getTodo = async () => {
      loading.value = true;
      try{
        const res = await axios.get('http://localhost:3000/todos/'+ route.params.id);
        todo.value = {...res.data}; // 객체의 주소를 할당하는 것이 아닌 데이터 그 자체를 복사
        originalTodo.value = {...res.data};
        loading.value = false;
      }catch (error){
        loading.value = false;
        triggerToast("오류가 발생했습니다!", "danger");
      }
    };

    // todo의 변경사항이 있는지 확인하는 메서드
    const todoUpdated = computed(()=>{
      // 기존 투두에 변경사항이 있는지 확인
      return _.isEqual(todo.value, originalTodo.value);  // lodash의 참조값이 아닌 값 자체 비교 메서드
    })

    // editing 페이지인 경우에만 todo의 정보를 가져온다.
    if(props.editing){
      getTodo();
    }

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

    // Todo 생성 및 수정 페이지 상태 저장
    async function saveTodo(){
      subjectError.value = "";
     // Subject가 비어있는 경우, break 시킴
      if(!todo.value.subject){
        subjectError.value = 'Subject는 필수 입력입니다.'
        return
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body:todo.value.body
        }
        // 페이지 별 요청
        // 수정 페이지인 경우
        if(props.editing) {
            res = await axios.put(`http://localhost:3000/todos/${route.params.id}`, data);
            originalTodo.value = {...res.data};
        }
        // 생성 페이지인 경우
        else {
            res = await axios.post(`http://localhost:3000/todos`, data);
            // 새로운 todo 작성할 수 있도록 초기화
            todo.value.subject = "";
            todo.value.body = "";
        }
        // 페이지 별 토스트 메세지
        const message = 'Todo가 성공적으로' + props.editing ? "업데이트 되었습니다!":"추가 되었습니다!";
        triggerToast(message, "success");
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
      saveTodo,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
      subjectError,
    }
  }
}
</script>
// scoped 키워드는 현재 컴포넌트에만 영역을 제한하는 키워드
// scoped가 없는 경우, 해당 컴포넌트 뿐만 아니라 모든 컴포넌트에서 아래 .text-red의 스타일을 사용할 수 있다.
<style>
  .text-red{
    color:red;
  }
.fade-enter-active, .fade-leave-active{
  transition:all 0.5s ease;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
  transform:translateY(-30px);
}
.fade-enter-to, .fade-leave-from{
  opacity: 1;
  transform:translateY(0px);
}
</style>
