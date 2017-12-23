<template>
  <div class="awrapper">
    <div class="g-wrapper">
      <div class="g-type-top">
        <span class="sort">1</span>
        <span class="title">选择你的主营类目</span>
      </div>
      <div class="g-type-checks">
        <div class="input-item" v-for="item in mainTypeData" :key="item.key">
          <input type="radio" v-model="mainTypeIn" :id="item.id" :disabled="item.checkable ? false: true" :value="item.value">
          <label :for="item.id">
            {{item.name}}
            <span class="status" v-if="!item.checkable">（待开放）</span>
          </label>
        </div>
      </div>
    </div>

    <div class="g-wrapper">
      <div class="g-type-top">
        <span class="sort">2</span>
        <span class="title">设置买家问题（多选）</span>
      </div>
      <div class="g-type-checks">
        <div class="input-item" v-for="item in questionsData" :key="item.key">
          <input type="checkbox" v-model="questionsIn" :id="item.value" :value="item.value">
          <label :for="item.value">
            {{item.name}}
          </label>
        </div>
      </div>
    </div>

    <div class="g-wrapper">
      <div class="g-type-top">
        <span class="sort">3</span>
        <span class="title">奖品设置</span>
      </div>
      <div class="g-prize">
        <p class="hz">用户每<input type="text" v-model="awords.hzDay"/>天可中奖<input type="text" v-model="awords.hzTime"/>次</p>
        <div class="g-prize-wrapper">
          <div class="g-prize-item" v-for="(prize, index) in awords.list" :key="index">
            <p class="title">{{calcRaw(index + 1)}}等奖</p>
            <coupon :data="prize.coupon" v-if="prize.coupon"></coupon>
            <div class="buttons">
              <button class="m-btn-md" v-if="prize.coupon" @click="reSelect(prize.coupon, index)">重新选择</button>
              <button class="m-btn-md btn-reselect" v-if="!prize.coupon" @click="showDialog(index)">选择奖品</button>
              <button class="m-btn-md" v-if="prize.coupon && awords.list.length !== 1" @click="delCoupon(index)">删除此项</button>            
            </div>
            <div class="probability" v-if="prize.coupon">
              <span>
                中奖概率
                <input type="text" class="m-text-sm" v-model="prize.percent">
                %
              </span>
              <i>可设置范围为0.01%-100%</i>
            </div>
          </div>  
          <div class="addItem">
            <button class="m-btn-md" @click="addCoupon">增加一条</button>
          </div>
        </div>
      </div>  
    </div>
    <div class="next">
      <span class="dot"></span>
      <button class="m-btn-md btn-reselect" @click="saveSet">设置完成，进入活动页设置</button>
    </div>
    <layer title="奖品列表" :isShow="dialogShow" v-if="sortAllAwards&&sortAllAwards.length" :data="sortAllAwards" @close="closeDialog" @confirm="confirm"></layer>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import { mainTypeData, questionsData } from './config'
  import { getCouponlist } from 'api/index'
  import Coupon from 'base/coupon/coupon'
  import Layer from 'base/layer/layer'
  import Scroll from 'base/scroll/scroll'
  
  export default {
    data () {
      return {
        mainTypeIn: '',
        questionsIn: [],
        awords: {
          hzDay: '',
          hzTime: '',
          selectIndex: -1,
          list: [
            {
              sort: -1,
              percent: '',
              coupon: null
            }
          ]
        },
        dialogShow: false,
        allAwards: []
      }
    },
    created() {
      if (this.$route.query.id) {
        this._backData()
      }
      this.mainTypeData = mainTypeData
      this.questionsData = questionsData
      this.setTabShow(false)
    },
    methods: {
      _backData () {
  
      },
      saveSet() {  // 保存所有的设置
        if (this.mainTypeIn) {
          this.setMainType(this.mainTypeIn)
        }
        if (this.questionsIn.length) {
          this.setQuestions(this.questionsIn)
        }
        if (this.awords.list.length && this.awords.list[0].coupon) {
          this.setAwards(this.awords)
        }
        this.$router.push({
          path: 'setTpl'
        })
      },
      checkAllInput() {   // 填写校验(待做)
        if (!this.mainTypeIn) {

        }
      },
      confirm(item) { // 响应子组件layer的事件
        if (this.awords.selectIndex === -1) {
          return
        }
        this.awords.list[this.awords.selectIndex].coupon = item
        this.dialogShow = false
        this.awords.selectIndex = -1
      },
      reSelect(item, index) { // 重新选择奖品
        this.dialogShow = true
        this.awords.selectIndex = index
        this._getCouponlist()
      },
      delCoupon(index) {  // 删除一个奖品项
        if (this.awords.list.length < 2) {
          return
        }
        this.awords.list.splice(index, 1)
      },
      addCoupon () {  // 增加一个奖品项
        let obj = {
          sort: -1,
          percent: ''
        }
        this.awords.list.push(obj)
      },
      showDialog(index) {
        this.dialogShow = true
        this.awords.selectIndex = index
        this._getCouponlist()
      },
      closeDialog() {
        this.dialogShow = false
      },
      _getCouponlist() {
        if (this.allAwards.length) {
          return
        }
        getCouponlist().then(res => {
          this.allAwards = res.data.items
        })
      },
      calcRaw(num) {
        num = num.toString()
        switch (num) {
          case '1':
            return '一'
          case '2':
            return '二'
          case '3':
            return '三'
          case '4':
            return '四'
          case '5':
            return '五'
        }
      },
      ...mapMutations({
        setTabShow: 'SET_TABSHOW',
        setMainType: 'SET_MAINTYPE',
        setQuestions: 'SET_QUESTIONS',
        setAwards: 'SET_AWARDS'
      })
    },
    computed: {
      ...mapGetters(['mainType']),
      sortAllAwards() {
        if (!this.allAwards.length) {
          return
        }
        if (this.awords.list.length === 1 && !this.awords.list[0].coupon) {
          return this.allAwards
        }
  
        let temp = this.allAwards.slice()
        let ids = temp.map((item, index) => {
          return item.couponId
        })
        this.awords.list.forEach((item) => {
          if (!item.coupon) {
            return
          }
          let index = ids.indexOf(item.coupon.couponId)
          if (index > -1) {
            temp.splice(index, 1)
          }
        })
        return temp
      }
    },
    components: {
      Coupon,
      Layer,
      Scroll
    }
  }
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box;
  .awrapper
    width: 1200px;
    margin: 0 auto 20px;
    background-color: #fff;
    padding: 40px;
  .g-wrapper
    padding-bottom: 68px;
    position: relative;
    &:after
      content: '';
      height: calc(100% - 22px);
      border-left: 1px dashed #dae7ff;
      position: absolute;
      left: 15px;
      top: 36px;
  .g-type-top
    margin-bottom: 28px;
    height: 30px;
    .sort
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background-color: #4587ff;
      border-radius: 50%; 
    .title
      font-size: 18px;
      line-height: 30px;
      color: #999;
  .g-type-checks
    overflow: hidden;
    padding-left: 40px;
    .input-item
      float: left
      width: 130px;
      input
        margin-right: 6px;
        vertical-align: middle;
      label
        line-height: 1
      .status
        color: #999;
  .hz
    padding-left: 40px;
    margin-bottom: 38px;
    input
      width: 80px;
      height: 30px;
      line-height: 30px;
      margin: 0 5px;
      padding: 0 10px;
      box-sizing: border-box;
      color: #666;
      background-color: #fff;
      border: 1px solid #e7e7e7;
  .title
      margin-bottom: 18px;
  .g-prize-wrapper
    padding-left: 40px;
  .g-prize-item
  .m-btn-md
    margin-bottom: 20px;
    margin-right: 20px;
    min-width: 80px;
    height: 30px;
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    cursor: pointer;
    background-color: #fff;
    &.btn-reselect
      background-color: #4587ff;
      border-color: #4587ff;
      color: #fff;
  .probability
    margin-bottom: 20px;
    .m-text-sm
      width: 60px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      color: #666;
      background-color: #fff;
      border: 1px solid #e7e7e7;
  .buttons
    margin-top: 20px;
  .addItem
    position: relative;
    button:after
      content: '';
      width: 1000px;
      height: 1px;
      position: absolute;
      background-color: #e2e2e2;
      left: 100px;
      top: 15px;
  .next
    padding-left: 40px;
    position: relative;
    .dot
      position: absolute;
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #dae7ff;
      left: 30px;
      top: 12px;
      &:before
        content: '';
        width: 14px;
        border-top: 1px dashed #dae7ff;
        position: absolute;
        left: -14px;
        top: 3px;
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
