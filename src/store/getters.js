export default {
  PLAY_LIST: state => state.playList,
  AUDIO_ING_INDEX: state => state.audioIngIndex,
  AUDIO_LIST: state => state.audioList,
  PLAY_STATE: state => state.playState,
  FULL_SCREEN: state => state.fullScreen,
  MODE: state => state.mode,
  AUDIO_ING_SONG: state => {
    // 返回当前播放歌曲对象的信息
    return state.playList[state.audioIngIndex] || {}
  },
  IS_HOME: state => state.isHome,
  SEARCH_LIST: state => state.searchList
}
