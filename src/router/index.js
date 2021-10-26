import Vue from 'vue'
import VueRouter from 'vue-router'
/* import默认会全部加载
import recommend from '../views/recommend.vue'
import rank from '../views/rank.vue'
import search from '../views/search.vue'
import singer from '../views/singer.vue' */
// router实现vue组件按需加载
const recommend = (resolve) => {
  import('../views/recommend.vue').then((module) => {
    resolve(module)
  })
}
// 歌单详情
const detail = (resolve) => {
  import('../views/details.vue').then((module) => {
    resolve(module)
  })
}
//  排行
const rank = (resolve) => {
  import('../views/rank.vue').then((module) => {
    resolve(module)
  })
}
const search = (resolve) => {
  import('../views/search.vue').then((module) => {
    resolve(module)
  })
}
const singer = (resolve) => {
  import('../views/singer.vue').then((module) => {
    resolve(module)
  })
}

const account = (resolve) => {
  import('../views/account.vue').then((module) => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: detail
      }
    ]
  },
  { path: '/rank',
    component: rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: detail
      }
    ]
  },
  { path: '/search', component: search },
  { path: '/singer',
    component: singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: detail
      }
    ]
  },
  { path: '/account', component: account }
]

const router = new VueRouter({
  /*
  注意点: 如果Router中使用的是history模式, 那么打包之后的项目不能刷新, 刷新就会出现404
  解决方案: 1.Router这两个不要使用history模式, 使用hash模式
            2.在服务端上面进行一些额外的配置
  * */
  // 注意点: 如果需要使用预渲染的插件, 那么Router的模式必须是history模式
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
