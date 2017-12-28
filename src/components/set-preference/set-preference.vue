<template>
  <div class="anmi">
    <div class="cover-wrapper">
      <preview-box :images="images" v-if="images&&rend.length" :data="rend" class="left"></preview-box>
      <div class="u-set-right">
        <select-set :data="rend" title='选择你的目标用户' v-if="rend.length"></select-set>
        <ul class="loads">
          <li v-for="(item, index) in rend" :key="index" class="item">
            <upload-img :data="item" @close="closeAll" @show="closeAll"></upload-img>
          </li>
        </ul>
      </div>
    </div>
    <set-footer :next-show="true" :last-show="true" @last="last" @next="setNext"></set-footer>
  </div>
</template>

<script>
  import previewBox from 'base/preview-box/preview-box'
  import selectSet from 'base/select-set/select-set'
  import uploadImg from 'base/upload-img/upload-img'
  import { setMixin, loadMixin } from 'common/js/set-minxin'
  import { mapGetters } from 'vuex'
  import {userData} from './data'
  export default {
    mixins: [setMixin, loadMixin],
    data() {
      return {
        rend: []
      }
    },
    created () {
      this._initData()
    },
    methods: {
      _initData () {
        let temp = []
        if (this.preference.length) {
          temp = this.preference.slice()
        } else {
          temp = userData.slice()
        }
        this.rend = temp.map((item, index) => {
          return Object.assign({}, item, {key: index + 1})
        })
      }
    },
    computed: {
      images () {
        if (!this.tpl) {
          return
        }
        let obj = {}
        obj.title = `/src/assets/tpl-${this.tpl}-uttitle.png`
        obj.btn = `/src/assets/tpl-${this.tpl}-nextstep.png`
        obj.background = `/src/assets/tpl-${this.tpl}-background.jpg`
        return obj
      },
      ...mapGetters(['preference'])
    },
    components: {
      previewBox,
      selectSet,
      uploadImg
    }
  }
</script>

<style lang="sass" scoped>
  .left
    float: left;
  .loads
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item
      margin-bottom: 20px;
</style>