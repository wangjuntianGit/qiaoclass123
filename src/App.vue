<template>
  <div id="app">
    <router-view
        class="view">
   </router-view>
    <div style="display: none">Version:v1.0.2</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  /* margin-top: 60px; */
}
body{margin:0px;padding:0;}
</style>
