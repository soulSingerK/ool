<template>
  <div class="wrapper" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      data: {
        type: Array,
        default: null
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.scroll) {
          return
        }
        this.scroll = new BScroll(this.$refs.scroll, {
          probeType: this.probeType,
          click: this.click
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .wrapper
    overflow: hidden
</style>
