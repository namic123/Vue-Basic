<template>
  <div
    class="alert toast-box"
    :class="`alert-${type}`"
    role="alert"
  >
    {{message}}
  </div>
</template>
<script>
export default {
  props:{
    message: {
      type:String,
      require:true
    },
    type:{
      type:String,
      default:'success'
    }
  }
}
</script>
<style scoped>
  .toast-box{
    position:fixed;
    top:10px;
    right:10px;
  }
</style>