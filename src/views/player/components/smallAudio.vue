<template>
  <div
    class="bottom-audio pd23"
    :class="isHome ? '' : 'bottom0'"
    @click="returnFull"
  >
    <div class="img-info" ref="circle">
      <img :src="imgUrl" alt />
    </div>
    <div class="con-info">
      <p class="name">{{ name }}</p>
    </div>

    <div class="al-name" v-if="artist.length">
      {{ "-" + artist[0].name }}
    </div>
    <div class="pause">
      <van-icon
        :name="isPlay ? 'pause-circle' : 'play-circle'"
        size="0.8rem"
        color="#fff"
        @click.stop="play"
      />
    </div>
    <div class="play_list">
      <van-icon
        name="ascending"
        size="0.8rem"
        color="#fff"
        @click.stop="showAudioList"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, watch, ref } from "vue";
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
  },
  setup(props, context) {
    const store = useStore();
    const circle = ref(null);
    const isHome = computed(() => {
      return store.getters.IS_HOME;
    });
    const isPlay = computed(() => {
      return store.getters.PLAY_STATE;
    });
    watch(isPlay, (val) => {
      if (val) {
        circle.value.style.animationPlayState = "running";
      } else {
        circle.value.style.animationPlayState = "paused";
      }
    });
    const returnFull = () => {
      context.emit("returnFull");
    };
    const play = () => {
      context.emit("play");
    };

    const showAudioList = () => {
      context.emit("showAudioList");
    };

    return {
      isHome,
      returnFull,
      play,
      circle,
      isPlay,
      showAudioList,
    };
  },
};
</script>

<style scoped lang="less">
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bottom-audio {
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 50px;
  z-index: 20;
  background-color: #151616;
  border-top: 1px solid rgba(#fff, 0.2);
  &.bottom0 {
    bottom: 0;
  }
  .img-info {
    width: 0.7rem;
    height: 0;
    padding-bottom: 0.7rem;
    border-radius: 50%;
    overflow: hidden;
    transform-origin: center;
    margin-left: 10px;
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .con-info {
    color: #fff;
    margin-left: 10px;
    max-width: 120px;
    margin-right: 2px;
    .name {
      font-size: 14px;
      line-height: 1.5;
      .ellipsis();
    }
  }
  .al-name {
    max-width: 100px;
    color: rgba(#fff, 0.7);
    font-size: 12px;
    transform: scale(0.9);
    .ellipsis();
  }
  .pause {
    position: absolute;
    right: 60px;
  }
  .play_list {
    position: absolute;
    right: 20px;
  }
}
</style>
<style>
.img-info {
  animation: rotating 24s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>