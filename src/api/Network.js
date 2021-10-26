import axios from 'axios'
import Vue from 'vue'
// 进行一些全局配置
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 5000

// 添加请求拦截器-正在加载
let count = 0
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 记录请求的个数
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 封装自己的方法
export default {
  get: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(path, {
          params: data
        })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // 获取多个数据
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}