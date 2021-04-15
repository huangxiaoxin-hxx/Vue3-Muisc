<template>
  <div>
    <play-page
      v-show="fullScreen"
      :imgUrl="imgUrl"
      :name="name"
      :artist="artist"
      :mode="mode"
      @playSong="toggle"
      :isLike="isLike"
      :allTime="allTime"
      :time="playTime"
      :width="progressWidth"
      @changeTime="changeTime"
      @changeMode="changeMode"
      @prev="prevSong"
      @next="nextSong"
      @showAudioList="showAudioList"
    />
    <small-audio
      v-show="!fullScreen"
      :imgUrl="imgUrl"
      :name="name"
      :artist="artist"
      :mode="mode"
      @play="toggle"
      @returnFull="returnFull"
      @showAudioList="showAudioList"
    />
    <van-popup
      :show="listShow"
      @click-overlay="clickOverlay"
      round
      position="bottom"
      :style="{
        width: '90%',
        height: '60%',
        background: '#151617',
        color: '#fff',
        left: '5%',
        marginBottom: '10px',
      }"
      class="list_popup"
    >
      <audio-list :mode="mode" @changeMode="changeMode" />
    </van-popup>
    <audio
      :src="url"
      ref="audio"
      autoplay
      @canplay="ready"
      @error="error"
      preload="auto"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import smallAudio from "./components/smallAudio.vue";
import playPage from "./components/playPage.vue";
import audioList from "./components/audioList.vue";
import { useStore } from "vuex";
import { Toast } from "vant";
import {
  watch,
  ref,
  reactive,
  toRefs,
  computed,
  nextTick,
  watchEffect,
} from "vue";
import { getStore } from "../../utils/storage";
import { likeMusicList } from "../../service/user";
import { checkSong, getPlayerUrl } from "../../service/songs";
export default {
  components: {
    smallAudio,
    playPage,
    audioList,
  },
  setup() {
    const store = useStore();
    const isLike = ref(false);
    const audio = ref(null);
    const playTime = ref("00:00");
    const progressWidth = ref(0);
    const listShow = ref(false);
    const songState = reactive({
      allTime: 0,
      artist: [],
      imgUrl: "",
      name: "",
      canSong: true,
      readySong: false,
    });

    const fullScreen = computed(() => {
      return store.getters.FULL_SCREEN;
    });
    const mode = computed(() => {
      return store.getters.MODE;
    });

    watch(
      () => store.getters.AUDIO_ING_SONG,
      (val, oldVal) => {
        console.log(val);
        _getLikeMusicList(val.id);
        if (val.id === oldVal.id) {
          return;
        }
        nextTick(() => {
          if (val.dj) {
            _checkSong(val.mainTrackId);
          } else {
            _checkSong(val.id);
          }
          songState.allTime = val.duration
            ? val.duration
            : val.dt
            ? val.dt
            : "";
          songState.artist = val.album
            ? val.album.artists
            : val.ar
            ? val.ar
            : "";
          songState.imgUrl = val.album
            ? val.album.picUrl
            : val.al
            ? val.al.picUrl
            : val.album
            ? val.album.artist.img1v1Url
            : val.coverUrl
            ? val.coverUrl
            : "";
          songState.name = val.name;
        });
      }
    );
    /**
     * 获取已喜欢的歌曲列表
     * 得到列表数组后遍历查看当前歌曲是否在已喜欢列表中
     */
    const _getLikeMusicList = (id) => {
      const uid = getStore("id");
      likeMusicList(uid).then((res) => {
        const { data } = res;
        console.log(data);
        if (data.code === 200) {
          filterAudio(data.ids, id);
        }
      });
    };
    /**
     * 判断当前歌曲是否在已喜欢数组中
     */
    const filterAudio = (arr, id) => {
      if (arr.indexOf(id) > -1) {
        console.log("已喜欢");
        isLike.value = true;
      } else {
        console.log("未喜欢");
        isLike.value = false;
      }
    };

    /**
     * 查看歌曲是否可以播放
     */
    const _checkSong = (id) => {
      checkSong(id)
        .then((res) => {
          const data = res.data;
          // 当可以播放的时候请求歌曲url
          if (data.success) {
            songState.canSong = true;
            _getSongUrl(id);
            // _getSongLyric(id);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            // 不能播放的时候选择下一首进行播放
            songState.canSong = false;
            songState.readySong = true;
            nextSong();
            songState.readySong = true;
          }
        });
    };

    const url = ref(null);
    // 获取音乐URL
    const _getSongUrl = (id) => {
      getPlayerUrl(id).then((res) => {
        const data = res.data;
        if (data.code === 200) {
          url.value = data.data[0].url;
          console.log(url.value);
          audioTimeUpdate();
          // this.toPlay();
        }
      });
    };

    /**
     * 添加歌曲时间更新事件
     */
    const audioTimeUpdate = () => {
      // console.log(audio.value.addEventListener);
      audio.value.addEventListener("timeupdate", (e) => {
        setTime();
      });
    };

    /**
     * 设置当前播放时长
     */
    const setTime = () => {
      // 首先我们计算到当前的播放时间
      let minutes = Math.floor(audio.value.currentTime / 60);
      let seconds = Math.floor(audio.value.currentTime - minutes * 60);
      let minuteValue;
      let secondValue;
      // 进行格式转换，当分钟小于10的时候，在前面加0
      if (minutes < 10) {
        minuteValue = "0" + minutes;
      } else {
        minuteValue = minutes;
      }
      // 秒数的格式设置
      if (seconds < 10) {
        secondValue = "0" + seconds;
      } else {
        secondValue = seconds;
      }
      // 进行时间值拼接，展示到页面
      let audioTime = minuteValue + ":" + secondValue;
      playTime.value = audioTime;
      // // 进度条的长度计算
      let barLength = (audio.value.currentTime / audio.value.duration) * 100;
      setProgress(barLength);
      // 设置歌词偏移
      // const playTime = audio.currentTime + this.offsetLyric;
      // const index = this.getCurrentIndex(playTime, this.ruleLyric);
      // this.nowLyricIndex = index;
      // // 设置歌词显示
      // this.showLyric(index, this.ruleLyric);
      // // 设置歌词页面的显示规则,传入当前歌词索引信息
      // this.$refs.lyric.setCurrent(this.nowLyricIndex);
    };

    /**
     * 下一首歌曲切换
     */
    const nextSong = () => {
      console.log(songState.readySong);
      if (!songState.readySong) {
        return;
      }
      let nowIndex = store.getters.AUDIO_ING_INDEX + 1;
      if (nowIndex === store.getters.AUDIO_LIST.length) {
        nowIndex = 0;
      }
      store.commit("setAudioIndex", nowIndex);
      songState.readySong = false;
    };

    /**
     * 上一首歌曲切换
     */
    const prevSong = () => {
      console.log(songState.readySong);
      if (!songState.readySong) {
        return;
      }
      let nowIndex = store.getters.AUDIO_ING_INDEX - 1;
      if (nowIndex === -1) {
        nowIndex = store.getters.AUDIO_LIST.length - 1;
      }
      store.commit("setAudioIndex", nowIndex);
      songState.readySong = false;
    };

    /**
     *  当浏览器可以播放资源时
     */
    const ready = () => {
      songState.readySong = true;
    };

    /**
     * 播放暂停事件
     */
    const toggle = () => {
      if (store.getters.PLAY_STATE) {
        toPause();
      } else {
        toPlay();
      }
    };

    const modeToast = ["列表循环", "单曲循环", "随机播放"];
    /**
     * 改变歌曲播放模式
     */
    const changeMode = () => {
      console.log(store.getters.MODE);
      let mode = (store.getters.MODE + 1) % 3;
      Toast({
        message: modeToast[mode],
        position: "bottom",
      });

      store.commit("setAudioMode", mode);
      let shufflePlayList;
      if (mode === 2) {
        console.log("随机模式");
        shufflePlayList = shuffle(store.getters.AUDIO_LIST);
      } else {
        shufflePlayList = store.getters.AUDIO_LIST;
      }
      resetCurrentIndex(shufflePlayList);
      store.commit("setPlayList", shufflePlayList);
    };

    /**
     * 设置当前播放索引
     * 当在切换随机播放时，通过寻找原来的歌曲id来实现不会切换歌曲index
     */
    const resetCurrentIndex = (list) => {
      const index = list.findIndex((item) => {
        return item.id === store.getters.AUDIO_ING_SONG.id;
      });
      store.commit("setAudioIndex", index);
    };

    /**
     * 播放歌曲
     */
    const toPlay = () => {
      audio.value.play();
      store.commit("setPlayState", true);
    };
    /**
     * 暂停歌曲
     */
    const toPause = () => {
      audio.value.pause();
      store.commit("setPlayState", false);
    };

    /**
     * 转换为大播放器
     */
    const returnFull = () => {
      store.commit("setFullScreen", true);
    };

    /**
     * 设置进度条长度
     */
    const setProgress = (val) => {
      if (val < 0 || val > 100) {
        return;
      }
      progressWidth.value = val;
    };

    /**
     * 当改变进度条时改变歌曲播放时间
     */
    const changeTime = (value) => {
      const current = (value * audio.value.duration) / 100;
      setProgress(value);
      audio.value.currentTime = current;
    };

    /**
     * 当歌曲播放完成之后
     * 根据不同的播放模式进行不同的事件
     */
    const end = () => {
      console.log("???", store.getters.MODE);
      switch (store.getters.MODE) {
        case 0:
          nextSong();
          break;
        case 1:
          loop();
          break;
        case 2:
          nextSong();
          break;
      }
    };

    /**
     * 单曲循环模式
     */
    const loop = () => {
      audio.value.currentTime = 0;
      toPlay();
    };

    /**
     * 获取随机值
     */
    const getRandomIndex = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /**
     * 打乱一个数组
     */
    const shuffle = (arr) => {
      const _arr = arr.slice();
      for (let i = 0; i < _arr.length; i++) {
        const j = getRandomIndex(0, i);
        const t = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = t;
      }
      console.log("_arr: ", _arr);
      return _arr;
    };

    // 打开歌曲列表
    const showAudioList = () => {
      listShow.value = !listShow.value;
    };

    // 点击歌曲列表遮罩
    const clickOverlay = () => {
      listShow.value = false;
    };

    return {
      isLike,
      audio,
      mode,
      fullScreen,
      url,
      progressWidth,
      playTime,
      listShow,
      ...toRefs(songState),
      toggle,
      returnFull,
      changeTime,
      end,
      changeMode,
      prevSong,
      nextSong,
      ready,
      showAudioList,
      clickOverlay,
    };
  },
};
</script>

<style>
</style>