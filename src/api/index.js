/* eslint-disable no-undef */
// 请求接口
import Network from './Network'
import 'core-js'
export const getBanner = () => Network.get('banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Network.get('personalized?limit=6')
// 获取专辑
export const getNewAlbum = () => Network.get('/album/newest')
// 推荐新音乐
export const getNewsong = () => Network.get('/personalized/newsong')
// 歌单详情
export const getPlaylist = (id) => Network.get('/playlist/detail?id=' + id)
// 专辑详情
export const getAlbum = (id) => Network.get('/album?id=' + id)
// 歌手详情
export const getArtists = (id) => Network.get('/artists?id=' + id)
// 歌曲详情、获取音乐地址
export const getSongDetails = (ids) => Network.get('/song/detail?ids=' + ids)
export const getMusicUrl = (ids) => Network.get('/song/url?id=' + ids)
// 获取歌词
export const getLyrics = (id) => Network.get('/lyric?id=' + id)

// 获取热门歌手,改造，直接获取artists
export const getHotSinger = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 获取a-z全部歌手
export const getLetterSinger = (letter) => {
  return new Promise((resolve, reject) => {
    let letterArtists = []
    Network.all([
      Network.get(`/artist/list?type=1&area=7&offset=0&limit=5&initial=${letter}`),
      Network.get(`/artist/list?type=1&area=96&offset=0&limit=5&initial=${letter}`),
      Network.get(`/artist/list?type=1&area=8&offset=0&limit=5&initial=${letter}`),
      Network.get(`/artist/list?type=1&area=16&offset=0&limit=5&initial=${letter}`),
      Network.get(`/artist/list?type=1&area=0&offset=0&limit=5&initial=${letter}`)
    ])
      .then(function (result) {
        // resolve(result)
        result.forEach((item) => {
          letterArtists.push(...item.artists)
        })
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

// 通过26字母获取全部歌手
export const getAllArtists = (letter) => {
  return new Promise((resolve, reject) => {
    let keys = ['热']
    let list = [getHotSinger()]
    for (let i = 65; i < 91; i++) {
      let char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterSinger(char))
    }
    // list列表发送请求
    Network.all(list)
      .then(result => {
        let obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 获取热门榜单
export const getTopList = () => {
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        { name: '飙升榜', id: 19723756 },
        { name: '新歌榜', id: 3779629 },
        { name: '原创榜', id: 2884035 },
        { name: '热歌榜', id: 3778678 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 991319590 },
        { name: '云音乐古典榜', id: 25 },
        { name: '云音乐电音榜', id: 32 },
        { name: '云音乐ACG榜', id: 26 },
        { name: '云音乐韩语榜', id: 22 },
        { name: '云音乐国电榜', id: 24 }
      ],
      globalList: [
        { name: 'UK排行榜周榜', id: 6 },
        { name: '美国Billboard榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon榜', id: 10 },
        { name: '云音乐欧美热歌榜', id: 8 },
        { name: '云音乐欧美新歌榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '中国新乡村音乐排行榜', id: 27 },
        { name: '云音乐ACG动画榜', id: 28 },
        { name: '云音乐ACG游戏榜', id: 30 },
        { name: '云音乐ACG VOCALOID榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('/toplist/detail')
      .then(function (data) {
        data.list.forEach((obj) => {
          let flag = false
          for (let key in category) {
            for (let k = 0; k < category[key].length; k++) {
              if (category[key][k].name === obj.name) {
                category[key][k].rank = obj
                category[key][k].id = obj.id
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

// 获取榜单播放列表
export const getRanklist = (id) => Network.get('/top/list?id=' + id)

// 获取搜索结果
export const getSearch = (keywords) => Network.get('/search?keywords=' + keywords)
// 热门推荐
export const getHot = () => Network.get('/search/hot')
