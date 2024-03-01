import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from '@/store';

// index.html에 id=app을 가진 div태그에 마운트
// react #root와 유사
// 즉, index.html #app id를 가진 div에 App.vue 컴포넌트가 마운트
createApp(App).use(store).use(router).mount('#app')
