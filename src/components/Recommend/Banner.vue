<template>
  <!--swiper的bug,如果数据是从网络获取的, 那么自动轮播到最后一页之后就不轮播了-->
  <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
  <swiper :options="swiperOption" class="banner" v-if='banners.length > 0'>
    <!-- slides -->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  <!-- </div> -->
</template>

<script>
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: ['banners'],
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.banner{
  .item{
    img{
    width: 800px;
    height: 300px;
    }
  }
}
</style>
<style lang="scss">
// 覆盖swiper样式需要设置全局，不能scope
@import '../../assets/css/mixin';
.banner{
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    background:white;
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    @include bg_color($background-color-theme);

  }
}
</style>
