<!--Vue 컴포넌트는 크게 3가지 요소로 구성 -->
<!--1. template이 있고, 이 안에는 html 코드가 구성-->
<!--2. script, js 코드가 들어간다. -->
<!--3. style, css 코드가 들어간다 -->
<template>
  <!-- 아래 script 코드의 변수를 호출 -->
  <div>
    <div class="name">{{ name }}</div>
    <div>Hi</div>
  </div>
</template>
<script>
/* Vue 3 : Composition API */
/* 이 API에서는 관련된 기능을 함께 묶어 "컴포지션 함수"로 만들고 이를 여러 컴포넌트에서 재사용 가능*/
/* setup 함수는 컴포지션 API의 진입점 역할, 컴포넌트의 설정을 담당하는 함수 */
export default {
  setup() {
    const name = "jay park";

    return {
      name,
    };
  },
};
</script>
<style>
.name {
  color: red;
}
</style>
