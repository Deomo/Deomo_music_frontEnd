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
export default {
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
    // 全屏播放界面显示时，mini和list不显示
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.isModeType = flag
  },
  [SET_SONG_DETAILS] (state, list) {
    state.songList = list
  },
  [SET_CURRENT_LYRICS] (state, lyrics) {
    state.currentLyrics = lyrics
  },
  [SET_DEL_LISTSONG] (state, index) {
    if (index !== -1) {
      state.songList.splice(index, 1)
    } else {
      // 删除所有，不传入index
      state.songList = []
      state.isShowMiniPlayer = false
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
    // 如果是删除的歌曲在当前播放歌曲的上方，则当前播放歌曲索引要-1
    if (index < state.currentSongIndex) {
      state.currentSongIndex = state.currentSongIndex - 1
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    if (index < 0) {
      index = state.songList.length - 1
    } else if (index > state.songList.length - 1) {
      index = 0
    }
    state.currentSongIndex = index
  },
  [SET_CUR_TIME] (state, time) {
    state.curTime = time
  },
  [SET_FAVORITE_SONG] (state, song) {
    // let index = state.favoriteSong.indexOf(song)
    // if (index === -1) {
    //   state.favoriteSong.push(song)
    // } else {
    //   state.favoriteSong.splice(index, 1)
    // }
    // id查找更加精确
    let result = state.favoriteSong.find(item => {
      return item.id === song.id
    })
    if (result === undefined) {
      state.favoriteSong.push(song)
    } else {
      state.favoriteSong = state.favoriteSong.filter(item => {
        return item.id !== song.id
      })
    }
  },
  // 同步localstorage中的列表
  [SET_FAVORITE_LIST] (state, list) {
    state.favoriteSong = list
  },
  // 设置历史播放
  [SET_HISTORY_SONG] (state, song) {
    let result = state.historySong.find(item => {
      return item.id === song.id
    })
    if (result === undefined) {
      if (state.historySong.length > 30) {
        state.historySong.splice(0, 1)
        state.historySong.push(song)
      } else {
        state.historySong.push(song)
      }
    }
  },
  // 同步localstorage中的列表
  [SET_HISTORY_LIST] (state, list) {
    state.historySong = list
  }
}
