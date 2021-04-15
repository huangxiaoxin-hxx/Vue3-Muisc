/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

export default {
  setLoaidngPageFalse(state) {
    state.loadingPage = false
  },
  setLoaidngPageTrue(state) {
    state.loadingPage = true
  },
  setUserDetail(state, detail) {
    state.userDetail = detail
  },
  /**
   * 设置当前播放列表
   */
  setPlayList(state, list) {
    state.playList = list
  },
  setAudioIndex(state, index) {
    state.audioIngIndex = index
  },
  setPlayState(state, flag) {
    state.playState = flag
  },
  setFullScreen(state, flag) {
    state.fullScreen = flag
  },
  setAudioList(state, list) {
    state.audioList = list
  },
  // 设置是否在Home页面
  setIsHome(state, bol) {
    state.isHome = bol
    console.log(state.isHome)
  },
  setAudioMode(state, mode) {
    state.mode = mode
  },
}
