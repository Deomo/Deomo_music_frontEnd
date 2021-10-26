<template>
    <div class='song'>
        <div class="song-top">
            <h3>新歌推荐</h3>
        </div>
    <song-list-item :newsong='newsong'></song-list-item>
    </div>
</template>

<script>
import songListItem from '../songListItem.vue'
export default {
  name: 'songList',
  props: ['newsong'],
  components: {
    songListItem
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.song{
    @include bg_sub_color();
    .song-top{
        widows: 100%;
        height: 50px;
        padding: 17px 0px;
        border-bottom: ghostwhite 2px solid;
        h3{
            display: block;
            line-height: 50px;
            padding: 0 30px;
            border-left: 6px solid;
            @include border_color();
            @include font_size($font_large);
            font-weight: bold;
            @include font_color()
        }
    }
}
</style>
