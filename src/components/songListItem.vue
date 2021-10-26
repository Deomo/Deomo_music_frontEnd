<template>
    <div class="song-list">
        <li class="item"
            v-for="value in newsong"
            :key="value.id"
            @click.stop = 'selectMusic(value.id)'>
            <!-- <img :src="value.picUrl" :alt="value.name"> -->
            <!-- 图片懒加载 -->
            <img v-lazy="value.picUrl" :alt="value.name">
            <div>
                <h3>{{value.name}}</h3>
                <p>{{value.singers}}</p>
            </div>
        </li>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'songListItem',
  props: ['newsong'],
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetails',
      'setCurrentLyrics',
      'setIsPlaying'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetails([id])
      this.setCurrentLyrics([id])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
.song-list{
        width: 100%;
        .item{
            height: 200px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            border-bottom: 2px solid #fff;
            img{
                height: 150px;
                width: 150px;
                border-radius: 20px;
                margin-right: 20px;
            }
            div{
                width: 70%;
                @include font_color();
                h3{
                    @include font_size($font_large * 1.3);
                    @include no-wrap()
                }
                p{
                    @include font_size($font_medium);
                    margin-top: 10px;
                    @include no-wrap()
                }
            }
        }
    }
</style>
