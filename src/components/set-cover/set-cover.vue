<template> 
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {imgs} from './config'
  export default {
    data() {
      return {
        images: {
          title: '',
          background: '',
          banner: ''
        }
      }
    },
    created () {
      this._initCover()
    },
    methods: {
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
      }
    },
    computed: {
      ...mapGetters(['tpl', 'coverImgs'])
    }
  }
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box;
  .cover-wrapper
    width: 1200px;
    margin: 0 auto;
    padding: 50px 120px;
    overflow: hidden;
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
</style>
