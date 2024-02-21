<template>
  <div>
    <input :type="type" :value="name" @input="updateName" />
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
