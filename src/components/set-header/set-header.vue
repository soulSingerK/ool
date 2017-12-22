<template>
  <div class="header">
    <div class="wrapper">
      <img src="./../../assets/help-log.png" alt="" />
      <ul class="hrefs" v-if="isShow">
        <li class="href">
          <router-link to="/index">首页</router-link>
        </li>
        <li class="href">
          <router-link to="/activity">活动</router-link>
        </li>
        <li class="href">
          <router-link to="/shop">商品</router-link>
        </li>
      </ul>
      <div class="right">
        <p class="time">服务时间：<span>{{time}}</span></p>
        <a href="#" class="link">联系我们</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {getServerTime} from 'api/index'
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        time: ''
      }
    },
    created () {
      this._getServerTime()
    },
    methods: {
      _getServerTime () {
        getServerTime().then((res) => {
          this.time = res.data.serviceTime
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .header
    width: 100%;
    height: 70px;
    background-color: #fff;
    box-shadow: 0 2px 5px 5px #e2e2e2;
    margin-bottom: 10px;
  .wrapper
    width: 1200px;
    margin: 0 auto;
    img
      float: left;
      margin-right: 40px;
  .router-link-active
    color: #4587ff;
    border-bottom: 3px solid #4587ff
  .hrefs
    float: left
  .href
    float: left;
    display: block;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    a
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      &:hover
        border-bottom: 3px solid #4587ff;
        color: #4587ff;
  .right
    float: right;
    .time
      color: #999;
      font-size: 12px;
      line-height: 70px;
      float: left;
    .link
      display: block;
      float: left;
      width: 80px;
      height: 30px;
      margin: 20px 0 0 20px;
      font-size: 12px;
      color: #fff;
      background-color: #4587ff;
      border-radius: 4px;
      text-align: center;
      line-height: 30px;
</style>
