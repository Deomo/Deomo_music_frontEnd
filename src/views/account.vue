<template>
  <transition>
    <div class="account">
      <!-- 当header切换时，将标记传给父组件，父组件再传入给bottom组件，bottom根据不同标记传入相应的列表（收藏/历史） -->
      <account-header @select='selectNum'></account-header>
      <account-bottom :select='select'></account-bottom>
    </div>
  </transition>
</template>

<script>
import accountHeader from '../components/Account/accountHeader.vue'
import accountBottom from '../components/Account/accountBottom.vue'

export default {
  name: 'account',
  components: {
    accountHeader,
    accountBottom
  },
  data () {
    return {
      select: 0
    }
  },
  methods: {
    selectNum (num) {
      this.select = num
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
.account {
    @include bg_sub_color();
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.v-enter, .v-leave-to{
  transform: translateX(100%);
}
.v-enter-to, .v-leave{
  transform: translateX(0%);
}
.v-enter-active{
  transition: 0.6s ease-in;
}
.v-leave-active{
  transition: 0.3s ease-out;
}
</style>
