<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<style>
  body{
    margin: 0;
    background-color: #545c64;
  }
</style>

<script>
  import HelloWorld from "./components/views/HelloWorld";
  export default {
    components: {HelloWorld}
  }
</script>
