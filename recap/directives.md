# 데이터 바인딩
Vue3에서 데이터 바인딩은 애플리케이션의 데이터와 UI요소를 연결하는 메커니즘이다. 
데이터 바인딩을 통해, 데이터의 상태가 변경될 때 자동으로 UI가 업데이트되어, 
반응형 애플리케이션을 지원한다. 

## 선언적 렌더링
### 인터폴레이션
가장 기본적인 데이터 바인딩 방식으로, "{{}}" 더블 머스태시를 사용하여 텍스트 콘텐츠에 데이터를 바인딩한다.
```html
<div>{{someData}}}</div>
```
* 위 'someData'는 Vue 인스턴스의 데이터 속성이다.

## 속성 바인딩과 이벤트 바인딩 
### 지시어(Directives)
지시어는 HTML 속성(attribute)에 특별한 동작을 부여하기 위해 사용되는 토큰이다.
지시어는 Vue 인스턴스의 데이터와 DOM을 연결하여, 데이터 변화에 따라 동적으로 DOM을 업데이트하거나 EventListener를 추가하는 역할을 한다.

### 지시어의 종류
* v-bind: 속성을 데이터에 동적으로 바인딩합니다. 줄여서 ':' 하나로도 사용할 수 있다.
```vue
<div :class="changeClass">{{ name }}</div>
<input :type="type" :value="name" />
```
* v-on: DOM 이벤트를 듣고, 이벤트 발생 시 표현식을 실행한다. 줄여서 '@' 하나로도 사용할 수 있다.
```vue
    <button
    class="btn btn-primary"
    @click="updateName"
>Click</button>
```
