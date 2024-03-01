import {createStore} from 'vuex';
import {ref} from 'vue';

export default createStore({
  state:{
     showToast = false,
     toastMessage = '',
     toastAlertType = '',
     timeout = null,
  },
});