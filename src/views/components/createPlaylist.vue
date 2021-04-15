<template>
  <div class="create_playlist">
    <div class="flex al_center" style="margin-bottom: 10px">
      <div class="created_title flex1">
        {{ playType }}歌单({{ list.length }}个)
      </div>
      <van-icon name="plus" size="0.5rem" color="#5b5b5c" />
    </div>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex list_box al_center" @click="goSongsList(item.id)">
        <img :src="item.coverImgUrl" />
        <div class="flex1">
          <div class="name">{{ item.name }}</div>
          <div class="num">
            {{ item.trackCount }}首
            {{ playType == "收藏" ? `,by ${item.creator.nickname}` : "" }}
          </div>
        </div>
        <van-icon name="ellipsis" class="dot" size="0.5rem" />
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    playType: String,
  },
  setup(props) {
    console.log(props.playType);
    const goSongsList = (id) => {
      if (props.playType == "创建") {
        router.push({
          name: "SongsList",
          params: { id },
        });
      } else {
        router.push({
          name: "FavoritesList",
          params: { id },
        });
      }
    };
    return {
      goSongsList,
    };
  },
};
</script>

<style lang="less" scoped>
.create_playlist {
  width: 100%;
  background-color: #222324;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  .created_title {
    font-size: 12px;
    color: rgba(#fff, 0.4);
  }
  .list_box {
    width: 100%;
    height: 60px;
    color: #fff;
    img {
      height: 50px;
      width: 50px;
      border-radius: 5px;
      margin-right: 10px;
    }
    .name {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .num {
      font-size: 12px;
      font-weight: 300;
      color: rgba(#fff, 0.4);
    }
    .dot {
      transform: rotate(90deg);
    }
  }
}
</style>