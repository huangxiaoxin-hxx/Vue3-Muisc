/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

export default {
  loadingPage: false,
  userDetail: null,
  playList: [], // 用来存储各种播放模式的列表
  audioList: [], // 用来展示播放列表项
  audioIngIndex: -1, // 正在播放的这一首歌曲索引
  playingShow: true, // 是否显示转盘播放页面
  mode: 0, // 用来记录当前播放模式 0：列表循环，1：单曲循环 2：随机播放
  playState: false, // 是否正在播放，
  fullScreen: false, // 是否是全屏展示播放页
  isHome: false, // 默认不在Home页
}
