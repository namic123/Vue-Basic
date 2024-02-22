# Vue3 : computed 
Vue3에서 computed속성은 기본적으로 다른 반응형 상태(ref 등)에 기반한 값을 계산하는 데 사용된다.
computed 속성은 종속된 데이터에 기반하여 계산된 값을 캐싱하는 기능을 가지고 있어, 종속된 데이터가 변경될 때만 다시 계산된다.
반면, 일반 메서드는 템플릿에서 호출될 때마다 결과를 다시 계산하기 때문에 성능 최적화와 관련한 중요한 의미를 가진다.


## computed 속성의 주요 이점
* 캐싱: computed 속성은 종속 데이터가 변경될 때만 다시 계산되며, 변경되지 않았다면 이전에 계산된 값을 재사용(캐싱)한다. 
  * 이는 데이터가 변화가 없을 때 불필요한 계산을 방지하므로 성능을 향상시킨다.
* 반응성: computed 속성은 Vue의 반응형 시스템에 의해 자동 관리되기 때문에 의존 데이터가 변경되면 자동으로 업데이트된다.
  * 이는 앱의 데이터 흐름을 쉽게 추적하고 관리할 수 있다.
* 선언적 프로그래밍: computed 속성을 사용하면 복잡한 로직을 선언적으로 표현할 수 있다.
  * 즉, 어떤 값이 어떻게 계산되어야 하는지를 정의함으로써, 코드 가독성과 유지 보수성이 향상된다.

### 예시 코드
```vue
<template>
  <div>
    <input v-model="firstName" placeholder="First Name">
    <input v-model="lastName" placeholder="Last Name">
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const firstName = ref('');
    const lastName = ref('');

    // computed 속성을 사용하여 firstName과 lastName을 결합
    const fullName = computed(() => {
      return `${firstName.value} ${lastName.value}`.trim();
    });

    return {
      firstName,
      lastName,
      fullName
    };
  }
};
</script>

```
### 설명
* 위 코드에서 'firstName'과 'lastName'은 반응형 참조 ref를 사용하여 정의되어 있다.
* fullName은 computed 속성을 사용해서 계산되며, firstName과 lastName의 현재 값에 기반한다.
* 사용자가 입력 필드에 이름이나 성을 입력할 때마다, fullName은 자동으로 업데이트되어 새로운 전체 이름을 반영한다.
* 즉, 일반 메서드처럼 호출시에 재연산되는 것이 아니라 캐싱된 데이터에 자동으로 업데이트되어 있는 것.


### 정리
computed 속성은 종속 데이터에 기반하여 계산된 값을 캐싱하고, 이 종속 데이터가 변경될 때만 다시 계산된다는 점은 성능 최적화에 중요하다.
반면, 일반 메서드는 호출될 때마다 계산을 수행하기 때문에 같은 결과를 얻기 위해 불필요한 계산을 반복할 수 있다. 