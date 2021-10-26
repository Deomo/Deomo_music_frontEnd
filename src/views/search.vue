<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model="keywords"
        v-throttle="search">
    </div>
    <div class="search-suggest" v-if=" keywords !== '' ">
    <Scroll>
    <ul>
      <li v-for="value in songs" :key='value.id' @click.stop="selectMusic(value.id)">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <p>{{value.name}} - {{value.artists[0].name}}</p>
      </li>
    </ul>
    </Scroll>
    </div>
    <div class="hot" >
      <h3>热门推荐</h3>
      <ul >
        <li
          v-for="value in hotSongs"
          :key='value.first'
          @click.stop="hotSearch(value.first)"
          >{{value.first}}</li>
      </ul>
    </div>
    <ul class="searchHistory">
      <h3>搜索历史</h3>
      <li
        v-for="(value, index) in searchHistory"
        :key="index">
        <div class="searchHistory-left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
        </div>
        <p>{{value}}</p>
        <div class="searchHistory-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">

        </div>
        </li>
    </ul>
  </div>
</template>

<script>
import Scroll from '../components/scrollview'
import { getSearch, getHot } from '../api/index'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../components/tools/tools'
export default {
  name: 'search',
  components: {
    Scroll
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hotSongs: [],
      searchHistory: []
    }
  },
  methods: {
    search () {
      if (this.keywords !== '') {
        getSearch(this.keywords)
          .then(data => {
            this.songs = data.result.songs
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    hotSearch (song) {
      this.keywords = song
      this.search()
    },
    ...mapActions([
      'setFullScreen',
      'setSongDetails'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetails([id])
      if (this.searchHistory.includes(this.keywords)) {
        return
      } else {
        this.searchHistory.push(this.keywords)
      }
      setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
    },
    delHistory (value) {
      this.searchHistory = this.searchHistory.filter((item) => {
        return item !== value
      })
      setLocalStorage('searchHistory', this.searchHistory)
    }
  },
  directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let pre = 0
        el.addEventListener('input', function () {
          let now = new Date()
          if (now - pre > 1000) {
            obj.value()
            pre = now
          }
        })
      }
    }
  },
  created () {
    getHot()
      .then(data => {
        this.hotSongs = data.result.hots
        // console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    // 获取搜索历史
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    this.searchHistory = getLocalStorage('searchHistory')
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";
.search{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    // border-bottom: 1px solid #ccc;
    img {
    width: 40px;
    height: 40px;
    margin-left: 20px;
    }
    input{
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  .search-suggest{
    position: fixed;
    top: 300px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    @include bg_sub_color();
    li{
      padding: 20px 35px;
      display: flex;
      align-content: center;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_size($font_medium);
        @include font_color();
      }
    }
  }
  .hot{
    h3{
      padding: 20px 35px;
      @include font_color();
      @include font_size($font_medium);
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding:0 25px;
      li{
        height: 50px;
        line-height: 50px;
        border: 2px solid #ccc;
        padding: 2px 20px;
        margin:10px 30px 0 0;
        border-radius: 20px;
        @include font_size($font_medium_s);
        @include font_color();
      }
    }
  }
  .searchHistory{
    h3{
      padding: 20px 35px;
      @include font_color();
      @include font_size($font_medium);
    }
    li{
      padding: 20px 35px;
      display: flex;
      align-content: center;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_size($font_medium);
        @include font_color();
      }
      .searchHistory-right{
        position: absolute;
        right: 40px;
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
