<template>
  <div>Todo Page</div>
</template>
<script>
import {useRoute} from 'vue-router';
export default {
  setup(){
    const route = useRoute();
    // 현재 라우트 객체에 접근하고 싶을 때, useRoute를 사용하여 그 정보를 얻을 수 있다.
    // 라우트 파라미터 접근: URL의 동적 세그먼트 (예: /todos/:id)에 접근할 때 사용한다.
    // 쿼리 파라미터 접근:url의 쿼리 파라미터(예: /todos?id=1)에 접근할 떄 사용
    // 메타 필드 접근: 라우트에 정의된 메타 필드에 접근할 때 사용
    console.log(route.params.id);
  }
}
</script>
<style>

</style>