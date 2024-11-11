<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <el-button v-if="active < all" @click="clear">清理</el-button>
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
      </li>
    </ul>
    <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">
        没输入任何东西
      </div>
    </div>
    </transition>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
</template>
<script setup lang="ts">
let { title, todos, addTodo, clear, active, all, allDone } = useTodos();

</script>

<script lang="ts">
import { ref,computed } from "vue";
import {useMouse} from '../utils/mouse'
let {x,y} = useMouse()
let showModal = ref(false)
function useTodos() {
  let title = ref("");
  let todos = ref([{ title: "学习Vue", done: false }]);
  function addTodo() {
    if (!title.value) {
      showModal.value = true
      setTimeout(()=>{
        showModal.value = false
      },1500)
      return;
    }
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  let all = computed(() => todos.value.length);
  let allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });
  return { title, todos, addTodo, clear, active, all, allDone };
}
</script>
<style scoped>
.info-wrapper {
  position: fixed;
  top: 20px;
  width:200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.modal-enter-active, .modal-leave-active {
  transition: all 0.5s ease;
}
</style>