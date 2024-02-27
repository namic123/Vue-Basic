# 이벤트 버블링(Event Bubbling)
이벤트 버블링이란, 웹 브라우저에서 이벤트가 발생했을 때, 해당 이벤트가 발생한 엘리먼트로부터 시작해서 DOM 트리를 따라 부모 요소로 전파되는 것을 말한다.
즉, 어떤 엘리먼트(예:button)에 이벤트(예:onClick)가 발생하면 해당 이벤트는 먼저 해당 엘리먼트에서 발생하고, 그 다음에는 요소의 부모, 또 전파되어 그 부모의 부모 등으로
계속 상위 엘리먼트로 전파되는 것을 말한다. 이 과정은 최상이 요소인 <html> 또는 document 객체에 도달하거나, 이벤트의 전파가 명시적으로 중단될 때까지 계속된다.

이벤트 버블링은 이벤트를 처리하는 핸들러를 효율적으로 관리할 수 있게 해주는 중요한 메커니즘이다. 
예를들어, 테이블에 여러 버튼이 있다고 가정하면, 각 버튼마다 EventListener를 추가하는 대신, 테이블 전체에 하나의 EventListener를 추가하여, 버블링을 통해 발생한 이벤트를 처리할 수 있다.
이것을 이벤트 위임(Event Delegation)이라고 하며, 이벤트를 처리하는 핸들러의 수를 줄이고 메모리 사용을 최적화하는 데 도움이 된다. 

이벤트 버블링은 필요한 경우 중단할 수 있다. JavaScript에서는 이벤트 객체의 'stopPropagation()'(Vue3에서는 @click.stop 등으로 사용) 메서드를 호출하여 이벤트 버블링을 중단할 수 있다.
이는 특정 상황에서 상위 엘리먼트로의 이벤트 전파를 원하지 않을 때 유용하다.

```html
<div id="parent">
  부모
  <button id="child">자식</button>
</div>

<script>
  document.getElementById('parent').addEventListener('click', function() {
    alert('부모 클릭 이벤트 발생');
  });

  document.getElementById('child').addEventListener('click', function(event) {
    alert('자식 클릭 이벤트 발생!');
    // 이벤트 버블링 중단
    event.stopPropagation();
  });
</script>

```
- 위 예시는 자식 요소(버튼)과 그 부모 요소에 클릭 이벤트 리스너가 있다.
- 자식요소인 버튼을 클릭하면 '자식 클릭 이벤트 발생!'이라는 alert가 발생하고, stopPropagation() 메소드 호출로 인해 이벤트가 부모 요소로 버블링되지 않는다. 