export default {

  namespaced:true,
    state: {
  toastMessage: '',
    toastAlertType: '',
    showToast: false,
},
  mutations:{
    UPDATE_TOAST_MESSAGE(state, payload){
      state.toastMessage = payload;
    },
    UPDATE_TOAST_ALERT_TYPE(state, payload){
      state.toastAlertType = payload;
    },
    UPDATE_TOAST_STATUS(state, payload){
      state.showToast = payload;
    },

  },
  actions:{
    triggerToast(context, message, type='success'){
      // toastMessage.value = message;
      context.commit('UPDATE_TOAST_MESSAGE',message);
      // toastAlertType.value = type;
      context.commit('UPDATE_TOAST_ALERT_TYPE',type);
      // showToast.value = true;
      context.commit('UPDATE_TOAST_STATUS',true);

      // 컴포넌트에서 빠져나갈 때 timeout을 clear 할필요가 없어짐
      setTimeout(()=>{
        // toastMessage.value = "";
        context.commit('UPDATE_TOAST_MESSAGE','');  // 메시지 초기화
        // toastAlertType.value = "";
        context.commit('UPDATE_TOAST_ALERT_TYPE',''); // 유형 초기화
        // showToast.value = false;
        context.commit('UPDATE_TOAST_STATUS',false);
      },3000);


    }
  },
  getters:{
    toastMessageWithSmile(state){
      return state.toastMessage + '^_^';
    }
  },

}