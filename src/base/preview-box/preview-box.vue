<template>
  <div class="u-set-left">
    <img src="/src/assets/phone-title.jpg" alt="" class="img">
    <div class="wrapper" :style="styleObj">
      <img :src="images.title" alt="" class="title">
      <scroll class="render-content">
        <ul class="items">
          <li v-for="(item, index) in data" :key="index" class="item" :class="{'select':index===select}">
            <img :src="item.src" alt="">
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </scroll>
      <img :src="images.btn" alt="" class="btn">
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  export default {
    props: {
      images: {
        type: Object,
        default: null
      },
      data: {
        type: Array,
        default: null
      },
      select: {
        type: Number,
        default: 0
      }
    },
    computed: {
      styleObj () {
        return {
          background: `url(${this.images.background})`,
          backgroundSize: 'cover'
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="sass" scoped>
  .u-set-left
    width: 375px;
    height: 667px;
  .img 
    height: 64px;
  .wrapper
    height: calc(100% - 64px);
    width: 100%;
    margin-top: -2px;
    .title
      width: 300px;
      margin-top: 60px;
      margin-left: 38px;
    .render-content
      height: 400px;
    .btn
      width: 180px;
      margin: 20px 0 0 100px;
  .items
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    .item
      img
        width: 150px;
        border-radius: 50%;
      .name
        color: #611100;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        margin: 10px 0;
      &.select
        img
          border: 1px solid red;
</style>
