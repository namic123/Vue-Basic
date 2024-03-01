import {computed, onUnmounted} from 'vue';
import {useStore} from 'vuex';

export function useToast(){
  const store = useStore();
  const showToast = computed(()=> store.state.showToast);
  const toastMessage = computed(()=>store.state.toastMessage);
  const toastAlertType = computed(()=>store.state.toastAlertType);
  const timeout = computed(()=>store.state.timeout);
  function triggerToast(message, type='success'){
    toastMessage.value = message;
    toastAlertType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(()=>{
      toastMessage.value = "";
      toastAlertType.value = "";
      showToast.value = false;
    },3000);
  }

  // 컴포넌트에 빠졌을 때 메모리를 정리하기 위해서 불필요한 triggerToast실행을 멈춤
  onUnmounted(()=>{
    // 해당 컴포넌트의 DOM에 빠진 후(예: 페이지 이동) 실행
    clearTimeout(timeout.value); // setTimeout이 멈춤
  })
  return{
    toastMessage,
    toastAlertType,
    showToast,
    triggerToast,
  }
}