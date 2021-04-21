<template>
  <div class="list_box">
    <div class="title">当前播放({{ playList.length }})</div>
    <div class="flex al_center box_control">
      <div class="flex al_center mode_box" @click="changeMode">
        <img :src="modeText[mode].img" />
        <div>{{ modeText[mode].name }}</div>
      </div>
      <div class="flex1"></div>
      <div class="flex al_center mode_box">
        <van-icon
          name="add-o"
          color="#fff"
          size="0.4rem"
          style="margin-right: 5px"
        />
        <div>收藏全部</div>
      </div>
      <van-icon
        name="delete-o"
        color="#fff"
        size="0.5rem"
        style="margin-left: 20px"
      />
    </div>
    <div class="playlist_scroll">
      <div
        class="playlist_list flex al_center"
        v-for="(item, index) in playList"
        :key="index"
        @click="audioThis(item, index)"
        :class="isActive(item)"
      >
        <div class="playlist_name ellipsis">
          {{ item.name }}<span class="ar_name"> - {{ item.ar[0].name }}</span>
        </div>
        <van-icon name="cross" color="#858585" size="0.5rem" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import xunhuan from "../../../static/xunhuan.png";
import danqu from "../../../static/danqu.png";
import random from "../../../static/random.png";
export default {
  props: {
    mode: {
      type: Number,
    },
  },
  setup(props, context) {
    const store = useStore();
    const playList = computed(() => {
      return store.getters.PLAY_LIST;
    });
    const modeText = ref([
      {
        img: xunhuan,
        name: "循环列表",
      },
      {
        img: danqu,
        name: "单曲循环",
      },
      {
        img: random,
        name: "随机播放",
      },
    ]);

    const changeMode = () => {
      context.emit("changeMode");
    };

    const audioThis = (item, index) => {
      console.log("???", item);
      // 随机播放情况
      if (props.mode === 2) {
        /**
         * 找到对应歌曲的索引
         */
        index = playList.findIndex((song) => {
          return song.id === item.id;
        });
      }
      store.commit("setAudioIndex", index);
    };

    const isActive = (item) => {
      if (item.id === store.getters.AUDIO_ING_SONG.id) {
        return "active";
      }
      return "";
    };

    return {
      playList,
      modeText,
      changeMode,
      audioThis,
      isActive,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../../common/player.less";
.list_box {
  width: 100%;
  height: 100%;
  padding: 15px 15px;
  box-sizing: border-box;
  .title {
    font-size: 14px;
    height: 8%;
  }
  .box_control {
    font-size: 12px;
    height: 8%;
    margin-bottom: 10px;
    .mode_box {
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    .mode_icon {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .playlist_scroll {
    width: 100%;
    height: 80%;
    overflow: scroll;
    .playlist_list {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      .playlist_name {
        width: 90%;
      }
      &.active {
        color: red;
        .ar_name {
          font-size: 12px;
          color: red;
        }
      }
      .ar_name {
        font-size: 12px;
        color: rgba(#fff, 0.5);
      }
    }
  }
}
</style>