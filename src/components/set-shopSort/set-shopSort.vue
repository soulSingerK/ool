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
  import { mapGetters } from 'vuex'
  export default {
    mixins: [setMixin, loadMixin],
    data() {
      return {
        rend: []
      }
    },
    created () {
      console.log(1111)
    },
    computed: {
      ...mapGetters(['shopSort'])
    },
    components: {
      previewBox,
      selectSet,
      uploadImg
    }
  }
</script>

<style lang="sass" scoped>

</style>
