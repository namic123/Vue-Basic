import {onUnmounted, ref} from 'vue';

export function useToast(){
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref('');
  const timeout = ref(null);
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