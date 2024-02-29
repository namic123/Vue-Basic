<template>
  <div
    v-for="(item, index) in items"
    :key="item.id"
    class="card mt-2"
  >
  <!-- 위에서 items 요소인 item을 slot을 통해 TodoList로 보내줌 -->
    <slot :item='item' :index='index'>

    </slot>
  </div>
</template>
<script>
export default {
  props:{
    items:{
      type:Array,
      required:true
    }
  }
}
</script>
<style scoped>

</style>