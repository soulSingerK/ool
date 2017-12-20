<template>
  
</template>

<script>
  import Line from 'base/line/line'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import NoData from 'base/no-data/no-data'

  import {leftPieOption, rightPieOption} from 'common/js/config'
  import {getJoinData} from 'api/index.js'
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
        dates: "7"
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
        location.href = `/api/activity/edit?encryptActivityId=${this.actTime.encryptActivityId}`
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
        let url = '/api/home/getjoinorpaymentsevenorthirty'
        let data = {dates: time}
        ajaxFn(url, data).then((res) => {
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
      },
    },
    computed: {
      // bgUrl() {
      //   return `//sc.mysodao.com/app/taobao-admin/src/imgs/${this.actTime.imgUrl}.png`
      // },
      isOpenUrl() {
        return this.actTime.isOpen?'//sc.mysodao.com/app/taobao-admin/src/imgs/open.png':'//sc.mysodao.com/app/taobao-admin/src/imgs/pause.png'
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
        if (this.rightData && this.rightData.length ) {
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
        if(this.leftPie && this.rightPie) {
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
        if(newVal === oldVal) {
          return 
        }
        this._getStatistics(newVal)
      },
      leftPie(newval) {
        if (!this.hasShopData) {
          return 
        }
        let option = leftPieOption(this.leftPie)
        if(!this.leftChart) {
          this.leftChart = echarts.init(this.$els.pie)
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
        if(!this.rightChart) {
          this.rightChart = echarts.init(this.$els.pieright)
        }
        this.rightChart.setOption(option)
      } 
    },
    components: {
      Line,
      NoData
    }
  }
</script>

<style lang="sass" scoped>

</style>
