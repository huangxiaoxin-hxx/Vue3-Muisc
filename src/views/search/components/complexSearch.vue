<template>
  <div class="complex_box">
    <!-- 单曲模块 -->
    <div class="single_box model_box" v-if="checkArr && checkArr.song">
      <div class="box_top flex al_center">
        <div class="box_title flex1">单曲</div>
        <van-button icon="play" class="play_btn">播放</van-button>
      </div>
      <div
        class="song_list flex al_center"
        v-for="(item, index) in data && data.song.songs"
        :key="index"
        @click="playSong(item)"
      >
        <div class="song_info flex1">
          <div class="song_name ellipsis">{{ item.name }}</div>
          <div class="flex">
            <div class="song_ar">{{ item.ar[0].name }}</div>
            -
            <div class="song_al">{{ item.name }}</div>
          </div>
        </div>
        <van-icon name="weapp-nav" class="song_dot" />
      </div>
      <div class="view_more" v-if="data.song.more">
        {{ data && data.song.moreText }}>>
      </div>
    </div>
    <!-- 歌单模块 -->
    <div class="model_box playlist_box" v-if="checkArr && checkArr.playList">
      <div class="box_top flex al_center">
        <div class="box_title flex1">歌单</div>
      </div>
      <div
        class="play_list flex al_center"
        v-for="(item, index) in data && data.playList.playLists"
        :key="index"
        @click="goPlayList(item.id)"
      >
        <img :src="item.coverImgUrl" />
        <div>
          <div class="playlist_name ellipsis">{{ item.name }}</div>
          <div class="playlist_text">
            {{ item.trackCount }}首，by {{ item.creator.nickname }}，播放
            {{
              item.playCount > 10000
                ? parseInt(item.playCount / 10000) + "万次"
                : item.playCount + "次"
            }}
          </div>
        </div>
      </div>
      <div class="view_more" v-if="data.playList.more">
        {{ data && data.playList.moreText }}>>
      </div>
    </div>
    <!-- 视频模块 -->
    <div class="model_box video_box" v-if="checkArr && checkArr.video">
      <div class="box_top flex al_center">
        <div class="box_title">视频</div>
      </div>
      <div
        class="video_list flex al_center"
        v-for="(item, index) in data && data.video.videos"
        :key="index"
      >
        <div class="relative">
          <img :src="item.coverUrl" />
          <van-icon name="play" class="play_video_icon" />
        </div>
        <div class="flex1">
          <view class="video_name flex">
            <span v-if="item.type == 0" class="mv_icon">MV</span>
            {{ item.title }}
          </view>
          <view class="video_text"
            >{{ computeTime(item.durationms) }}，by
            {{ item.creator[0].userName }},播放{{
              item.playTime > 10000
                ? parseInt(item.playTime / 10000) + "万次"
                : item.playTime + "次"
            }}</view
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { getSearchType } from "../../../service/search";
import { checkModel } from "../../../methods";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
export default {
  props: {
    searchConfirm: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const data = ref(null);
    const modelArr = [
      "song", // 单曲
      "playList", // 歌单
      "video", // 视频
      "album", //专辑
      "artist", // 歌手
      "user", // 用户
    ];
    const router = useRouter();
    const checkArr = ref(null);
    const store = useStore();
    console.log(props);
    getSearchType({
      keywords: props.searchConfirm,
      type: 1018,
    }).then((res) => {
      console.log(res.data);
      data.value = res.data.result;
      // 检测模块数据是否存在
      checkArr.value = checkModel(modelArr, data.value.order);
    });

    const search = computed(() => {
      return props.searchConfirm;
    });

    watch(search, (val) => {
      console.log(val);
      getSearchType({
        keywords: props.searchConfirm,
        type: 1018,
      }).then((res) => {
        console.log(res.data);
      });
    });

    const goPlayList = (id) => {
      router.push({
        name: "FavoritesList",
        params: { id },
      });
    };

    const computeTime = (time) => {
      return moment(time).format("mm:ss");
    };

    const playSong = (item) => {
      store.dispatch("selectSongPlay", { song: item });
    };

    return {
      checkArr,
      data,
      goPlayList,
      computeTime,
      playSong,
    };
  },
};
</script>

<style lang="less" scoped>
.complex_box {
  color: #fff;
}
.model_box {
  width: 100%;
  min-height: 50px;
  background-color: #212223;
  padding: 16px 14px 0;
  border-radius: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  .box_top {
    margin-bottom: 20px;
  }
  .play_btn {
    width: 55px;
    height: 24px;
    color: rgba(#fff, 0.6);
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0);
    padding: 0;
    border-radius: 50px;
  }
  .box_title {
    font-size: 16px;
    color: #fff;
  }
}
.single_box {
  .song_list {
    border-top: 1px solid rgba(#fff, 0.1);
    width: 100%;
    height: 80px;
    .song_info {
      width: 100%;
    }
    .song_name {
      font-size: 14px;
      width: 70%;
      margin-bottom: 3px;
    }
    .song_ar {
      font-size: 12px;
      margin-right: 4px;
    }
    .song_al {
      font-size: 12px;
      margin-left: 4px;
    }
    .song_dot {
      transform: rotate(90deg);
    }
  }
}
.playlist_box {
  .play_list {
    width: 100%;
    height: 60px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-right: 10px;
    }
    .playlist_text {
      font-size: 12px;
    }
    .playlist_name {
      width: 90%;
      font-size: 14px;
    }
  }
}
.video_box {
  .video_list {
    width: 100%;
    height: 80px;
    img {
      width: 100px;
      height: 60px;
      border-radius: 5px;
      margin-right: 10px;
    }
    .play_video_icon {
      position: absolute;
      color: rgba(#fff, 0.7);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
    }
    .video_name {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
      font-size: 14px;
      margin-bottom: 4px;
      .mv_icon {
        display: inline-block;
        padding: 1px;
        font-size: 12px;
        color: rgb(238, 80, 88);
        transform: scale(0.7);
        border: 1px solid rgb(238, 80, 88);
        margin-right: 5px;
      }
    }
    .video_text {
      font-size: 12px;
    }
  }
}
</style>