<template>
  <div class="detail-wrapper">
    <router-header v-if="questions && questions.length" :data="questions"></router-header>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import routerHeader from 'base/router-header/router-header.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    mounted() {
      setTimeout(() => {
        this.setCurrent(1)
        this.$router.push({
          path: '/detailSet/setCover'
        })
      }, 20)
    },
    methods: {
      ...mapMutations({
        setCurrent: 'SET_CURRENT'
      })
    },
    computed: {
      ...mapGetters(['questions'])
    },
    components: {
      routerHeader
    }
  }
</script>

<style lang="sass" scoped>
  .detail-wrapper
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s;
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0);
</style>
