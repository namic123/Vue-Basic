# Composition API
Composition API는 Vue3에 도입되어 기존 Option API가 가진 몇 가지 한계를 극복하고, Vue 컴포넌트의 로직과 기능을 구성하는 새로운 방식을 제공한다.

## [핵심 메서드]

### [setup 메서드]
* Composition API의 진입점이 되는 함수로써 컴포넌트가 생성될 때 가장 먼저 실행되며, setup 함수 내부에 컴포넌트의 반응형 상태,
계산된 속성, 메서드 등을 정의한다.

### [ref와 reactive 메서드]
* 데이터의 반응형을 관리한다. ref는 기본 타입(문자열, 정수 등)의 데이터를 반응형으로 만들고, reactive는 객체 또는 배열과 같은 참조 타입의 데이터를 반응형으로 만든다.
* 참고: ref와 reactive는 React의 state(상태)와 유사한 역할을 함. 

### [computed 메서드]
* 계산된 속성을 정의한다. 데이터가 변경될 때마다 자동으로 다시 계산된다.

### [watch와 watchEffect 메서드]
* 데이터의 변화를 감지하고, 변화가 있을 때마다 지정된 "콜백 함수"를 실행한다.

### template 안에 js 코드 가져오기, setup, ref, computed 예시 코드
```vue
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
```
