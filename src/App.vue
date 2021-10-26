<template>
  <div id="app">
    <MainHead></MainHead>
    <Tabbar></Tabbar>
    <keep-alive include="singer, search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import MainHead from './components/MainHead'
import Tabbar from './components/Tabbar'
import Player from './views/player'
export default {
  name: 'App',
  components: {
    MainHead,
    Tabbar,
    Player
  }
}
</script>
<style scoped lang="scss">
</style>
