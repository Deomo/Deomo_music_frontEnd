import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload' // 图片懒加载
import Loading from './plugin/loading/index'
fastclick.attach(document.body)

Vue.use(Loading, {
  // 设置加载前的占位图
  title: '正在加载...'
})

Vue.use(VueLazyload, {
  // 设置加载前的占位图
  loading: require('./assets/images/loading.png')
})
Vue.config.productionTip = false
// const vconsole = new VConsole()
// Vue.use(vconsole)
new Vue({
  router,
  store,
  VueLazyload,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
