<template>
    <div class='details-top'>
      <div class="img-container">
        <img :src='imgPath' alt="" ref='img'>
        <div class="mask" ref='mask'></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'details-top',
  props: [ 'imgPath' ]
}
</script>

<style lang="scss" scoped>
.details-top{
  width: 100%;
  height: 800px;
  overflow: hidden;
  position: relative;
  img{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: 0;
  }
}
</style>
