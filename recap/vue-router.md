# Vue Router 작동 원리
SPA(Single Page Application)에서 사용자가 서로 다른 페이지를 탐색할 때, 
실제로 페이지를 새로 로드하지 않고도 주소가 변경되고 해당 주소에 맞는 컴포넌트를 동적으로 렌더링할 수 있게 해준다.
이를 통해 사용자에게 빠르고 부드로운 페이지 전환 경험을 제공할 수 있다.

## 특징
1. 동적 라우팅 : 애플리케이션의 라우트를 동적으로 추가하거나 수정할 수 있다.
2. 중첨된 라우트 : 하위 페이지 구조를 가진 복잡한 애플리케이션 구조를 쉽게 구현할 수 있다.
3. 모듈식 구성 : 라우트 관련 설정을 모듈로 나누어 관리할 수 있어 대규모 프로젝트에서 유리
4. 뷰 컴포넌트에 기반한 라우팅: URL 경로에 따라 렌더링할 Vue 컴포넌트를 지정한다.
5. 프로그래밍 방식 라우팅: 코드 내에서 라우터 객체의 메소드를 호출하여 라우팅을 제어할 수 있다.
6. 네비게이션 가드: 특정 경로로의 접근을 제어하거나 변경하기 전후에 특정 로직을 실행할 수 있다.

## 사용법
Vue Router를 사용하기 위해서는 'vue-router' 패키지를 설치해야 한다. 그 다음, Vue 애플리케이션에 라우터를 생성하고 라우터를 사용할 컴포넌트에 
'<router-view>'컴포넌트를 추가한다. '<router-view>'는 현재 경로에 매칭된 컴포넌트를 렌더링하는 영역이다.

라우터 인스턴스를 생성할 때는 각 라우트를 정의하는 객체 배열을 'routes'옵션에 전달한다. 각 라우트 객체는 'path'와 'component' 및 'name' 속성을 가질 수 있으며,
'path'는 URL 경로를 'component'는 해당 경로에서 렌더링될 Vue컴포넌트를 지정한다.

예시
```vue
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
      component: Home // 라우트할 컴포넌트
    },
    {
      // pages 폴더 안에, todos 폴더 안 index.vue를 라우트
      path: '/todos',
      name: 'Todos',
      component: Todos // 라우트할 컴포넌트
    },
  ]
});

// 1/ home, 2/todos, 3/todos/create, 4/todos/:id

export default router;

```