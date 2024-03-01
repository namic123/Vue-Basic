import {computed} from 'vue';
import {useStore} from 'vuex';

export function useToast(){
  const store = useStore();
  const showToast = computed(()=> store.state.toast.showToast);
  const toastMessage = computed(()=>store.getters['toast/toastMessageWithSmile']);
  const toastAlertType = computed(()=>store.state.toast.toastAlertType);
  function triggerToast(message, type='success'){
    store.dispatch('toast/triggerToast', message, type);
  }


  return{
    toastMessage,
    toastAlertType,
    showToast,
    triggerToast,
  }
}