<template>
  <div class="detials">
    <sub-header :title="playlist.name"></sub-header>
    <details-top :imgPath="playlist.coverImgUrl" ref="bgImg"></details-top>
    <div class="bottom">
      <Scroll ref="scrollview">
        <details-bottom :playlist="playlist.tracks"></details-bottom>
      </Scroll>
    </div>
  </div>
</template>
<script>
import { getPlaylist, getAlbum, getArtists, getRanklist } from '../api/index'
import subHeader from '../components/Details/details-header'
import detailsTop from '../components/Details/details-top'
import detailsBottom from '../components/Details/details-bottom'
import Scroll from '../components/scrollview'
export default {
  name: 'detials',
  components: {
    subHeader,
    detailsTop,
    detailsBottom,
    Scroll
  },
  data () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlaylist(this.$route.params.id)
        .then((data) => {
          this.playlist = data.playlist
          // console.log(this.$route.params.id)
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum(this.$route.params.id)
        .then((data) => {
          // console.log(data.album)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtists(this.$route.params.id)
        .then((data) => {
          // console.log(data.album)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getRanklist(this.$route.params.id)
        .then((data) => {
          // console.log(data.album)
          this.playlist = {
            name: data.playlist.creator.name,
            coverImgUrl: data.playlist.coverImgUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    // 获取页面背景图片的高度,$el是指拿到组件的根元素
    let defaultHeight = this.$refs.bgImg.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        // console.log('向上滚动')
        /** 高斯模糊非常消耗性能，移动端中不建议使用，可在组件中设置蒙版 */
        // let scale = 15 * Math.abs(offsetY / defaultHeight)
        // this.$refs.bgImg.$refs.img.style.filter = `blur(${scale}px)`
        let scale = Math.abs(offsetY / defaultHeight)
        this.$refs.bgImg.$refs.mask.style.opacity = scale
      } else {
        let scale = 1 + offsetY / defaultHeight
        this.$refs.bgImg.$refs.img.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/mixin";
.detials {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  // background: #f00;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
}
</style>
