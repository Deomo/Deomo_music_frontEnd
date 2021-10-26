<template>
    <!-- <div class='normal-player' v-show='this.$store.getters.isFullScreen'> -->
    <transition
      :css = 'false'
      @enter = 'enter'
      @leave = 'leave'
    >
      <div class='normal-player' v-show='this.isFullScreen'>
        <div class="player-wrapper">
            <Palyer-header></Palyer-header>
            <Palyer-middle :currentTime='currentTime'></Palyer-middle>
            <PalyerBottom :totalTime = 'totalTime' :currentTime='currentTime'></PalyerBottom>
        </div>
        <div class="bgimg">
            <img :src="currentSong.picUrl" alt="">
            <div class="mask"></div>
        </div>
      </div>
    </transition>
</template>

<script>
import PalyerHeader from './palyer-header'
import PalyerMiddle from './player-middle'
import PalyerBottom from './player-bottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'Normalplayer',
  props: [ 'totalTime', 'currentTime' ],
  components: {
    PalyerHeader,
    PalyerMiddle,
    PalyerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 300 }, function () {
        done()
      })
    },
    ...mapActions([
      'setCurrentLyrics'
    ])
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return null
      }
      this.setCurrentLyrics(newValue.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.normal-player{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include bg_sub_color();
    .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
    }
    .bgimg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        filter: blur(10px);
    }
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.8;
    }
}
</style>
