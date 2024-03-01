import {computed} from 'vue';
import {useStore} from 'vuex';

export function useToast(){
  const store = useStore();
  const showToast = computed(()=> store.state.showToast);
  const toastMessage = computed(()=>store.getters.toastMessageWithSmile);
  const toastAlertType = computed(()=>store.state.toastAlertType);
  const timeout = computed(()=>store.state.timeout);
  function triggerToast(message, type='success'){
    // toastMessage.value = message;
    // toastAlertType.value = type;
    // showToast.value = true;
    // timeout.value = setTimeout(()=>{
    //   toastMessage.value = "";
    //   toastAlertType.value = "";
    //   showToast.value = false;
    // },3000);
    store.dispatch('triggerToast', message, type);
  }


  return{
    toastMessage,
    toastAlertType,
    showToast,
    triggerToast,
  }
}