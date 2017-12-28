<template>
  <div class="anmi">
    <div class="cover-wrapper">
      <preview-box :images="images" v-if="images&&rend.length" :data="rend" class="left"></preview-box>
      <div class="u-set-right">
        <p>您的售前小游戏已经创建成功！</p>
      </div>
    </div>
    
  </div>
</template>

<script>
  import previewBox from 'base/preview-box/preview-box'
  import selectSet from 'base/select-set/select-set'
  import uploadImg from 'base/upload-img/upload-img'
  import { setMixin } from 'common/js/set-minxin'
  import { mapGetters } from 'vuex'
  import {userData} from './data'
  export default {
    mixins: [setMixin],
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
        if (this.scene.length) {
          temp = this.scene.slice()
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
      ...mapGetters(['scene'])
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