<template>
  <div class="router-wrapper">
    <ul>
      <li v-for="(route, index) in routes" :key="route.name" class="route-item" :class="[{'current': index + 1 === current}, {'ready': index+1<=visited}]">
        <span class="sort">{{index + 1}}</span>
        <span class="name">{{route.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        visited: 1
      }
    },
    watch: {
      current(newVal, oldVal) {
        if (newVal > this.visited) {
          this.visited = newVal
        }
      }
    },
    computed: {
      ...mapGetters(['current']),
      routes() {
        if (!this.data.length) {
          return
        }
        let routes = this.data.slice()
        routes.unshift('setCover')
        routes.push('success')
        return routes.map((item, index) => {
          let obj = {}
          switch (item) {
            case 'setCover':
              obj.name = 'setCover'
              obj.value = '封面设置'
              break
            case 'userType':
              obj.name = 'userType'
              obj.value = '用户群体设置'
              break
            case 'shopSort':
              obj.name = 'shopSort'
              obj.value = '用户购物类别设置'
              break
            case 'scene':
              obj.name = 'scene'
              obj.value = '用户使用场景设置'
              break
            case 'preference':
              obj.name = 'preference'
              obj.value = '用户风格偏好设置'
              break
            case 'success':
              obj.name = 'success'
              obj.value = '成功'
              break
          }
          return obj
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .router-wrapper
    height: 60px;
    padding: 0 10px;
    ul
      display: flex
      border-bottom: 1px solid #e7e7e7;
      padding-left: 30px;
      justify-content: center;
    .route-item
      height: 60px;
      padding-top: 18px;
      box-sizing: border-box;
      margin-left: 70px;
      position: relative;
      &.ready
        &:before
          border-color: #2b97ff;
        .sort
          background-color: #fff;
          color: #2b97ff;
          border: 1px solid #2b97ff;
        .name
          color: #2b97ff;
        &.current
          .sort
            background-color: #2b97ff;
            color: #fff;
      &:first-child
        margin-left: 0;
        &:before
          border: none;
      &:before
        content: '';
        width: 60px;
        border-top: 1px dashed #ccc;
        position: absolute;
        left: -65px;
        top: 30px;
      .sort
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center
        border-radius: 50%;
        background-color: #ccc;
        color: #fff;
      .name
        color: #ccc;
</style>
