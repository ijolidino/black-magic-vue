<script setup lang="ts">
import TodoList from './components/TodoList.vue'
import {ref} from 'vue'
import Rate from './components/Rate.vue';
import AddDiv  from "./components/AddDiv.vue";
import ShowAndHiden  from "./components/ShowAndHiden.vue";
import Count from "./components/Count.vue";

let score = ref(3)

function update(num){
  score.value = num
}
</script>

<template>
  <div>
    <TodoList></TodoList>
    <h1>你的评分是 {{score}}</h1>
<!--    <Rate :value="3" theme="black">分数</Rate>-->
<!--    <Rate :value="4" theme="red">分数1</Rate>-->
    <Rate :value="score" @update-rate="update"></Rate>
<!--    <Rate :value="1" theme="green"></Rate>-->
    <Count>累加器</Count>
    <AddDiv></AddDiv>
    <
    <show-and-hiden></show-and-hiden>
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
