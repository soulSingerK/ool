<template>
  <div class="index-main">
    <div class="login-content" v-if="activity&&!activity.isCreate">
      <div class="btns">
        <a href="" class="btn-item">
          <span class="icon-wrap">
            <i class="m-icon">&#xe6a6;</i>
          </span>
          <p class="text">帮问新手指南</p>
        </a>
        <a href="/api/activity/edit" class="btn-item">
          <span class="icon-wrap">
            <i class="m-icon">&#xe6a7;</i>
          </span>
          <p class="text">开启帮问助手</p>
        </a>
      </div>
    </div>
    <index-content v-if="activity&&activity.isCreate" @show="showFn" :act-time="activity"></index-content>
    <p class="copyright" v-if="true">浙江搜道网络技术有限公司版权所有  &nbsp;&nbsp;  浙B2-20090144  &nbsp;  浙ICP备</p>
    <div id="cover" v-show="isShow" @click="isShow = !isShow"></div>
    <div class="cover-content" v-show="isShow && url">
      <p class="cover-title">
        <span class="cover-text">预览活动</span>
        <i class="close m-icon" @click="isShow=!isShow">&#xe679;</i>
      </p>
      <div class="cover-img">
        <img :src="url">
        <p class="cover-txt">手淘扫一扫预览</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getActivityInfo } from 'api/index'
  import indexContent from './subpage/index-content'
  export default {
    data() {
      return {
        show: false,
        selected: 1,
        isShow: false,
        url: '',
        activity: null
      }
    },
    created () {
      this._getActivityInfo()
    },
    mounted () {
    },
    methods: {
      _getActivityInfo() {
        getActivityInfo().then(res => {
          this.activity = res
        })
      }
    },
    computed: {
    },
    components: {
      indexContent
    }
  }
</script>

<style lang="sass" scoped>
  .index-main
    position: relative;
    .login-header
      background: #fff;
    .login-content
      position: relative;
      width: 1200px;
      min-height: 800px;
      background: url("//sc.mysodao.com/app/taobao-admin/src/imgs/login-bg.png") no-repeat;
      margin: 10px auto 0;
      .btns
        position: absolute;
        top: 380px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        .btn-item
          display: inline-block;
          margin: 0 20px;
          background: url("//sc.mysodao.com/app/taobao-admin/src/imgs/btn-bg.png") no-repeat 10px 0;
          .icon-wrap
            display: block;
            width: 80px;
            height: 80px;
            margin: 0 10px 12px;
            font-size: 60px;
            color: #fff;
            text-align: center;
            line-height: 80px;
            border-radius: 10px;
            background: linear-gradient(left bottom,#47b5fe,#2bd9eb);
          .text
            color: #333;
            text-align: center;
          &:hover
            background: url("//sc.mysodao.com/app/taobao-admin/src/imgs/btn-hover.png") no-repeat 10px 0;
            .icon-wrap
              background: linear-gradient(left bottom,#4589ff, #48b3ff);
            .text
              color: #4587ff;
    .copyright
      font-size: 12px;
      color: #999;
      text-align: center;
      height: 50px;
      line-height: 50px;
      position: sticky;
      &.not_over
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

  #cover
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: .6;
    z-index: 96;
  .cover-content
    width: 222px;
    height: 250px;
    background-color: #fff;
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 50%;
    border-radius: 4px;
    transform: translate3d(-50%, -70%, 0)
    .cover-title
      font-size: 16px;
      color: #999;
      height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #e7e7e7;
      position: relative;
      .cover-text
        line-height: 50px;
      .close
        color: #ccc;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    .cover-img 
      padding: 20px 51px 0;
      img
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
      .cover-txt
        text-align: center;
        color: #999;
        font-size: 12px;
</style>
