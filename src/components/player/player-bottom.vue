<template>
  <div class="bottom">
    <div class='bottom-progress'>
      <span ref='eleCurrentTime'>00:00</span>
      <div class="progress-bar" @click.stop='progressClick' ref='progressBar'>
          <div class="progress-line" ref="progressLine">
              <div class="progress-dot"></div>
      </div>
      </div>
      <span ref="eleTotalTime">99:99</span>
    </div>
    <div class="bottom-controll">
        <span class="mode loop" @click.stop='changeMode' ref='mode'></span>
        <span class="prev" @click='prev'></span>
        <span class="play" @click.stop='playState' ref='playState'></span>
        <span class="next" @click='next'></span>
        <span class="favo" @click='favorite' :class='{"active": isFavorite(this.currentSong) }'></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// 导入歌曲播放模式模块
import modeType from '../../store/modeType.js'
import { formartTime } from '../tools/tools.js'
export default {
  name: 'payerBottom',
  props: [ 'totalTime', 'currentTime' ],
  computed: {
    ...mapGetters([
      'isPlaying',
      'isModeType',
      'currentSongIndex',
      'currentSong',
      'favoriteSong'
    ])
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentSongIndex',
      'setCurTime',
      'setFavoriteSong'
    ]),
    // 点击进度条
    progressClick (e) {
      // 1、获取鼠标横坐标
      let eventLeft = e.pageX
      // 2、获取进度条左边框到浏览器的距离
      // let progressLeft = e.target.offsetLeft
      let progressLeft = this.$refs.progressBar.offsetLeft
      // 鼠标距离与进度条距离的差值
      let clickLeft = eventLeft - progressLeft
      // 3、获取进度条宽度
      // let progressWidth = e.target.offsetWidth
      let progressWidth = this.$refs.progressBar.offsetWidth
      let value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'
      // 4、同步当前播放时间
      this.setCurTime(value * this.totalTime)
    },
    prev () {
      this.setCurrentSongIndex(this.currentSongIndex - 1)
    },
    next () {
      this.setCurrentSongIndex(this.currentSongIndex + 1)
    },
    playState () {
      this.setIsPlaying(!this.isPlaying)
    },
    changeMode () {
      if (this.isModeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.isModeType === modeType.one) {
        this.setModeType(modeType.random)
      } else {
        this.setModeType(modeType.loop)
      }
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (currentSong) {
      return this.favoriteSong.find((currentValue) => {
        // 直接判断整个对象，存储localstorage时地址会发生改变，但id不会变
        return currentValue.id === currentSong.id
      })
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.playState.classList.add('active')
      } else {
        this.$refs.playState.classList.remove('active')
      }
    },
    isModeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      let time = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 1、格式化当前播放时间
      let currentTime = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = currentTime.minute + ':' + currentTime.second
      // 2、设置进度条宽度
      let value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.bottom{
    margin: 0 auto 20px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 25px;
    .bottom-progress{
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        align-items: center;
        color: #fff;
        @include font_size($font_samll);
        .progress-bar{
            margin: 0 20px;
            width: 90%;
            // margin: 5px 0px;
            height: 10px;
            border-radius: 5px;
            background: #fff;
            .progress-line{
                width: 0;
                background: gray;
                height: 100%;
                border-radius: 5px;
                position: relative;
                .progress-dot{
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #fff;
                  position: absolute;
                  top: 50%;
                  left: 100%;
                  transform: translate(-50%, -50%);
                }
            }
        }
    }
    .bottom-controll{
        width: 80%;
        padding: 10px auto;
        margin: 20px auto;
        display: flex;
        justify-content: space-around;
        span{
            width: 84px;
            height: 84px;
        }
        .mode{
            &.loop{
                @include bg_img('../../assets/images/loop');
            }
            &.one{
                @include bg_img('../../assets/images/one');
            }
            &.random{
                @include bg_img('../../assets/images/shuffle');
            }
        }
        .prev{
            @include bg_img('../../assets/images/prev')
        }
        .play{
            @include bg_img('../../assets/images/play');
            &.active {
                @include bg_img('../../assets/images/pause');
            }
        }
        .next{
            @include bg_img('../../assets/images/next');
        }
        .favo{
            @include bg_img('../../assets/images/un_favorite');
            &.active {
              @include bg_img('../../assets/images/favorite');
            }
        }
    }
}
</style>
