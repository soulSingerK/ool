<template>
<!-- 该页面有两个组件 一个基础组件index-content 用来展示首页上的线图
      另一个业务组件Line，用来展示已经创建活动的首页
 -->
  <div class="index-content">
    <div class="index-top">
      <div class="activity">
        <div class="img-wrapper">
          <img :src="activityImg" class="img">
          <img :src="isOpenUrl" class="icon">
          <div class="dos">
            <span class="do split" @click="show"><i class="m-icon">&#xe6ac;</i>预览</span>
            <span class="do" @click="edit"><i class="m-icon">&#xe6ab;</i>编辑</span>
          </div>
        </div>
        <p class="text">首次创建：<span v-if="actTime">{{actTime.createTime}}</span></p>
        <p class="text">更新时间：<span v-if="actTime">{{actTime.modifiedTime}}</span></p>
      </div>
      <line-chart class="has-mg" :data="activity" :line-data="joinsevenday" v-if="activity || joinsevenday.length" title="参与人数"></line-chart>
      <div class="line-chart has-mg" v-else>
        <p class="title before-split">昨日参与人数</p>
        <div class="content">
           <no-data></no-data>
        </div>
       
      </div>
      <line-chart :data="pay" v-if="pay || boughtsevenday.length" :line-data="boughtsevenday" title="付款人数"></line-chart>
      <div class="line" v-else>
        <p class="title before-split">昨日付款人数</p>
        <div class="content">
           <no-data></no-data>
        </div>
      </div>
    </div>

    <div class="index-bottom">
      <div class="b-title">
        <span class="b-text">参与统计</span>
        <select class="select" v-model="dates">
          <option value="7">最近7天</option>
          <option value="30">最近30天</option>
        </select>
      </div>
      <div class="b-content">
        <div class="b-left">
          <p class="bl-title">店铺人数统计</p>
         
          <div class="left-wrap">
            <no-data v-if="!hasShopData"></no-data>
             <div class="left-legend" v-if="hasShopData">
              <div class="legend-left">
                <p class="legend-top-left">{{leftPie.pay}}</p>
                <p class="legend-bottom-left">付款转化人数</p>
              </div>
              <div class="legend-right">
                <p class="legend-top-right" >{{leftPie.total}}</p>
                <p class="legend-bottom-right">总参与人数</p>
              </div>
            </div>
             <div class="echarts-pie" ref="leftPie">
            </div>
          </div>
        </div>
        <div class="b-right">
          <p class="bl-title">
            人群分布
            <select class="right-select" v-model="type">
              <option :value="item.id" v-for="item in types" :key="item.id">{{item.name}}</option>
            </select>
          </p>
          <div class="right-wrap">
            <no-data v-if="!hasPeopleData"></no-data>
            
            <div class="right-legend" v-if="rightData">
              <ul v-if="perkind">
                <li class="r-item" v-for="item in perkind" :key="item.name">
                  <span class="r-icon" :style="item.styleObj"></span>
                  <span class="r-text">{{item.name}}</span>
                  <span class="r-pct" :style="item.pctColor">{{item.pct}}%</span>
                </li>
              </ul>
            </div>
            <div class="pie-right" ref="pieright"></div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
  import lineChart from 'base/line/line'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import NoData from 'base/no-data/no-data'

  import {leftPieOption, rightPieOption} from 'common/js/config'
  import {getJoinData, getJoinDataT} from 'api/index.js'
  // 右图颜色
  const colors = ['#fb8696', '#fdcc8c', '#8a9ceb', '#67d5a2']

  export default {
    props: {
      actTime: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        activity: null, // 昨日参与人数数据
        pay: null,      // 昨日付款人数
        leftPie: null,  // 左边饼图数据
        rightData: null,
        type: -1, // 右边饼图类型
        joinsevenday: [],
        boughtsevenday: [],
        types: [],
        dates: '7'
      }
    },
    created() {
      // 获得昨日参与/付款数据
      this._getData()
      // 获取人数统计数据(默认近7天)
      this._getStatistics(this.dates)
    },
    methods: {
      edit() {
        this.$router.push({
          path: '/ay',
          query: {
            id: 123
          }
        })
      },
      _getData() {
        getJoinData().then((res) => {
          this.activity = res.data.joinTopFive
          this.pay = res.data.boughtTopFive
          this.joinsevenday = res.data.joinSevenDay
          this.boughtsevenday = res.data.boughtSevenDay
        })
      },
      _getStatistics(time) {
        let data = {dates: time}
        getJoinDataT(data).then((res) => {
          this.leftPie = {
            pay: res.data.payTotal,
            total: res.data.joinTotal,
            rate: res.data.rate
          }
          this.rightData = res.data.distributed
          if (res.data.questionTypes) {
            this.types = res.data.questionTypes
            this.type = this.types && this.types[0].id
          }
        })
      },
      show() {
        this.$emit('show')
      }
    },
    computed: {
      activityImg () {
        return `/src/assets/${this.actTime.imgUrl}.png`
      },
      isOpenUrl() {
        return this.actTime.isOpen ? '/src/assets/open.png' : '/src/assets/pause-icon.png'
      },
      // 店铺人数统计是否有数据
      hasShopData () {
        if (this.leftPie && this.leftPie.total) {
          return true
        }
        return false
      },
      // 人群分布是否有数据
      hasPeopleData () {
        if (this.rightData && this.rightData.length) {
          return true
        }
        return false
      },
      rightPie() {
        let temp = null
        if (!this.rightData) {
          return
        }
        this.rightData.forEach((item, index) => {
          if (item.type === this.type) {
            temp = item
          }
        })
        return temp
      },
      perkind() {   //  右边饼图图例
        if (this.leftPie && this.rightPie) {
          let ret = []
          let total = this.leftPie.total
          ret = this.rightPie.questions.map((item, index) => {
            let kind = {}
            kind.name = item.optionName
            kind.pctColor = {
              color: colors[index]
            }
            kind.styleObj = {
              backgroundColor: colors[index]
            }
            kind.pct = ((item.value / total) * 100).toFixed(2)
            return kind
          })
          return ret
        }
      }
    },
    watch: {
      dates(newVal, oldVal) {
        if (newVal === oldVal) {
          return
        }
        this._getStatistics(newVal)
      },
      leftPie(newval) {
        if (!this.hasShopData) {
          return
        }
        let option = leftPieOption(this.leftPie)
        if (!this.leftChart) {
          this.leftChart = echarts.init(this.$refs.leftPie)
        }
        this.leftChart.setOption(option)
      },
      rightPie(newval) {
        if (!newval) {
          return
        }
        let _data = []
        _data = this.rightPie.questions.map((item, index) => {
          let obj = {}
          obj.name = item.optionname
          obj.value = item.value
          return obj
        })
        let option = rightPieOption(_data, this.leftPie.total)
        if (!this.rightChart) {
          this.rightChart = echarts.init(this.$refs.pieright)
        }
        this.rightChart.setOption(option)
      }
    },
    components: {
      lineChart,
      NoData
    }
  }
</script>

<style lang="sass" scoped>
  .index-content
    width: 1200px;
    min-height: 800px;
    margin: 10px auto 0;
  .index-top
    overflow: hidden;
    .activity
      float: left;
      padding: 20px;
      background-color: #fff;
      margin-right: 10px;
      .img-wrapper
        margin-bottom: 10px;
        position: relative;
        width: 260px;
        height: 380px;
        border: 1px solid #e2e2e2;
        box-sizing: border-box;
        img
          margin-right: 0!important;
        .img
            width: 100%;
            height: 100%;
        .icon
          position: absolute;
          right: 0;
          top: 0;
        &:hover .dos
          opacity: 1;
        .dos
          box-sizing: border-box; 
          transition: opacity .2s ease;
          opacity: 0;
          width: 260px;
          height: 40px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, .6);
          z-index: 2;
          padding: 8px 0;
          .do  
            float: left;
            width: 50%;
            line-height: 24px;
            text-align: center;
            font-size: 12px;
            color: #fff;
            cursor: pointer;
            i
              font-size: 16px;
              margin-right: 4px;
          .split
            position: relative;
            &:after
              content: '';
              width: 1px;
              height: 100%;
              background-color: #80a691;
              position: absolute;
              right: 0;
              top: 0;
      .text 
        font-size: 12px;
        color: #666666;
        line-height: 20px;
    .has-mg
      margin-right: 10px;
    .before-split 
      padding-left: 20px;
      color: #333333;
      position: relative;
      &:before
        content: "";
        width: 3px;
        height: 20px;
        position: absolute;
        left: 0;
        top: 10px;
        background-color: #4587ff;
  .index-bottom 
    width: 100%;
    height: 420px;
    background-color: #fff;
    margin-top: 10px;
    box-sizing: border-box
    .b-title
      position: relative;
      padding-left: 20px;
      border-bottom: 1px solid #e7e7e7;
      height: 50px;
      .b-text
        line-height: 50px;
      .select
        float: right;
        width: 180px;
        height: 30px;
        border-color: #e7e7e7;
        margin: 10px 20px 0 0;
        padding-left: 6px;
        font-size: 12px;
      &:before
        content: '';
        position: absolute;
        width: 3px;
        height: 20px;
        background-color: #4587ff;
        left: 0;
        top: 15px;
    .b-content
      padding: 20px;
      .b-left
        width: 510px;
        height: 330px;
        border: 1px solid #e7e7e7;
        float: left;
        margin-right: 10px;
        box-sizing: border-box;
        .left-wrap
          height: 290px;
          position: relative;
          .echarts-pie
            width: 100%;
            height: 100%;
          .left-legend
            float: right;
            width: 50%;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            .legend-left
              float: left;
              width: 50%;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              .legend-top-left
                color: #6a75ff;
                font-weight: bold;
                font-size: 20px;
                text-align: center;
                line-height: 1.5;
              .legend-bottom-left
                color: #6a75ff;
                text-align: center;
              &:after
                content: '';
                width: 1px;
                height: 20px;
                background-color: #e7e7e7;
                position: absolute;
                right: 0;
                top: 10px;
            .legend-right
              float: right;
              width: 50%;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              .legend-top-right
                font-weight: bold;
                font-size: 20px;
                text-align: center;
                line-height: 1.5;
              .legend-bottom-right
                color: #999;
                text-align: center;
      .b-right
        width: 640px;
        height: 330px;
        border: 1px solid #e7e7e7;
        float: left;
        box-sizing: border-box;
        .right-select
          width: 120px;
          border-color: #e7e7e7;
          height: 30px;
          font-size: 12px;
          float: right;
          margin: 4px 9px 0 0;
          padding-left: 6px;
        .right-wrap
          height: 290px;
          position: relative;
          .pie-right
            height: 100%;
          .right-legend
            position: absolute;
            right: 0;
            top: 0;
            width: 50%;
            height: 100%;
            ul
              width: 140px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate3d(-50%, -50%, 0);
              .r-item
                height: 30px;
                font-size: 12px;
                line-height: 30px;
                .r-icon
                  display: block;
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background-color: red;
                  float: left;
                  margin: 8px 6px 0 0;
                .r-text
                  color: #999;
                  float: left;
                  display: block;
                  width: 70px;
                .r-pct
                  float: left;
      .bl-title
        height: 40px;
        color: #999;
        padding-left: 18px;
        line-height: 40px;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f5f8fb;
</style>
