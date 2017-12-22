<template>
  <div class="coupon-wrapper"> 
    <div class="m-prize-coupon" :class="{'select': !!isSelected}">
      <div class="coupon-box">
        <div class="coupon">
          <p class="money"><i>￥</i>{{data.denominations | moneyFilter}}</p>
          <p class="condition">订单金额满 {{data.condition | moneyFilter}} 元可使用</p>
          <p class="date">有效期{{data.startTime | dataFilter}}-{{data.endTime | dataFilter}}</p>
        </div>
      </div>
      <p class="m-prize-txt">店铺 {{data.denominations | moneyFilter}} 元优惠券</p>
      <div class="m-prize-count">
        <span>数量&nbsp;<span>{{data.total}}</span>张</span>
        <span>剩余&nbsp;<span>{{data.surplus}}</span>张</span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: null
      },
      isShow: {
        type: Boolean,
        default: false
      },
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
  
    },
    filters: {
      moneyFilter(val) {
        if (!val) {
          return 0
        }
        return val / 100
      },
      dataFilter(val) {
        if (!val) {
          return ''
        }
        return val.split(' ')[0]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .coupon-wrapper
    
    .m-prize-coupon
      width: 260px;
      height: auto;
      background-color: #fafafa;
      box-sizing: border-box;
      border: 1px solid #e7e7e7;
      &.select
        border: 1px solid #4587ff;
    .coupon-box
      padding: 9px;
      background-color: #ffe8ca;
    .coupon
      position: relative;
      width: 240px;
      height: 100px;
      box-sizing: border-box;
      padding: 12px 14px 14px;
      background-color: #8953cc;
      color: #fff;
      &:before
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 15px;
        height: 100px;
        background-image: radial-gradient(#ffe8ca 30%,rgba(0,0,0,0) 0%);
        background-size: 15px 12px;
        background-position: -6px 14px;
        background-repeat: repeat-y;
      &:after
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 15px;
        height: 100px;
        background-image: radial-gradient(#ffe8ca 30%,rgba(0,0,0,0) 0%);
        background-size: 15px 12px;
        background-position: 7px 14px;
        background-repeat: repeat-y;
      .money
        margin-bottom: 14px;
        font-size: 30px;
      .condition
        font-size: 12px;
        margin-bottom: 6px;
      .date
        font-size: 12px;
    .m-prize-txt
      padding-left: 8px;
      line-height: 20px;
      margin-top: 8px;
    .m-prize-count
      color: #999;
      font-size: 12px;
      padding-left: 8px;
      line-height: 20px;
      margin-bottom: 8px;
</style>
