<template>
  <h1>Create Todo</h1>
<!--editing 기본으로 false로 되어 있으므로 넘길 필요 없음.  -->
  <TodoForm/>
</template>
<script>
import TodoForm  from '@/components/TodoForm.vue';
export default {
  components :{
    TodoForm
  },
}
</script>
<style scoped>

</style>