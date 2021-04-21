/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import { delCookie } from '../utils/cookie'
import { removeStore } from '../utils/storage'
import router from '../router'
import { loginOut } from '../service/user'
/**
 * 获取随机值
 */
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * 打乱一个数组
 */
function shuffle(arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomIndex(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}



export default {
  // 选择歌单开始播放
  selectPlay({
    commit,
    state
  }, {
    list,
    index
  }) {
    commit("setAudioList", list)
    if (state.mode === 2) {
      const randomList = shuffle(list)
      commit("setPlayList", randomList)
      index = findIndex(randomList, state.audioList[index])
    } else {
      commit("setPlayList", list)
    }
    commit("setAudioIndex", index)
    commit("setPlayState", true)
    commit("setFullScreen", true)
  },
  // 退出当前账号
  loginOut() {
    loginOut().then(res => {
      removeStore("token")
      removeStore("username")
      removeStore("id")
      removeStore("playlistId")
    })
    router.push({
      path: "/",
    })
  },
  // 搜索歌曲列表，判断列表是否能够下拉
  searchListAction({
    commit,
    state
  }, {
    result,
    offset
  }) {
    const limit = 30
    const total = 30 * offset
    let hasMore = true
    console.log(offset)
    if (total > result.songCount) {
      hasMore = false
    }
    var params = {
      result: result.songs,
      offset: offset,
      limit: limit,
      hasMore: hasMore
    }
    if (offset == 1) {
      commit("setSearchSongs", params)
    } else {
      result.songs = [...state.searchList.result, ...result.songs]
      params.result = result.songs
      commit("setSearchSongs", result.songs, offset, limit, hasMore)
    }
  }
}
