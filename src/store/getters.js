export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  isModeType (state) {
    return state.isModeType
  },
  songList (state) {
    return state.songList
  },
  // 当前播放歌曲，用来映射
  currentSong (state) {
    let obj = {
      name: '',
      singers: '',
      picUrl: '',
      musicUrl: ''
    }
    if (state.songList.length !== 0) {
      obj = state.songList[state.currentSongIndex]
    }
    return obj
  },
  // 当前播放的歌词
  currentLyrics (state) {
    return state.currentLyrics
  },
  currentSongIndex (state) {
    return state.currentSongIndex
  },
  // 当前播放时间
  curTime (state) {
    return state.curTime
  },
  favoriteSong (state) {
    return state.favoriteSong
  },
  historySong (state) {
    return state.historySong
  }
}
