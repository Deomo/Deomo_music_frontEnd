<template>
  <div class="header">
    <div class="header-left" @click.stop='hiddenNormalPlayer'></div> <!--阻止冒泡，触发主题变更-->
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singers}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Header',
  props: [ 'title' ],
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    setTheme () {
      this.index++
      if (this.index > this.themes.length - 1) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
    // hidden () {
    //   this.$store.dispatch('setFullScreen', false)
    // }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>
<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header {
  width: 100%;
  height: 100px;
  // background: $background-color-theme;
  // @include bg_color($background-color-theme);
  display: flex;
  justify-content: space-between;
  .header-left,.header-right {
    width: 84px;
    height: 84px;
    // background: #000;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../../assets/images/down')
  }
  .header-right{
    // @include bg_img('../../assets/images/more')
  }
  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    max-width: 550px;
    overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
    // font-size: 50px;
  }
}
</style>
