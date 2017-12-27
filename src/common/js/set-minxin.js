import {mapGetters, mapMutations} from 'vuex'
import setFooter from 'components/set-footer/set-footer'
import Scroll from 'base/scroll/scroll'

export const setMixin = {
  computed: {
    ...mapGetters(['questions', 'tpl'])
  },
  methods: {
    last () {
      let path = this.$route.path.split('/set')[1]
      const index = this.questions.indexOf(path)
      if (index === 0) {
        this.$router.push({
          path: `/detailSet/setcover`
        })
        this.setCurrent(1)
      } else {
        this.$router.push({
          path: `/detailSet/set${this.questions[index - 1]}`
        })
        this.setCurrent(index + 1)
      }
    },
    ...mapMutations({
      setCurrent: 'SET_CURRENT'
    })
  },
  components: {
    setFooter,
    Scroll
  }
}

export const loadMixin = {
  methods: {
    closeAll(key) {
      this.rend.forEach((item, index) => {
        if (item.isShow) {
          item.isShow = false
        }
        if (key && item.key === key) {
          item.isShow = true
        }
      })
    }
  }
}