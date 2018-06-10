import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => Promise.resolve(require('@/pages/home_index.vue'))
    },
    {
      path: '/house_detail',
      name:'house_detail',
      component: () => Promise.resolve(require('@/pages/house_detail.vue'))
    },
    {
      path: '/newhouse_detail',
      name:'newhouse_detail',
      component: () => Promise.resolve(require('@/pages/newhouse_detail.vue'))
    },
    {
      path: '/secondhouse_detail',
      name:'secondhouse_detail',
      component: () => Promise.resolve(require('@/pages/secondhouse_detail.vue'))
    },
    {
      path: '/kangaroos_detail',
      name:'kangaroos_detail',
      component: () => Promise.resolve(require('@/pages/kangaroos_detail.vue'))
      
    },
    {
      path: '/login',
      name:'login',
      component: () => Promise.resolve(require('@/pages/login.vue'))
    },
    {
      path: '/guanyu',
      name:'guanyu',
      component: () => Promise.resolve(require('@/pages/guanyu.vue'))
    },
    {
      path: '/zixun',
      name:'zixun',
      component: () => Promise.resolve(require('@/pages/zixun.vue'))
    },
    {
      path: '/xinwen',
      name:'xinwen',
      component: () => Promise.resolve(require('@/pages/xinwen.vue'))
    },
    {
      path: '/new_index',
      name:'new_index',
      component: () => Promise.resolve(require('@/pages/new_index.vue'))
    },
    {
      path: '/secondHand',
      name:'secondHand',
      component: () => Promise.resolve(require('@/pages/secondHand.vue'))
    },
    {
      path: '/doorType',
      name:'doorType',
      component: () => Promise.resolve(require('@/pages/doorType.vue'))
    },
    {
      path: '/kangaroos',
      name:'kangaroos',
      component: () => Promise.resolve(require('@/pages/kangaroos.vue'))
    },
    {
      path: '/gerenzx',
      name:'gerenzx',
      component: () => Promise.resolve(require('@/pages/gerenzx.vue'))
    },
    {
      path: '/preference',
      name:'preIndex',
      component: () => Promise.resolve(require('@/pages/preference.vue'))
    },
    {
      path: '*',
      name:'notfound',
      component: () => Promise.resolve(require('@/pages/404.vue'))
    }
  ]
})
