<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">JaySung</a>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/todos">Todos</a>
        </li>
      </ul>
  </nav>
<!-- index.js에 정의한 url path 별 컴포넌트가 마운트됨. -->
  <router-view/>
</template>
<script>
export default {}
</script>
<style>
</style>
