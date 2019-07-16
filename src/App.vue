<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  body{
    margin: 0;
    background-color: #434A50;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>

<script>
  import HelloWorld from "./components/views/HelloWorld";
  export default {
    components: {HelloWorld}
  }
</script>
