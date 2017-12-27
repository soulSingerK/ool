<template>
  <div class="how-do">
    <button class="g-btn-md rmg" @click="last" v-show="lastShow">上一步</button>
    <button class="g-btn-md g-btn-success" @click="next" v-show="nextShow">下一步</button>
  </div>
</template>

<script>
  export default {
    props: {
      lastShow: {
        type: Boolean,
        default: false
      },
      nextShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      last () {
        this.$emit('last')
      },
      next () {
        this.$emit('next')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .how-do
    height: 70px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    display: flex;
    border-top: 1px solid #e2e2e2;
    justify-content: center;
    align-items: center;
</style>
