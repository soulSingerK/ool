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
    <set-footer :next-show="true" :last-show="true" @last="last" @next="next"></set-footer>
  </div>
</template>

<script>
  import previewBox from 'base/preview-box/preview-box'
  import selectSet from 'base/select-set/select-set'
  import uploadImg from 'base/upload-img/upload-img'
  import { setMixin, loadMixin } from 'common/js/set-minxin'
  import { userData } from './config'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [setMixin, loadMixin],
    data() {
      return {
        rend: []
      }
    },
    created() {
      this._initData()
    },
    methods: {
      _initData () {
        let temp = []
        if (this.userType.length) {
          temp = this.userType.slice()
        } else {
          temp = userData.slice()
        }
        this.rend = temp.map((item, index) => {
          return Object.assign({}, item, {isShow: false, key: index + 1})
        })
      },
      next () {
        const path = this.$route.path.split('/set')[1]
        const index = this.questions.indexOf(path)
        this.setCurrent(index + 3)
        if (index !== this.questions.length - 1) {
          this.$router.push({
            path: `/detailSet/set${this.questions[index + 1]}`
          })
        } else {
          this.$router.push({
            path: `detailSet/setsuccess`
          })
        }
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
      ...mapGetters(['userType'])
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
