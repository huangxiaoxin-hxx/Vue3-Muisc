<template>
  <div class="hot_box">
    <div class="flex border_bottom">
      <div class="title flex1">热搜榜</div>
      <div class="play">
        <van-icon
          name="play"
          color="#fff"
          style="transform: translateY(1px); margin-left: 4px"
        />
        播放
      </div>
    </div>
    <div class="hot_list_box flex" :style="{ height: more ? '400px' : '' }">
      <div
        class="hot_list_item flex al_center"
        v-for="(item, index) in list"
        :key="index"
        @click="goSongs(item)"
      >
        <div :style="{ color: index < 3 ? '#c4545a' : '' }" class="rank">
          {{ index + 1 }}
        </div>
        <div class="name ellipsis" :class="item.alg">{{ item.searchWord }}</div>
        <img
          :src="item.iconUrl"
          v-if="item.iconUrl"
          :class="'icon' + item.iconType"
        />
      </div>
    </div>
    <div class="more" @click="showMore" v-if="!more">
      展开更多热搜<van-icon name="arrow-down" style="margin-left: 4px" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSearchHot } from "../../service/search";
import { useRouter } from "vue-router";
export default {
  setup() {
    const list = ref(null);
    const more = ref(false);
    const router = useRouter();
    getSearchHot().then((res) => {
      list.value = res.data.data;
      console.log(list.value);
    });

    const iconName = (type) => {
      switch (type) {
        case 0:
          return null;
        case 1:
          return "hot";
        case 5:
          return "up";
        default:
          return null;
      }
    };

    const showMore = () => {
      console.log("/??");
      more.value = true;
      console.log;
    };

    const goSongs = (item) => {
      router.push({
        name: "searchSongs",
        params: { name: item.searchWord },
      });
    };

    return {
      list,
      more,
      iconName,
      showMore,
      goSongs,
    };
  },
};
</script>

<style lang="less" scoped>
.hot_box {
  width: 100%;
  color: #fff;
  .play {
    width: 50px;
    border: 1px solid rgba(#fff, 0.4);
    line-height: 20px;
    height: 20px;
    border-radius: 50px;
    padding: 0 4px;
  }
  .hot_list_box {
    flex-wrap: wrap;
    height: 200px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    .hot_list_item {
      width: 50%;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      .rank {
        width: 15px;
        font-weight: 500;
        font-size: 14px;
        margin-right: 10px;
      }
      .name {
        max-width: 80%;
        margin-right: 10px;
        font-size: 14px;
        font-weight: 400;
        // line-height: 20px;
      }
      .featured {
        background-image: url("../../static/sakura.gif");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .icon1 {
        width: 30px;
        height: 15px;
      }
      .icon0 {
        width: 30px;
        height: 15px;
      }
      .icon2 {
        width: 30px;
        height: 15px;
      }
      .icon5 {
        width: 12px;
        height: 15px;
      }
    }
  }
  .more {
    text-align: center;
    margin-top: 4px;
  }
}
.border_bottom {
  height: 30px;
  line-height: 20px;
  border-bottom: 1px solid rgba(#fff, 0.1);
}
</style>