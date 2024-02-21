<!--Vue 컴포넌트는 크게 3가지 요소로 구성 -->
<!--1. template이 있고, 이 안에는 html 코드가 구성-->
<!--2. script, js 코드가 들어간다. -->
<!--3. style, css 코드가 들어간다 -->
<template>
  <!-- 아래 script 코드의 변수 및 함수 호출 -->
  <div>
    <div class="name">{{ name }}</div>
    <!-- 데이터 바인딩(데이터 간 연결) 예시 -->
    <!-- 모든 태그의 속성(attribute)에 데이터 바인딩이 가능 -->
    <input v-bind:type="type" v-bind:value="name" />
    <button class="btn btn-primary" v-on:click="updateName">Click</button>
  </div>
</template>
<script>
import {ref} from "vue";

export default {
  setup() {
    // ref
    let name = ref("Jay park(ref)");
    let type = ref("text");

    function updateName() {
      name.value = "changed to jay by ref!";
      type.value = "number";
    }
    return {
      name,
      type,
      updateName,
    };
  },
};
</script>
<style>
.name {
  color: red;
}
.greeting {
  color: blue;
}
</style>
