<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  body{
    margin: 0;
    background-color: #fffef6;
  }
</style>

<script>
  import HelloWorld from "./components/views/HelloWorld";
  export default {
    components: {HelloWorld}
  }
</script>
