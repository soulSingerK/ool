import Vue from 'vue'
import Router from 'vue-router'

const Indexs = (resolve) => {
  import('components/index/index').then((module) => {
    resolve(module)
  })
}

const Ay = (resolve) => {
  import('components/activity/activity').then((module) => {
    resolve(module)
  })
}

const Tpl = (resolve) => {
  import('components/set-tpl/set-tpl').then(module => {
    resolve(module)
  })
}

const detailSet = (resolve) => {
  import('components/detail-set/detail-set').then(module => {
    resolve(module)
  })
}

const setCover = resolve => {
  import('components/set-cover/set-cover').then(module => {
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
    },
    {
      path: '/ay',
      component: Ay
    },
    {
      path: '/setTpl',
      component: Tpl
    },
    {
      path: '/detailSet',
      component: detailSet,
      children: [{
        path: 'setcover',
        component: setCover
      }, {
        path: 'setusertype'
      }, {
        path: ''
      }]
    },
    {
      path: '/activity'
    },
    {
      path: '/shop'
    }
  ]
})
