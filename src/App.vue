<template>
  <div>
    <!-- <input :type="type" :value="name" @input="updateName" /> -->
    <!-- v-model 지시어를 사용하면 위와 같은 기능을 동일하게 동작할 수 있음 -->
    <input type="text" v-model="name"/> 
    <button class="btn btn-primary" @click="onSubmit">Click</button>
  </div>
</template>
<script>
import {ref} from "vue";

export default {
  setup() {
    // ref
    let name = ref("Jay park(ref)");
    function onSubmit() {
      console.log(name.value);
    }
    function updateName(event) {
      name.value = event.target.value;
    }
    return {
      name,
      onSubmit,
      updateName,
    };
  },
};
</script>
<style>
.name {
  color: red;
}
.changeName {
  color: green;
}
.greeting {
  color: blue;
}
</style>
