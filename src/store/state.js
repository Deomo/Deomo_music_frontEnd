import mode from './modeType.js'
export default {
  // 全屏播放器
  isFullScreen: false,
  // mini播放器
  isShowMiniPlayer: false,
  // 列表播放器
  isShowListPlayer: false,
  // 播放状态
  isPlaying: false,
  // 播放模式
  isModeType: mode.loop,
  // 定义歌曲详情列表
  songList: [],
  // 定义当前播放歌曲（图片，标题，作者，音乐链接）
  currentSong: [],
  // 定义当前播放歌曲索引
  currentSongIndex: 0,
  // 定义当前歌曲歌词
  currentLyrics: {},
  // 定义当前播放时间
  curTime: 0,
  // 定义收藏歌曲
  favoriteSong: [],
  // 定义历史播放
  historySong: []
}
