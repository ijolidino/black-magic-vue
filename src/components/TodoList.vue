<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo"/>
    <el-button v-if="active < all" @click="clear">清理</el-button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done"/>
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo(todo.title)">
          ❌
          </span>
        </li>
      </transition-group>
    </ul>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">
          没输入任何东西
        </div>
      </div>
    </transition>
    <div>
      全选<input type="checkbox" v-model="allDone"/>
      <span> {{ active }} / {{ all }} </span>
    </div>

    <span class="dustbin"> 🗑 </span>
    <div class="animate-wrap">
      <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
      >
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
let {
  title,
  todos,
  addTodo,
  clear,
  active,
  all,
  allDone,
  removeTodo,
  beforeEnter,
  enter,
  afterEnter,
  animate
} = useTodos();
</script>

<script lang="ts">
import {ref, computed, reactive} from "vue";
import {useMouse} from '../utils/mouse'

let {x, y} = useMouse()
let showModal = ref(false)

function useTodos() {
  let title = ref("");
  let todos = ref([{title: "学习Vue", done: false}]);

  function addTodo() {
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 1500)
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

  function removeTodo(title) {
    todos.value = todos.value.filter(t => t.title !== title);
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

// 废纸篓功能
  let animate = reactive({
    show: false,
    el: null
  })

  function beforeEnter(el) {
    let dom = animate.el
    let rect = dom.getBoundingClientRect()
    let x = window.innerWidth - rect.left - 60
    let y = rect.top - 10
    el.style.transform = `translate(-${x}px, ${y}px)`
  }

  function enter(el, done) {
    document.body.offsetHeight
    el.style.transform = `translate(0,0)`
    el.addEventListener('transitionend', done)
  }

  function afterEnter(el) {
    animate.show = false
    el.style.display = 'none'
  }

  return {title, todos, addTodo, clear, active, all, allDone, removeTodo, beforeEnter, enter, afterEnter, animate};
}
</script>
<style scoped>
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
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

.flip-list-move {
  transition: transform 0.5s;
}

.flip-list-enter-active {
  transition: all 1s ease;
}

.flip-list-leave-active {
  transition: all 1s ease;
}

.flip-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>