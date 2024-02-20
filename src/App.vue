<!--Vue 컴포넌트는 크게 3가지 요소로 구성 -->
<!--1. template이 있고, 이 안에는 html 코드가 구성-->
<!--2. script, js 코드가 들어간다. -->
<!--3. style, css 코드가 들어간다 -->
<template>
  <!-- 아래 script 코드의 변수 및 함수 호출 -->
  <div>
    <!-- ref -->
    <div class="name">{{ name }}</div>
    <div class="name">{{ object }}</div>
    <div class="name">{{ array[0] }}</div>
    <!-- reactive -->
    <div class="name">{{ name2 }}</div>
    <div class="name">{{ object2 }}</div>
    <div class="name">{{ array2[0] }}</div>
    <button class="btn btn-primary" v-on:click="updateName">Click</button>
  </div>
</template>
<script>
import {ref, reactive} from "vue";
/* Vue 3 : Composition API */
/* 이 API에서는 관련된 기능을 함께 묶어 "컴포지션 함수"로 만들고 이를 여러 컴포넌트에서 재사용 가능*/
/* setup 함수는 컴포지션 API의 진입점 역할, 컴포넌트의 설정을 담당하는 함수 */
export default {
  setup() {
    // ref
    let name = ref("Jay park(ref)");
    let object = ref({id: 1});
    let array = ref(["index1", "index2"]);
    // reactive
    let name2 = reactive("Jay Seung(reactive)");
    let object2 = reactive({id: 1});
    let array2 = reactive(["idx1", "idx2"]);

    function updateName() {
      // ref로 요소 접근 방법
      name.value = "changed to jay by ref!";
      object.value.id = 2;
      array.value[0];
      // reactive로 요소 접근 방법
      // name2 = "changed to jay2 by reactive!";  
      // -- > reactive에서는 객체나 배열같은 참조 타입에 대해서만 반응형으로 만들 수 있음
      object2.id = 2;
      array2[0] = array2[1];
    }
    // const greeting = (name) => {
    //   return "Hello" + name;
    // };
    return {
      name,
      object,
      array,
      name2,
      object2,
      array2,
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
