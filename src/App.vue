<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{name:'Home'}">JaySung</router-link>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name:'Todos'}">Todos</router-link>
        </li>
      </ul>
  </nav>
<!-- index.js에 정의한 url path 별 컴포넌트가 마운트됨. -->
  <div class='container'>
    <router-view/>
  </div>
</template>
<script>
export default {}
</script>
<style>
</style>
