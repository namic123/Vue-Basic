import {createStore} from 'vuex';
import modules from '@/store/modules';

export default createStore({
  modules:modules
  // modules 한 글자로 생략 가능
});