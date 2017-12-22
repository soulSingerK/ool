<template>
  <div id="mask" v-show="isShow">
    <div class="content" :style="wdStyle">
      <div class="title">
        {{title}}
        <i class="m-icon close" @click="close">&#xe614;</i>
      </div>
      <scroll :data="data" v-if="data.length" class="wrapper">
        <p class="type">优惠券</p>
        <ul class="scroll-content">
          <li v-for="(item, index) in data" :key="item.couponId" class="item" @click="select(item, index)">
            <coupon :data="item" :isSelected="selectIndex===index" :isShow="true"></coupon>
          </li>
        </ul> 
      </scroll>
      <div class="footer">
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </div>
  </div> 
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Coupon from 'base/coupon/coupon'

  export default {
    props: {
      width: {
        type: Number,
        default: 600
      },
      data: {
        type: Array,
        default: null
      },
      isShow: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '弹窗'
      }
    },
    created() {
    },
    data () {
      return {
        selectIndex: -1
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      select(item, index) {
        this.selectIndex = index
        this.selectItem = item
      },
      confirm() {
        if (!this.selectItem) {
          return alert('请选择优惠券！')
        }
        this.$emit('confirm', this.selectItem)
      }
    },
    computed: {
      wdStyle() {
        return `width: ${this.width}px`
      }
    },
    watch: {
      isShow(newVal) {
        let dom = document.body
        if (newVal) {
          dom.style.height = '100%'
          dom.style.overflow = 'hidden'
        } else {
          dom.style.height = 'auto'
          dom.style.overflow = 'auto'
        }
        this.selectIndex = -1
        this.selectItem = null
      }
    },
    components: {
      Scroll,
      Coupon
    }
  }
</script>

<style lang="sass" scoped>
  .no-flow
    height: 100%;
    overflow: hidden;
  #mask
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10;
  .content
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 4px;
  .title
    height: 50px;
    box-sizing: border-box;
    padding: 16px 20px;
    border-bottom: 1px solid #e7e7e7;
    font-size: 16px;
    color: #999;
  .close
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #ccc;
  .type
    font-size: 16px;
    margin-top: 20px;
  .footer
    padding-top: 29px;
    padding-bottom: 30px;
    text-align: center;
    .confirm
      min-width: 80px;
      height: 30px;
      padding: 0 20px;
      background-color: #4587ff;
      border-color: #4587ff;
      color: #fff;
      box-sizing: border-box;
      border: 1px solid #e7e7e7;
      border-radius: 3px;
      cursor: pointer;
  .wrapper
    padding-left: 18px;
    padding-right: 18px;
    height: 580px;
    border-bottom: 1px solid #e7e7e7;
  .scroll-content
    overflow: hidden;
    .item
      float: left
      margin-right: 20px;
      margin-top: 15px;
      cursor: pointer;
  
</style>
