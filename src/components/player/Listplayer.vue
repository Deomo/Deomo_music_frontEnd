<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class='listplayer' v-show='this.isShowListPlayer'>
        <div class="listplayer-wrapper">
            <div class="top">
                <div class="left">
                    <div class="mode loop" @click.stop='changeMode' ref='mode'></div>
                    <h3 v-if="this.isModeType === 0">顺序播放</h3>
                    <!-- v-if里面是判断语句 -->
                    <h3 v-else-if="this.isModeType === 1">单曲循环</h3>
                    <h3 v-else>随机播放</h3>
                </div>
                <div class="right" @click='delAll(-1)'></div>
            </div>
            <div class="mid">
              <scroll-view>
              <ul  ref='playState'>
                <li class='item' v-for='(value, index) in songList' :key='value.id' @click='playMusic(index)'>
                    <div class="left">
                        <div
                        class="play"
                        @click.stop='playState'
                        v-if="value.id === currentSong.id"
                        ></div>
                        <h3>{{value.name}}</h3>
                    </div>
                    <div class="right">
                        <div class="faivor" @click.stop='favorite(value)' :class='{"active": isFavorite(value)}'></div>
                        <div class="close" @click.stop='del(index)'></div>
                    </div>
                </li>
            </ul>
              </scroll-view>
            </div>
            <div class="bottom" @click.stop = 'listHidden'>
                <p>关闭</p>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../scrollview.vue'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType.js'
export default {
  name: 'listplayer',
  data () {
    return {
      isShow: false
    }
  },
  components: {
    ScrollView
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'isModeType',
      'isShowListPlayer',
      'songList',
      'currentSong',
      'favoriteSong'
    ])
  },
  methods: {
    playMusic (index) {
      this.setCurrentSongIndex(index)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 300 }, function () {
        done()
      })
    },
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelListSing',
      'setCurrentSongIndex',
      'setFavoriteSong'
    ]),
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
    listHidden () {
      this.setListPlayer(false)
    },
    del (index) {
      this.setDelListSing(index)
    },
    delAll (a) {
      this.setDelListSing(a)
    },
    favorite (song) {
      this.setFavoriteSong(song)
    },
    isFavorite (currentSong) {
      return this.favoriteSong.find((currentValue) => {
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
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    }
    // 监听isShowListPlayer改变后重新渲染scroll视图
    // isShowListPlayer (newValue, oldValue) {
    //   if (newValue) {
    //     this.$refs.scroll.delayReFresh()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
@import '../../assets/css/variable.scss';
.listplayer{
    width: 100%;
    position: fixed;
    height: 900px;
    left: 0;
    bottom: 0;
    @include bg_sub_color();
    .top{
        display: flex;
        justify-content: space-between;
        height: 100px;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            padding-left: 20px;
            .mode{
                width: 54px;
                height: 54px;
                margin-right: 20px;
                &.loop{
                  @include bg_img('../../assets/images/small_loop')
                }
                &.one{
                  @include bg_img('../../assets/images/small_one')
                }
                &.random{
                  @include bg_img('../../assets/images/small_shuffle')
                }
            }
            h3{
                @include font_color();
                @include font_size($font_samll)
            }
        }
        .right{
            width: 84px;
            height: 84px;
            @include bg_img('../../assets/images/small_del')
        }
    }
    .mid{
      height: 700px;
      overflow: hidden;
      ul{
        &.active{
        .item{
          .play{
            @include bg_img('../../assets/images/small_pause')
          }
        }
      }
      }
      .item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100px;
            .left{
                display: flex;
                align-items: center;
                .play{
                    width: 51px;
                    height: 51px;
                    margin-left: 20px;
                    @include bg_img('../../assets/images/small_play');
                }
                h3{
                    display: block;
                    width: 500px;
                    padding-left: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    @include font_color();
                    @include font_size($font_samll)
                }
            }
            .right{
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding-right: 20px;
                .faivor{
                    width: 60px;
                    height: 60px;
                    @include bg_img('../../assets/images/small_un_favorite');
                    &.active {
                      @include bg_img('../../assets/images/small_favorite');
                    }
                }
                .close{
                    width: 54px;
                    height: 54px;
                    margin-left: 15px;
                    @include bg_img('../../assets/images/small_close')
                }
            }
      }
    }
    .bottom{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bg_color($background-color-theme);
        p{
            color: #fff;
            @include font_size($font_medium)
        }
    }
}
</style>
