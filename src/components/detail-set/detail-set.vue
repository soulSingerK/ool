<template>
  <div class="detail-wrapper">
    <router-header v-if="questions && questions.length" :data="questions"></router-header>
    <transition name="slide">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import routerHeader from 'base/router-header/router-header.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        nextShow: true,
        lastShow: false
      }
    },
    created () {
      this.setInit()
    },
    methods: {
      setInit () {
        this.setCurrent(1)
        this.$router.push({
          path: '/detailSet/setcover'
        })
        this.nextShow = true
        this.lastShow = false
      },
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
    transition: opacity 0.3s;
    .anmi
      transition: all .3s
  .slide-enter, .slide-leave-to
    opacity: 0;
    height: 0;
    .anmi
      transform: translate3d(100%, 0, 0);
</style>
