<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd-warpper">
        <div class="cd" ref='cdSport'>
            <img :src="currentSong.picUrl" alt="">
        </div>
        <p>{{getFristLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref='lyric'>
      <Scroll ref='scroll'>
        <ul>
          <li v-for="(value, key) in currentLyrics" :key='key' :class="{ 'active' : currentLineNum === key }">{{value}}</li>
        </ul>
      </Scroll>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Scroll from '../../components/scrollview'
import { mapGetters } from 'vuex'
export default {
  name: 'palyerMiddle',
  props: [ 'currentTime' ],
  components: {
    swiper,
    swiperSlide,
    Scroll
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'player-bullet',
          bulletActiveClass: 'player-bullet-active'
        },
        // 网络获取资源需设置
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      // 当前高亮的歌词行数
      currentLineNum: ''
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyrics'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue === true) {
        this.$refs.cdSport.classList.add('active')
      } else {
        this.$refs.cdSport.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      // // 1、歌词高亮
      // let lineNumber = Math.floor(newValue)
      // // 获取歌词滚动区域的高度
      // let lyricHeight = this.$refs.lyric.$el.offsetHeight
      // // 通过当前时间去取歌词，若有歌词，则执行
      // let result = this.currentLyrics[lineNumber]
      // if (result !== undefined && this.currenresult !== '') {
      //   this.lyricsTime = lineNumber + ''
      //   // 2、歌词滚动 高亮歌词达到容易高度一半时滚动一行歌词的距离
      //   let activeLyric = document.querySelector('li.active')
      //   if (activeLyric) {
      //     let lyricTop = activeLyric.offsetTop
      //     if (lyricTop > lyricHeight / 2) {
      //       let scrollHeight = lyricHeight / 2 - lyricTop
      //       this.$refs.scroll.scrollTo(0, scrollHeight, 100)
      //     }
      //   }
      // }
      //  递归方式优化代码，使没有对应歌词时，高亮显示上一行
      let lineNumber = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLyrics(lineNumber)
      // 2、歌词滚动 高亮歌词达到容易高度一半时滚动一行歌词的距离
      let lyricHeight = this.$refs.lyric.$el.offsetHeight
      let activeLyric = document.querySelector('li.active')
      if (activeLyric) {
        let lyricTop = activeLyric.offsetTop
        if (lyricTop > lyricHeight / 2) {
          let scrollHeight = lyricHeight / 2 - lyricTop
          this.$refs.scroll.scrollTo(0, scrollHeight, 100)
        } else {
          this.$refs.scroll.scrollTo(0, 0, 100)
        }
      }
    },
    // 取出第一句歌词所在的函数
    currentLyrics (newValue, oldValue) {
      for (let key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  methods: {
    getFristLyric () {
      for (let key in this.currentLyrics) {
        return this.currentLyrics[key]
      }
    },
    // 歌词与时间没有对应行时，利用递归显示上一行
    getActiveLyrics (lineNumber) {
      if (lineNumber < 0) {
        return this.currentLineNum
      }
      let result = this.currentLyrics[lineNumber + '']
      if (result === undefined || this.currenresult === '') {
        lineNumber--
        return this.getActiveLyrics(lineNumber)
      } else {
        return lineNumber + ''
      }
    }
  }
  // currentLyrics (newValue, oldValue) {
  //   if(newValue) {
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.banner{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  width: 100%;
  .cd-warpper{
    .cd{
      display: block;
      width: 500px;
      height: 500px;
      border: 20px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      margin: 30px auto;
      animation: sport 6s linear infinite;
      animation-play-state: paused;
      &.active{
      animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  p{
    max-width: 600px;
    margin: 40px auto;
    text-align: center;
    @include font_size($font_medium);
    color: #fff;
  }
  .lyric{
    width: 100%;
    height: 90%;
    overflow: hidden;
    // height: 800px;
    ul{
      width: 80%;
      margin: 0 auto;
      padding-bottom: 50%;
      li{
      text-align: center;
      color: gray;
      @include font_size($font_medium);
      margin: 10px 0;
        &:last-of-type{
          padding-bottom: 50px;
        }
      &.active{
        color:#fff;
        @include font_size($font_large);
      }
      }
    }
  }
}
@keyframes sport {
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
}
</style>
<style lang="scss">
// 分页器需要设置全局样式
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.player-bullet{
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    display: inline-block;
    margin: 0 20px;
}
.player-bullet-active{
    width: 60px;
    @include bg_color($background-color-theme);
}
</style>
