<template>
    <ul class='details-bottom'>
        <li class='list-title' @click.stop='playAll'>
            <div class="bottom-icon"></div>
            <div class="bottom-title">播放全部</div>
        </li>
        <div class="list">
            <li v-for='value in playlist' :key='value.id' class='item' @click.stop='ShowNormalPlayer(value.id)'>
            <div class="id">▶</div>
            <div class="song">
                <h3>{{value.name}}</h3>
                <p>{{value.al.name}} - {{value.ar[0].name}}</p>
            </div>
            </li>
        </div>
    </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'details-bottom',
  props: [ 'playlist' ],
  computed: {
    ...mapGetters([
      'songList'
    ])
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetails',
      'setCurrentLyrics',
      'setCurrentSongIndex',
      'setIsPlaying'
    ]),
    ShowNormalPlayer (id) {
      this.setMiniPlayer(false)
      this.setFullScreen(true)
      this.setSongDetails([id])
      this.setCurrentLyrics([id])
      this.setIsPlaying(true)
    //   this.$store.dispatch('setFullScreen', true)
    //   this.$store.dispatch('setMiniPlayer', false)
    },
    playAll () {
      let ids = this.playlist.map((item) => {
        return item.id
      })
      this.setFullScreen(true)
      this.setSongDetails([ids])
      this.setCurrentSongIndex(0)
      this.setIsPlaying(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';

.details-bottom{
    width: 100%;
    .list{
        width: 100%;
        @include bg_sub_color();
        min-height: 900px;
    }
    li{
        height: 100px;
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        // border-bottom: 2px solid;
        // @include border_color();
        @include bg_sub_color();
    }
    .list-title{
        display: flex;
        align-items: center;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        .bottom-icon{
            width: 40px;
            height: 40px;
            margin-right: 30px;
            @include bg_img('../../assets/images/small_play')
        }
        .bottom-title{
            @include font_size($font_large);
            @include font_color()
        }
    }
    .item{
        display: flex;
        align-items: center;
        @include bg_sub_color();
        // height: 500px;
        .song{
            h3{
                @include font_size($font_large);
                @include font_color()

            }
            p{
                @include font_size($font_samll);
                @include font_color()
            }
        }
        .id{
            width: 40px;
            height: 40px;
            padding: 10px;
        }
    }
}
</style>
