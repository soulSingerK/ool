<template>
  <div class="line">
    <p class="title before-split">昨日{{title}}</p>
    <div class="content">
      <div class="top">
        <div class="left">
          <p class="count">{{data.total || 0}}</p>
          <p class="text">昨日{{title}}</p>
        </div>
        <div class="line-chart" ref="line">
          <no-data v-if="!lineData.length"></no-data>
        </div>
      </div>
      <div class="bottom">
        <p class="b-title">标签占比前五人群</p>
        <ul class="tag-items">
          <li class="tag-item" v-for="item in topFive" :key="item.value">
            <p class="t-text">{{item.tagName}}</p>
            <p class="t-count">{{item.value}}</p>
            <div class="outer">
              <div class="in" :style="item.objStyle"></div>
            </div>
            <p class="percent">{{item.pct}}</p>
          </li>
          <no-data v-if="!topFive"></no-data>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import {lineOption} from 'common/js/config'

  import NoData from 'base/no-data/no-data'

  const bgColor = ['#1fcc68', '#ffcb4d', '#4587ff', '#ff6d8c', '#1fcc68']
  export default {
    props: {
      data: {
        type: Object,
        default: null
      },
      title: {
        type: String,
        default: ''
      },
      lineData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        option: null
      }
    },
    created () { // created
      this._handData()
    },
    methods: {
      _initLine() {
        let charts = echarts.init(this.$refs.line)
        charts.setOption(this.option)
      },
      _handData() {
        // let data = this.data
        // let xData = ['10/27','10/28','10/29','10/30','10/31','11/01','11/02']
        // this.option = lineOption(this.title, xData, data.dateCount)
        let xData = []
        let serias = []
        this.lineData.forEach((item, index) => {
          xData.push(item.timePoint)
          serias.push(item.value)
        })
        this.option = lineOption(this.title, xData, serias)
      }
    },
    watch: {
      option(newVal) {
        if (!newVal) {
          return
        }
        this._initLine()
      }
    },
    computed: {
      topFive() {
        if (this.data && this.data.top5Tags) {
          let ret = []
          let temp = null
          ret = this.data.top5Tags.map((item, index) => {
            temp = {
              pct: `${item.rate}%`,
              objStyle: {
                width: `${item.rate}%`,
                backgroundColor: bgColor[index]
              }
            }
            return Object.assign({}, temp, item)
          })
          return ret
        }
      }
    },
    components: {
      NoData
    }
  }
</script>

<style lang="sass" scoped>
  .line
    width: 440px;
    height: 470px;
    float: left;
    position: relative;
    background-color: #fff;
    * 
      box-sizing: border-box;    
    .title
      line-height: 40px;
      border-bottom: 1px solid #e7e7e7;
    .content
      padding: 20px 20px 10px 20px;
      width: 100%;
      height: 430px;
      .top
        height: 100px;
        background-color: #f7f9fa;
        .left
          float: left;
          width: 170px;
          position: relative;
          .count
            font-weight: bold;
            font-size: 24px;
            color: #4587ff;
            text-align: center;
            margin-top: 28px;
          .text
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 16px;
          &:after
            content: "";
            width: 1px;
            height: 60px;
            background-color: #e7e7e7;
            position: absolute;
            right: 0;
            top: 20px;
        .line-chart
          position: relative;
          width: 230px;
          float: left;
          height: 100%;
      .bottom
        .b-title
          height: 50px;
          color: #999;
          padding-top: 24px;
        .tag-item
          border-bottom: 1px solid #e7e7e7;
          font-size: 12px;
          height: 50px;
          line-height: 50px;
          .t-text
            width: 100px;
            float: left;
          .t-count
            width: 80px;
            float: left;
          .outer
            width: 180px;
            height: 6px;
            background-color: #eee;
            position: relative;
            float: left;
            top: 22px;
            border-radius: 3px;
            .in 
              width: 50%;
              height: 6px;
              background-color: green;
              position: absolute;
              left: 0;
              top: 0;
              border-radius: 3px;
          .percent
            width: 40px;
            float: right;
            text-align: right;
            padding-right: 4px;
            color: #999;
          &:last-child
            border-bottom: none;
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
</style>
