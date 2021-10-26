import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAILS,
  SET_CURRENT_LYRICS,
  SET_DEL_LISTSONG,
  SET_CURRENT_INDEX,
  SET_CUR_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type.js'
import {
  getSongDetails,
  getMusicUrl,
  getLyrics } from '../api/index'
export default {
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  // 通过API获取歌曲详情及音乐地址，是异步操作,用于统一修改Player组件
  async setSongDetails ({ commit }, ids) {
    let result = await getSongDetails(ids.join(','))
    // 由于传入的可能有多个id，与result中id一一对应，因此在循环中操作
    let musicUrl = await getMusicUrl(ids.join(','))
    // console.log(result.songs)
    let list = []
    // 遍历歌曲时，同时拿到一一对应的音乐地址
    result.songs.forEach(function (value, index) {
      // 定义一个歌曲对象
      let obj = {}
      // 获取播放地址
      for (let j = 0; j < musicUrl.data.length; j++) {
        let item = musicUrl.data[j]
        if (value.id === item.id) {
          obj.musicUrl = item.url
          break
        }
      }
      // 获取歌曲名称
      obj.name = value.name
      // 获取歌曲id
      obj.id = value.id
      // 获取歌手名单（是个数组，需要遍历）
      let singers = ''
      value['ar'].forEach((item, index) => {
        if (index === 0) {
          singers = item.name
        } else {
          singers += '-' + item.name
        }
      })
      obj.singers = singers
      obj.picUrl = value['al'].picUrl
      list.push(obj)
    })
    // let results = await getLyrics(18638057)
    // console.log(parseLyric(results.lrc.lyric))
    commit(SET_SONG_DETAILS, list)
  },
  // 获取歌词
  async setCurrentLyrics ({ commit }, id) {
    let result = await getLyrics(id)
    // console.log(result)
    // console.log(parseLyric(result.lrc.lyric))
    let lyrics = parseLyric(result.lrc.lyric)
    // console.log(lyrics)
    commit(SET_CURRENT_LYRICS, lyrics)
  },
  // 删除列表中的歌曲
  setDelListSing ({ commit }, index) {
    commit(SET_DEL_LISTSONG, index)
  },
  // 修改当前歌曲索引
  setCurrentSongIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  // 设置当前播放的时间
  setCurTime ({ commit }, time) {
    commit(SET_CUR_TIME, time)
  },
  // 设置喜爱的歌曲
  setFavoriteSong  ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  // 同步本地存储的喜爱歌曲列表
  setFavoriteList ({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  // 设置历史播放歌曲
  setHistorySong  ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  // 同步本地存储的历史播放歌曲列表
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}
// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
