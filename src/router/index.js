import Vue from 'vue'
import Router from 'vue-router'

const Indexs = (resolve) => {
  import('components/index/index').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Indexs
    }
  ]
})
