<script setup lang="ts">
import {ref} from 'vue'
let width = ref(100)
function add(){
  width.value += 10
}
</script>

<template>
<div class="add-div" :style="{width:width+'px'}"></div>
  <div>{{width}}</div>
  <button @click="add">add</button>

</template>

<style scoped>
.add-div{
  background: red;
  height: 100px;
  position: relative;
  background:#d88986;
  animation: move 2s linear infinite;
}
</style>