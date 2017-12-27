<template>
  <div class="wrapper">
    <p class="title">{{data.name}}</p>
    <div class="img-box">
      <img :src="data.src" alt="" @click="showUpload">
    </div>
    <transition name="show">
      <div class="btns-wrapper" v-show="data.isShow">
        <p>图片推荐尺寸：{{data.size}}</p>
        <div class="btns">
          <button class="g-btn-md g-btn-success">上传图片</button>
          <button class="g-btn-md g-btn-success">下载原图</button>
          <button class="g-btn-md">还原默认</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    methods: {
      showUpload() {
        if (this.data.isShow) {
          this.$emit('close')
        } else {
          this.$emit('show', this.data.key)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .show-enter-active, .show-leave-active
    transition: opacity .5s
  .show-enter, .show-leave-to
    opacity: 0
  .wrapper
    position: relative;
  .title 
    margin-bottom: 6px;
  .img-box
    position: rela
    display: flex;
    align-items: center;
    justify-content: center;
    width: 118px;
    height: 118px;
    border: 1px solid #e7e7e7;
    background-color: #eee;
    cursor: pointer;
    img
      max-width: 100%;
      max-height: 100%;
  .btns-wrapper
    position: absolute;
    z-index: 3;
    bottom: -125px;
    left: 50%;
    height: 110px;
    box-sizing: border-box;
    padding: 19px 29px;
    border: 1px solid #e7e7e7;
    background-color: #fff;
    transform: translateX(-50%);
    &:before
      content: "";
      position: absolute;
      top: -16px;
      left: 50%;
      border: 8px solid transparent;
      border-bottom: 8px solid #e7e7e7;
      z-index: 4;
      transform: translateX(-50%);
    &:after
      z-index: 5;
      content: "";
      position: absolute;
      top: -15px;
      left: 50%;
      border: 8px solid transparent;
      border-bottom: 8px solid #fff;
      transform: translateX(-50%);
    .btns
      width: 340px;
      margin-top: 26px;
      display: flex;
      justify-content: space-between;       
</style>
