<template>
  <div class="tpl">
    <p class="title">模板选择</p>
    <ul class="m-tpl-list">
      <li v-for="(item, key) in tpl" :key="key">    
        <div class="tpl-box" :style="{'background-image': 'url(' + item.cover + ')'}">
          <div class="hover-box">
            <div class="hover-wrapper">
              <img alt="" :src="item.qrcode
              "/>
              <p>手机淘宝扫我预览</p>
              <button @click="selectTpl(key)">选择模板{{num(key)}}（{{item.name}}）</button>
            </div>  
          </div>
        </div>
      </li>
    </ul>
  </div>
  
</template>

<script>
  import {tpl} from './config'
  import {mapMutations} from 'vuex'

  export default {
    created() {
      this.tpl = tpl
    },
    data() {
      return {
  
      }
    },
    methods: {
      selectTpl(tpl) {
        if (tpl) {
          this.setTpl(tpl)
          this.$router.push({
            path: 'detailSet'
          })
        }
      },
      num(key) {
        switch (key) {
          case 'cartoon':
            return '一'
          case 'line':
            return '二'
          case 'reality':
            return '三'
        }
      },
      ...mapMutations({
        setTpl: 'SET_TPL'
      })
    }
  }
</script>

<style lang="sass" scoped>
  .tpl
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
  .title
    font-size: 14px;
    color: #999;
    height: 50px;
    padding-left: 24px;
    line-height: 50px;
    border-bottom: 1px solid #e7e7e7;
  .m-tpl-list
    margin: 60px 80px 40px;
    overflow: hidden;
    > li
      float: left;
      width: 300px;
      height: 565px;
      margin-right: 70px;
      &:last-child 
        margin-right: 0;
      .tpl-box
          width: 300px;
          height: 533px;
          margin-top: 18px;
          background-size: cover;
          cursor: pointer;
          &:hover
            .hover-box
              opacity: 1;
      .hover-box
        opacity: 0;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        transition: all .5s;
        position: relative;
        .hover-wrapper
          background-color: #fff;
          position: absolute;
          bottom: 0;
          height: 280px;
          box-shadow: 1px 2px 10px #eee;
          -webkit-box-shadow: 1px 2px 10px #eee;
          -moz-box-shadow: 1px 2px 10px #eee;
          -ms-box-shadow: 1px 2px 10px #eee;
          -o-box-shadow: 1px 2px 10px #eee;
          > img
            display: inline-block;
            width: 134px;
            height: 134px;
            margin: 40px 83px 10px;
          > p 
            color: #999;
            text-align: center;
          > button
              display: block;
              width: 140px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              margin: 25px auto 0;
              background-color: #4587ff;
              border-radius: 4px;
              border: none;
              color: #fff;
</style>

