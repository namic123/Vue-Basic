<template>
  <!-- @submit.prevent = event.preventDefault -->
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </div>
    <div v-show="hasError" style="color: red">빈 내용은 등록이 불가합니다.</div>
  </form>
</template>
<script>
export default {};
</script>

<style></style>
