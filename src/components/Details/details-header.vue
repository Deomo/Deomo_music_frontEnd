<template>
  <Header class="header">
    <div slot='left' class="header-left" @click.stop='back'></div> <!--阻止冒泡，触发主题变更-->
    <p slot='center' class="header-title">{{ title }}</p>
    <div slot='right' class="header-right"></div>
  </Header>
</template>
<script>
import { mapActions } from 'vuex'
import Header from '../Header'
export default {
  name: 'DeHeader',
  components: {
    Header
  },
  props: [ 'title' ],
  methods: {
    ...mapActions([
      'setListPlayer'
    ]),
    back () {
      window.history.back()
      this.setListPlayer(false)
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header {
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium)
  }
}
</style>
