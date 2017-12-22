<template>
  <div id="app">
    <set-header :isShow="tabShow"></set-header>
    <router-view/>
  </div>
</template>

<script>
  import setHeader from 'components/set-header/set-header'
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapGetters(['tabShow'])
    },
    components: {
      setHeader
    }
  }
</script>

<style>
</style>
