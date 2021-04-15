<template>
  <div class="container">
    <div class="header flex al_center">
      <van-icon
        name="arrow-down"
        color="#fff"
        size="0.6rem"
        @click="closeDown"
      />
      <div style="width: 200px">
        <div class="music_name">{{ name }}</div>
        <div class="al_name">
          <div v-for="(item, index) in artist" :key="index">
            {{ index == 0 ? item.name : "/" + item.name }}
          </div>
        </div>
      </div>
      <van-icon name="ellipsis" color="#fff" size="0.6rem" />
    </div>
    <!-- 遮罩层 -->
    <div
      class="bg_mask"
      :style="{ backgroundImage: 'url(' + imgUrl + ')' }"
    ></div>
    <!-- 唱盘 -->
    <div class="record_box">
      <div class="record-wrapper">
        <img
          :class="{ microphonePlay: isPlay }"
          class="microphone"
          src="../../../assets/player/microphone.png"
        />
        <div class="record-content">
          <div
            class="record"
            :class="{ 'cover-pause': !isPlay, coverAfresh: isPlay }"
          >
            <img class="cover" :src="imgUrl" />
          </div>
        </div>
      </div>
    </div>
    <!-- 底部控制器 -->
    <div class="a_player">
      <div class="wrapper">
        <van-icon
          :name="isLike ? 'like' : 'like-o'"
          size="0.6rem"
          :color="isLike ? '#e61812' : '#fff'"
        />
        <van-icon name="back-top" size="0.6rem" color="#fff" class="rot180" />
        <van-icon name="chat-o" size="0.6rem" color="#fff" />
      </div>
      <div class="flex slider">
        <div class="left_time">{{ time }}</div>
        <van-slider
          v-model="value"
          :model-value="width"
          bar-height="2px"
          active-color="#ee0a24"
          button-size="12px"
          @change="sliderChange"
        />
        <div class="song_time">{{ songTime }}</div>
      </div>
      <div class="flex wrapper_play">
        <div
          class="play_icon"
          :class="modeClass"
          @click.self="changeMode"
        ></div>
        <div class="play_icon">
          <img src="../../../assets/player/prev.png" @click.self="prev" />
        </div>
        <van-icon
          :name="isPlay ? 'pause-circle' : 'play-circle'"
          size="1rem"
          color="#fff"
          @click="playSong"
        />
        <div class="play_icon">
          <img src="../../../assets/player/next.png" @click.self="next" />
        </div>
        <div class="play_icon">
          <img
            src="../../../assets/player/list.png"
            @click.self="showAudioList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, onMounted, toRefs, computed, watch, ref } from "vue";
import { getTime } from "../../../methods";

export default {
  props: {
    imgUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    lyric: {
      type: String,
    },
    artist: {
      type: [Array, String],
    },
    isLike: {
      type: Boolean,
    },

    allTime: {
      type: Number,
    },
    time: {
      type: String,
    },
    width: {
      type: Number,
    },
    index: {
      type: Number,
    },
  },
  setup(props, context) {
    const store = useStore();
    const value = ref(100);
    const songTime = computed(() => {
      let allT = parseInt(props.allTime / 1000);
      return getTime(allT);
    });
    console.log(songTime.value);
    const closeDown = () => {
      store.commit("setFullScreen", false);
    };

    const isPlay = computed(() => {
      return store.getters.PLAY_STATE;
    });

    const playSong = () => {
      console.log(props);
      console.log("playSong");
      context.emit("playSong");
    };

    const sliderChange = (value) => {
      console.log(value);
      context.emit("changeTime", value);
    };

    const modeClass = computed(() => {
      switch (store.getters.MODE) {
        case 0: // 列表循环
          return "xunhuan";
        case 1: // 单曲循环
          return "danqu";
        case 2: // 随机播放
          return "random";
      }
    });

    const changeMode = () => {
      context.emit("changeMode");
    };

    const prev = () => {
      context.emit("prev");
    };

    const next = () => {
      context.emit("next");
    };

    const showAudioList = () => {
      context.emit("showAudioList");
    };

    return {
      closeDown,
      isPlay,
      playSong,
      songTime,
      value,
      sliderChange,
      modeClass,
      changeMode,
      prev,
      next,
      showAudioList,
    };
  },
};
</script>

<style scoped lang="less">
@import "../../../common/player.less";
</style>
<style>
@import "../../../common/recordAni.css";
</style>