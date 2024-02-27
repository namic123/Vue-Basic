import { createRouter,createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from  '../pages/todos/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 아래 각각의 하나의 객체가 라우터
    {
      // pages 폴더 안에 index.vue를 라우트
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      // pages 폴더 안에, todos 폴더 안 index.vue를 라우트
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
  ]
});

// 1/ home, 2/todos, 3/todos/create, 4/todos/:id

export default router;
