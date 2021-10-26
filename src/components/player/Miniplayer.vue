<template>
  <transition
    :css = 'false'
    @enter = 'enter'
    @leave = 'leave'
  >
    <div class = 'miniplayer' v-show ='this.isShowMiniPlayer'>
        <div class="mini-left" @click.stop = 'showNormalPlayer'>
            <img :src="currentSong.picUrl" alt="cdCover" ref='cdSport'>
            <div class="singer">
                <h3>{{currentSong.name}}</h3>
                <p>{{currentSong.singers}}</p>
            </div>
        </div>
        <div class="mini-right">
            <div class="play"  @click.stop='playState' ref='playState'></div>
            <div class="list" @click.stop = 'showListPlayer'></div>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'miniplayer',
  methods: {
    ...mapActions([
      'setMiniPlayer',
      'setListPlayer',
      'setFullScreen',
      'setIsPlaying'
    ]),
    playState () {
      this.setIsPlaying(!this.isPlaying)
    },
    showNormalPlayer () {
      this.setMiniPlayer(false)
      this.setFullScreen(true)
    },
    showListPlayer () {
      this.setListPlayer(true)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 300 }, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'isShowListPlayer',
      'currentSong'
    ])
  },
  // 监听isPlaying值的变化，并添加类名
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue === true) {
        this.$refs.playState.classList.add('active')
        this.$refs.cdSport.classList.add('active')
      } else {
        this.$refs.playState.classList.remove('active')
        this.$refs.cdSport.classList.remove('active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.miniplayer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 110px;
    display: inline-block;
    padding: 15px 10px;
    @include bg_color($background-color-theme);
    .mini-left{
        display: flex;
        align-items: center;
        float: left;
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: auto 20px;
            animation: sport 6s linear infinite;
            animation-play-state: paused;
            &.active{
            animation-play-state: running;
            }
        }
        .singer{
            color: white;
            align-items: center;
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            // text-align: center;
            h3{
                display: block;
                @include font_size($font_medium)
            }
            p{
                display: block;
                @include font_size($font_samll)
            }
        }
    }
    .mini-right{
        display: flex;
        align-items: center;
        float: right;
        padding: auto;
        .play{
            width: 85px;
            height: 85px;
            @include bg_img('../../assets/images/play');
            &.active{
              @include bg_img('../../assets/images/pause')
            }
        }
        .list{
            width: 100px;
            height: 100px;
            @include bg_img('../..//assets/images/list')
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
