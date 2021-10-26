<template>
  <div class='player'>
      <normal-player :totalTime = 'totalTime' :currentTime='currentTime'></normal-player>
      <mini-player></mini-player>
      <list-player ref = 'listplayer'></list-player>
      <audio :src="currentSong.musicUrl" ref='audio' @timeupdate='timeUpdate' @ended='end'></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/Miniplayer'
import ListPlayer from '../components/player/Listplayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { getRandomIntInclusive } from '../components/tools/tools.js'
export default {
  name: 'normalplayer',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  methods: {
    ...mapActions([
      'setCurrentSongIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeUpdate (e) {
      this.currentTime = e.target.currentTime
    },
    // 歌曲播放完成后，监听播放模式，决定下一首播放的内容
    end () {
      // 判断播放模式
      if (this.isModeType === mode.loop) {
        this.setCurrentSongIndex(this.currentSongIndex + 1)
      } else if (this.isModeType === mode.one) {
        this.$refs.audio.play()
      } else {
        this.setCurrentSongIndex(getRandomIntInclusive(0, this.songList.length - 1))
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentSongIndex',
      'curTime',
      'isModeType',
      'songList',
      'favoriteSong',
      'historySong'
    ])
  },
  watch: {
    isPlaying (value) {
      if (value === true) {
        setTimeout(() => {
          if (this.currentSong.musicUrl) {
            this.$refs.audio.play()
            // 添加进历史播放列表
            this.setHistorySong(this.currentSong)
          } else {
            console.log('歌曲资源不存在')
          }
        }, 1000)
      } else {
        this.$refs.audio.pause()
      }
    },
    curTime (newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.currentTime = newValue
      }
    },
    // 切换歌曲后，如果是播放状态，则播放新歌曲，监听index变化
    currentSongIndex () {
      // 切换歌曲时，改变时间
      this.totalTime = this.$refs.audio.duration
      // 注册一个新的事件，能播放时
      // oncanplay-ios中歌曲不会自动加载，所以不会执行，用ondurationchange事件（歌曲时长变化）
      this.$refs.audio.ondurationchange = () => {
        if (this.isPlaying) {
          this.$refs.audio.play()
          // 添加进历史播放列表
          this.setHistorySong(this.currentSong)
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    // 收藏歌曲发生变化时，本地存储，只能存储字符串
    favoriteSong (newValue, oldValue) {
      window.localStorage.setItem('favoriteSongs', JSON.stringify(newValue))
    },
    historySong (newValue, oldValue) {
      window.localStorage.setItem('historySongs', JSON.stringify(newValue))
    }
  },
  created () {
  // 同步localstorage中存储的歌曲列表
    let favoriteList = JSON.parse(window.localStorage.getItem('favoriteSongs'))
    if (favoriteList === null) {
      return
    }
    this.setFavoriteList(favoriteList)
    let historyList = JSON.parse(window.localStorage.getItem('historySongs'))
    if (historyList === null) {
      return
    }
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      setTimeout(() => {
        this.totalTime = this.$refs.audio.duration
      }, 300)
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
