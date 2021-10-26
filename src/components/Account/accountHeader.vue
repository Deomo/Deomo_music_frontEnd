<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop='back'></div> <!--阻止冒泡，触发主题变更-->
    <ul slot="center" class="header-title">
      <li :class='{"active": selectLi === 0}' @click.stop="select(0)">我喜欢的</li>
      <li :class='{"active": selectLi === 1}' @click.stop="select(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </Header>
</template>
<script>
import Header from '../Header'
export default {
  name: 'accountHeader',
  components: {
    Header
  },
  data () {
    return {
      selectLi: 0
    }
  },
  methods: {
    back () {
      window.history.back()
    },
    select (num) {
      this.selectLi = num
      this.$emit('select', num)// 将标记传给父组件
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
    display:flex;
    justify-content: center;
    align-items: center;
    border: #fff 1px solid;
    // padding: 0 20px;
    line-height: 60px;
    margin: 20px 0;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
    li{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1){
        border-right: #fff 1px solid;
      }
      &.active{
        background: rgba(255,255,255,0.3);
      }
    }
  }
}
</style>
