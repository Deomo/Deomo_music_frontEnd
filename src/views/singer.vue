<template>
  <div class="singers">
    <Scroll ref='scrollView'>
      <ul class="lis-wrapper">
      <!-- 锚点：<li class="lis-item" v-for='(item, index) in keys' :key='index' :id='"li" + index'> -->
      <li class="lis-item" v-for='(item, index) in keys' :key='index' ref='lisgroup'>
        <h2>{{item}}</h2>
        <ul>
          <li class="item" v-for='obj in list[index]' :key='obj.id' @click.stop="SingerSongs(obj.id)">
            <img v-lazy="obj.img1v1Url" alt="">
            <p>{{obj.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    </Scroll>
    <ul class="nav">
      <!-- <li
        v-for='(item, index) in keys'
        :key='index'
        @click.stop="jump(index)"
        :class='{"active": currentIndex === index }'
        >
        {{item}}
      </li> -->
      <li
        v-for='(item, index) in keys'
        :key='index'
        :data-index = index
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :class='{"active": currentIndex === index }'
        >
        {{item}}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import Scroll from '../components/scrollview.vue'
export default {
  name: 'singer',
  components: {
    Scroll
  },
  created () {
    getAllArtists()
      .then(result => {
        // console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      console.log(y)
      if (y <= 0) {
        this.currentIndex = 0
      }
      for (let i = 0; i < this.groupTop.length - 1; i++) {
        let pre = this.groupTop[i]
        let next = this.groupTop[i + 1]
        if (-y <= next && -y >= pre) {
          this.currentIndex = i
          return
        }
      }
      this.currentIndex = this.groupTop.length - 1
    })
  },
  data () {
    return {
      keys: [],
      list: [],
      groupTop: [],
      currentIndex: 0,
      offsetBegin: 0,
      offsetNow: 0
    }
  },
  watch: {
    // 当list发生变化时，监听list中每一个子列表的高度
    // 保证是渲染完成后监听，使用$nextTick方法
    list (newValue, oldValue) {
      this.$nextTick(() => {
        this.$refs.lisgroup.forEach((group) => {
          this.groupTop.push(group.offsetTop)
        })
      })
      // console.log(this.groupTop)
    }
  },
  methods: {
    // _jump方法私有
    _jump (index) {
      this.$refs.scrollView.scrollTo(0, -this.groupTop[index], 800)
      this.currentIndex = index
    },
    touchstart (e) {
      // console.log(e.target.dataset.index)
      let index = parseInt(e.target.dataset.index)
      this._jump(index)
      // 获取点击时，第一个手指点击点距离顶部的高度
      this.offsetBegin = e.touches[0].pageY
    },
    touchmove (e) {
      // 获取手指移动时，第一个手指点击点距离顶部的高度
      this.offsetNow = e.touches[0].pageY
      let offsetH = (this.offsetNow - this.offsetBegin) / e.target.offsetHeight
      // index为按下的index + 滚动的距离
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetH)
      if (index < 0) {
        index = 0
      }
      if (index > this.list.length - 1) {
        index = this.list.length - 1
      }
      this._jump(index)
    },
    SingerSongs (id) {
      this.$router.push({
        path: `/singer/detail/${id}/singer`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
@import '../assets/css/variable.scss';
.singers{
  scroll-behavior:smooth;
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .lis-wrapper {
    width: 100%;
    .lis-item{
      @include font_size($font_medium);
      box-sizing: border-box;
      color: #fff;
      h2{
        @include bg_color($background-color-theme);
        height: 60px;
        line-height: 60px;
        padding: 10px;
      }
      .item{
        padding: 10px 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        // border-bottom: 1px solid #ccc;
        @include bg_sub_color();
        img{
          width: 100px;
          height: 100px;
          border-radius: 50px;
          overflow: hidden;
        }
        p{
          margin-left: 10px;
          @include font_color()
        }
      }
    }
  }
.nav{
  padding: 15px 10px;
  border-radius: 10px;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 60%;
  transform: translateY(-55%);
  right: 20px;
  background: RGBA(0,0,0,0.3);
  li{
    @include font_size($font_samll);
    padding: 3px 0;
    color: #fff;
    &.active {
      @include font_active_color()
    }
  }
}
}
</style>
