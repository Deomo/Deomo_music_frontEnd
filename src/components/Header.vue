<template>
  <div class="header" @click="setTheme">
    <!-- <div class="header-left"></div>
    <p class="header-title">deomo音乐</p>
    <div class="header-right" @click.stop="account"></div> -->
     <div class="left">
       <slot name="left">左边</slot>
     </div>
    <slot name="center">中间</slot>
    <div class="right">
      <slot name='right'>右边</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
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
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/css/variable';
@import '../assets/css/mixin';
.header {
  z-index: 999;
  width: 100%;
  height: 100px;
  @include bg_color($background-color-theme);
  display: flex;
  justify-content: space-between;
  .left,.right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    *{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
