<template>
  <div class="rank">
    <div class="rank-wrapper">
    <Scroll>
    <ul>
      <li v-for="(value, key) in category.titles" :key="key">
        <h3 class='group-title'>{{value}}</h3>
        <ul v-if='key === "officialList"' class='officialList'>
          <li v-for='item in category[key]' :key='item.id' @click.stop='selectItem(item.id)'>
            <div class="left">
              <img v-lazy="item.rank.coverImgUrl" alt="">
              <p>{{item.rank.updateFrequency}}</p>
            </div>
            <div class="right">
              <p v-for='(value, index) in item.rank.tracks' :key='index'>{{index}}-{{value.first}}-{{value.second}}</p>
            </div>
          </li>
        </ul>
        <ul v-else class='otherList'>
          <li v-for='item in category[key]' :key='item.id' @click.stop='selectItem(item.id)'>
            <div class="top">
              <img v-lazy="item.rank.coverImgUrl" alt="">
              <p>{{item.rank.updateFrequency}}</p>
            </div>
            <div class="bottom">
              <p>{{item.rank.name}}</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    </Scroll>
    <transition>
      <router-view></router-view>
    </transition>
    </div>
  </div>
</template>

<script>
import { getTopList } from '../api/index'
import Scroll from '../components/scrollview.vue'
export default {
  name: 'rank',
  components: {
    Scroll
  },
  data () {
    return {
      category: {}
    }
  },
  created () {
    getTopList()
      .then((data) => {
        console.log(data)
        this.category = data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    selectItem (id) {
      this.$router.push({
        path: `rank/detail/${id}/rank`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
@import '../assets/css/variable.scss';
.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper{
    position:fixed;
    top: 184px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    @include bg_sub_color();
    padding-bottom: 100px;
  .group-title{
    padding: 10px 20px;
    @include font_color();
    @include font_size($font_large);
    font-weight: bold;
  }
  .officialList {
    li{
    padding: 10px 20px;
    display: flex;
    align-items: center;
    // justify-content: center;
    box-sizing: border-box;
    .left {
      position: relative;
      margin-right: 20px;
      img{
        width: 200px;
        height: 200px;
        border-radius: 30px;
      }
      p{
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: white;
        @include font_size($font_medium_s)
      }
    }
    .right{
      width: 450px;
      p{
        padding: 8px 0;
        @include font_color();
        @include font_size($font_medium_s)
      }
    }
    }
  }
  .otherList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
    padding: 10px 20px;
    box-sizing: border-box;
    .top {
      position: relative;
      img{
        width: 200px;
        height: 200px;
        border-radius: 30px;
      }
      p{
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: white;
        @include font_size($font_medium_s)
      }
    }
    .bottom {
      width: 200px;
      text-align: center;
      p{
        padding: 10px 0;
        @include font_size($font_medium_s);
        @include font_color()
      }
     }
    }
   }
  }
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
