<template>
  <scroll class="anmi">
    <div class="cover-wrapper">
      <div class="u-set-left">
        <div class="m-cover-preview">
            <img  class="phone-title" src="/src/assets/phone-title.jpg" alt="" />
            <div class="preview-box" :style="{ backgroundImage: 'url(' + images.background + ')'}">
              <img class="title" width="100%" :src="images.title" alt="" />
              <img class="banner" width="100%" :src="images.banner" alt=""/>
              <img class="btn" :src="`/src/assets/tpl-${tpl}-btn.png`" alt="" />
            </div>
        </div>
      </div>
      <div class="u-set-right">
        <p class="name">活动名称</p>
        <input type="text" v-model="actName" class="input">
        <ul class="loads">
          <li v-for="(item,index) in uploadImgs" :key="index" class="item">
            <upload-img :data="item" @show="showUpload" @close="_closeAll"></upload-img>  
          </li>
        </ul>
      </div>
      
    </div>
    <set-footer :next-show="true" :last-show="false" @next="next"></set-footer>
  </scroll>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {imgs} from './config'
  import uploadImg from 'base/upload-img/upload-img'
  import {setMixin} from 'common/js/set-minxin'
  export default {
    mixins: [setMixin],
    data() {
      return {
        images: {
          title: '',
          background: '',
          banner: ''
        },
        imgShow: {
          title: false,
          background: false,
          banner: false
        },
        actName: '',
        now: -1
      }
    },
    created () {
      this._initCover()
    },
    methods: {
      next () {
        if (this.actName) {
          this.setActName(this.actName)
        }
        this.setCoverImg(this.images)
        this.$router.push({
          path: `/detailSet/set${this.questions[0]}`
        })
        this.setCurrent(2)
      },
      showUpload (key) {
        this._closeAll()
        this.imgShow[key] = !this.imgShow[key]
      },
      _closeAll () {
        for (let key in this.imgShow) {
          this.imgShow[key] = false
        }
      },
      _initCover() {
        if (this.coverImgs && this.coverImgs.length) {
          this.images = this.coverImgs.slice()
        } else {
          if (this.tpl) {
            let img = imgs[this.tpl]
            this.images.title = img.title.src
            this.images.background = img.background.src
            this.images.banner = img.banner.src
          }
        }
      },
      ...mapMutations({
        setActName: 'SET_ACTNAME',
        setCoverImg: 'SET_COVERIMG'
      })
    },
    computed: {
      uploadImgs() {
        let ret = [
          {
            name: '活动标题',
            src: this.images.title,
            key: 'title',
            size: '735×194px',
            isShow: this.imgShow.title
          }, {
            name: '背景图',
            src: this.images.background,
            key: 'background',
            size: '750×1206px',
            isShow: this.imgShow.background
          }, {
            name: '活动图',
            src: this.images.banner,
            key: 'banner',
            size: '689×728px',
            isShow: this.imgShow.banner
          }
        ]
        return ret
      },
      ...mapGetters(['tpl', 'coverImgs'])
    },
    components: {
      uploadImg
    }
  }
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box;
  .u-set-left 
    float: left;
    width: 375px;
    box-sizing: border-box;
    margin-right: 54px;
  .m-cover-preview
    width: 375px;
    margin-bottom: 22px;
    border: 1px solid #e7e7e7;
    .phone-title
      display: block;
      width: 100%;
      height: 64px;
    .preview-box
      min-height: 603px;
      background-size: cover;
  .btn
    width: 140px;
    margin-left: 115px;
    margin-top: 20px;
  .name
    margin-bottom: 6px;
  .input
    width: 260px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #666;
    background-color: #fff;
    border: 1px solid #e7e7e7;
  .loads
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
</style>
