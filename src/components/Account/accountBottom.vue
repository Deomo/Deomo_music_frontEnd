<template>
    <div class='account-bottom'>
        <div class="play-top" @click.stop='playAll'>
            <span></span>
            <span>播放全部</span>
        </div>
        <div class="play-wrapper">
            <Scroll>
                <song-list-item :newsong='selectNum === 0 ? favoriteSong : historySong'></song-list-item>
            </Scroll>
        </div>
    </div>
</template>

<script>
import Scroll from '../scrollview.vue'
import songListItem from '../songListItem.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'accountBottom',
  props: [ 'select' ],
  data () {
    return {
      selectNum: 0
    }
  },
  components: {
    Scroll,
    songListItem
  },
  computed: {
    ...mapGetters([
      'favoriteSong',
      'historySong'
    ])
  },
  watch: {
    select (newValue, oldValue) {
      this.selectNum = newValue
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetails',
      'setCurrentSongIndex',
      'setIsPlaying'
    ]),
    ...mapMutations([
      'SET_SONG_DETAILS'
    ]),
    playAll () {
    //   let ids = []
      if (this.selectNum === 0) {
        // ids = this.favoriteSong.map((item) => {
        //   return item.id
        // })
        // 直接调用mutations中的方法替换列表
        this.SET_SONG_DETAILS(this.favoriteSong)
      } else {
        // ids = this.historySong.map((item) => {
        //   return item.id
        // })
        this.SET_SONG_DETAILS(this.historySong)
      }
      this.setFullScreen(true)
      //   this.setSongDetails([ids]) 又通过ajax获取
      this.setCurrentSongIndex(0)
      this.setIsPlaying(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.account-bottom {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  .play-top{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      width: 250px;
      margin: 30px auto;
      border: 2px solid;
      @include border_color();
      border-radius: 40px;
      span{
          display: inline-block;
          &:nth-of-type(1){
              width: 46px;
              height: 46px;
              margin-right: 20px;
              @include bg_img('../../assets/images/small_play')
          }
      }
  }
  .play-wrapper{
      position: fixed;
      top: 240px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      overflow: hidden;
  }
}
</style>
