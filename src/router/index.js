import { createRouter,createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from  '../pages/todos/index.vue';
import Todo from  '../pages/todos/_id.vue';
import TodoCreate from  '../pages/todos/create/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 아래 각각의 하나의 객체가 라우터
    {
      // pages 폴더 안에 index.vue를 라우트
      path: '/',
      name: 'Home',
      component: Home // 라우트할 컴포넌트
    },
    {
      // pages 폴더 안에, todos 폴더 안 index.vue를 라우트
      path: '/todos',
      name: 'Todos',
      component: Todos // 라우트할 컴포넌트
    },

    {
      // 주의할점!! 아래 /todos/:id 가 create보다 먼저 올 경우 동적 세그먼트(:id)는 어떤 것도 올 수 있기 때문에 의도대로 동작되지 않을 수 있으므로,
      // create를 수정 페이지보다 먼저 정의할 것.
      // Vue3에서는 위 사항이 해결됐으나, 주의할 것.
      // TO-DO 생성 페이지
      path: '/todos/create',
      name: 'TodoCreate', // 컴포넌트의 고유명
      component: TodoCreate // 라우트할 컴포넌트
    },
    {
      // TO-DO 수정페이지
      path: '/todos/:id',
      name: 'Todo', // 컴포넌트의 고유명
      component: Todo // 라우트할 컴포넌트
    },
  ]
});

// 1/ home, 2/todos, 3/todos/create, 4/todos/:id

export default router;
