<template>
  <div id="app">
    <set-header></set-header>  
    <router-view/>
  </div>
</template>

<script>
  import setHeader from 'components/set-header/set-header'
  export default {
    name: 'app',
    components: {
      setHeader
    }
  }
</script>

<style>
</style>
