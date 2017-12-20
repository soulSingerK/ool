<template>
  <div class="line">
    <p class="title before-split">昨日{{title}}</p>
    <div class="content">
      <div class="top">
        <div class="left">
          <p class="count">{{data.total || 0}}</p>
          <p class="text">昨日{{title}}</p>
        </div>
        <div class="line-chart" v-el:line>
          <no-data v-if="!lineData.length"></no-data>
        </div>
      </div>
      <div class="bottom">
        <p class="b-title">标签占比前五人群</p>
        <ul class="tag-items">
          <li class="tag-item" v-for="item in topFive">
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
        default: []
      }
    },
    data() {
      return {
        option: null,
      }
    },
    beforeCompile() { // created
      this._handData()
    },
    methods: {
      _initLine() {
        let charts = echarts.init(this.$els.line)
        charts.setOption(this.option)
      },
      _handData() {
        // let data = this.data
        // let xData = ['10/27','10/28','10/29','10/30','10/31','11/01','11/02']
        // this.option = lineOption(this.title, xData, data.dateCount)
        if (!this.lineData || !this.lineData.length) {
          return
        }
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
          let pct
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