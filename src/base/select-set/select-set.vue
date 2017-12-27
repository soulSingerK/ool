<template>
  <div>
    <p class="title">{{title}}<span class="sub-title">（多选，最多添加9项）</span></p>
    <ul>
      <!-- 需完善 子组件直接修改props的值 -->
      <li v-for="(item, index) in data" :key="index" class="item">
        <input type="checkbox" v-model="item.checked">
        <span class="name">{{item.name}}</span>
        <span class="add"><span>+{{item.products.length ? `已添加${item.products.length}件推荐商品` : '添加推荐商品'}}</span></span>
        <span class="del">删除</span>
      </li>
    </ul>
    <div class="custom-add has-split">
      <button class="g-btn-md">自定义添加</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: null
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="sass" scoped>
  .sub-title
    color: #999;
  .item
    margin-top: 16px;
    input
      font-size: 12px;
      color: #666;
    .name
      display: inline-block;
      width: 100px;
    .add
      display: inline-block;
      width: 140px;
      color: #459ae9;
      span 
        cursor: pointer;
        &:hover
          text-decoration: underline;
    .del
      color: #459ae9;
      cursor: pointer;
      &:hover
          text-decoration: underline;
  .custom-add
    margin-top: 20px;
    position: relative;
    &.has-split:after
      content: '';
      width: 350px;
      height: 1px;
      background-color: #e2e2e2;
      position: absolute;
      left: 120px;
      top: 15px;
</style>
