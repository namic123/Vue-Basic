<template>
  <div class="form-group">
    <label>{{label}}</label>
    <input
      :value='subject'
      @input='onInput'
      type='text'
      class='form-control'
    >
    <div v-if='error' class='text-red'>
      {{subjectError}}
    </div>
  </div>
</template>
<script >
export default {
  props: {
    label:{
      type:String,
      required:true,
    },
    error:{
      type:String,
      required:true,
    },
    subject:{
      type:String,
      required:true,
    },
  },
  setup (props,{emit}) {
    // Subject의 업데이트 값을 부모 컴포넌트에서 요청할 수 있게 emit
    const onInput = (e) =>{
      emit('update-subject', e.target.value);
    }
    return{
      onInput,
    }
  }
}
</script>
<style scoped>
.text-red{
  color:red;
}
</style>