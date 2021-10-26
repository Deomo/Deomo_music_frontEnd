<template>
  <div class="recommend">
    <div class="wrapper">
      <Scroll>
      <div>
        <Banner :banners = 'banners'></Banner>
        <!-- 推荐歌单 -->
        <Personalized
        :personalized='personalized'
        title='推荐歌单'
        @showDetials='showDetial'
        type='personalized'
        ></Personalized>
        <!-- 组件复用 最新专辑-->
        <Personalized
        :personalized='album'
        title='最新专辑'
        @showDetials='showDetial'
        type='album'
        ></Personalized>
        <song-list :newsong='newsong'></song-list>
      </div>
    </Scroll>
    </div>
    <!-- 指定详情页路由出口 + 自定义过度动画-->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// 获取接口
import { getBanner, getPersonalized, getNewAlbum, getNewsong } from '../api/index'
// 获取组件
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import songList from '../components/Recommend/songList'
import Scroll from '../components/scrollview'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    songList,
    Scroll
  },
  data () {
    return {
      banners: [],
      personalized: [],
      album: [],
      newsong: []
    }
  },
  // 获取数据
  created () {
    // 获取banner
    getBanner()
      .then((data) => {
        // 接收传递回来的banners并写入data
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
      // 获取推荐歌单
    getPersonalized()
      .then((data) => {
        this.personalized = data.result.splice(0, 3)
      })
      .catch(function (err) {
        console.log(err)
      })
      // 获取最新专辑
    getNewAlbum()
      .then((data) => {
        this.album = data.albums.splice(0, 3)
      })
      .catch(function (err) {
        console.log(err)
      })
    // 获取新歌推荐
    getNewsong()
      .then((data) => {
        // console.log(data.result.splice(0, 3))
        // this.newsong = data.result
        let songs = data.result
        let list = []
        for (let item of songs) {
          let obj = {}
          obj.id = item.id
          obj.name = item.name
          obj.picUrl = item['song'].album.blurPicUrl
          let singers = ''
          for (let i = 0; i < item['song'].album.artists.length; i++) {
            if (item['song'].album.artists.length === 1) {
              singers = item['song'].album.artists[0].name
            } else {
              singers += '-' + item['song'].album.artists[i].name
            }
          }
          obj.singers = singers
          list.push(obj)
        }
        this.newsong = list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    showDetial (id, type) {
      // 编程法设置路由地址
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.recommend{
  position: fixed;
  top: 184px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  height: 100%;
  // overflow: hidden;
  .wrapper{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
.v-enter, .v-leave-to{
  // transform: translateX(100%);
  transform: translateX(100%);
}
.v-enter-to, .v-leave{
  // transform: translateX(0%);
  transform: translateX(0%);
}
.v-enter-active{
  transition: 0.6s ease-in;
}
.v-leave-active{
  transition: 0.3s ease-out;
}
</style>
