<template>
<!-- 페이징  -->
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-if="currentPage !== 1" class="page-item">
        <a
          style="cursor: pointer"
          class="page-link"
          @click="getTodos(currentPage - 1)"
        >
          Previous
        </a>
      </li>
      <!--페이지 번호 반복하기-->
      <!-- 현재 페이지 active -->
      <li
        v-for="page in numberOfPages"
        :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''"
      >
        <a style="cursor: pointer" class="page-link" @click="getTodos(page)">
          {{ page }}
        </a>
      </li>
      <li v-if="currentPage !== numberOfPages" class="page-item">
        <a
          style="cursor: pointer"
          class="page-link"
          @click="getTodos(currentPage + 1)"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {computed, ref, watch, defineExpose} from 'vue';
import axios from 'axios';

export default {
  props: {
    // 부모 컴포넌트에게 받은 prop의 타입을 명시하여 일관성 보장
    searchText: {
      type: String,
      required: true,
    },
  },
  emits: ["set-todos"],
    setup(props,{emit}){
      // 페이지네이션
      // 현재 페이지 번호
      const currentPage = ref(1);
      // 페이지당 보여줄 todo
      const limit = 5;
      // todo 총 개수
      const numberOfTodos = ref(0);
      // 총 페이지 수
      // todo 개수 11/5 = 2.1 -> 올림(ceil) -> 3
      const numberOfPages = computed(() => {
        return Math.ceil(numberOfTodos.value / limit);
      });

      // db에서 todos 데이터 가져오기
      const getTodos = async (page = currentPage.value) => {
        currentPage.value = page;
        try {
          const res = await axios.get(
            `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${props.searchText}&_page=${page}&_limit=${limit}`
          );
          // res.headers["x-total-count"] : 데이터의 총 개수. 즉, todos의 개수
          // 버전 문제가 있을 수 있음 : npm install -g json-server@0.17.0
          numberOfTodos.value = res.headers["x-total-count"];
          emit("set-todos", res.data);
        } catch (err) {
          console.log(err);
          emit("get-todos-error", "Something went wrong.");
        }
      };
      getTodos();

      // props를 watch하기 위해서는 콜백 함수 ()=>를 이용하여 현재 값을 가져와야 한다.
      let timeout = null;
      watch(()=> props.searchText,()=>{
        // 중복 요청을 방지하기 위해 중복 호출시 이전 호출 건은 취소
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
          getTodos(1);
        }, 1000);
      });

      defineExpose({getTodos})
      return{
        numberOfPages,
        currentPage,
        getTodos,
      }
    }
  }
</script>


<style scoped>

</style>