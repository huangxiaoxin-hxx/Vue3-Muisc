<template>
  <div class="container">
    <!-- 头部信息 -->
    <div class="header flex al_center">
      <img :src="userDetail.profile.avatarUrl" />
      <div class="flex1">
        <div class="user_name">{{ userDetail.profile.nickname }}</div>
        <div class="level">Lv.{{ userDetail.level }}</div>
      </div>
      <van-icon name="arrow" color="#fff" size="0.5rem" />
    </div>
    <!-- 我喜欢模块 -->
    <div class="like_box flex al_center" @click="goSongsList">
      <div
        class="like_img"
        :style="{
          backgroundImage: `url(${like && like.coverImgUrl})`,
        }"
      ></div>
      <div class="flex1 like_num">
        <div class="title">{{ like && like.name }}</div>
        <div>共{{ likeList && likeList.length }}首</div>
      </div>
      <div class="heart_model flex al_center">
        <van-icon name="like-o" color="#fff" />
        心动模式
      </div>
    </div>
    <!-- 歌单 -->
    <van-tabs
      :active="active"
      sticky
      background="#151617"
      color="#b33839"
      title-inactive-color="#fff"
      title-active-color="#fff"
      animated
      offset-top="50px"
    >
      <van-tab title="创建歌单" :key="index">
        <create-playlist :list="createList" playType="创建" />
      </van-tab>

      <van-tab title="收藏歌单" :key="index">
        <create-playlist :list="favoritesList" playType="收藏" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { getStore } from "../../utils/storage";
import { getLikelist, getUserPlaylist } from "../../service/user";
import { getSongs, getSearch } from "../../service/songs";
import { likeList, playlist } from "../../parameter/refPar";
import router from "../../router";
import createPlaylist from "../components/createPlaylist.vue";
export default {
  setup(props, context) {
    context.emit("returnActive", 2);
    const uid = getStore("id");
    if (uid == null) {
      router.push({ path: "/" });
    }
    // const like = ref(null);
    const store = useStore();
    const active = ref(0);
    const userDetail = computed(() => {
      return store.state.userDetail;
    });
    const like = computed(() => {
      if (!playlist.value) return null;
      return playlist.value.playlist[0];
    });
    const createIndex = computed(() => {
      if (!playlist.value) return null;
      let list = playlist.value.playlist;
      for (let index = 0; index < list.length; index++) {
        if (list[index].userId != uid) {
          return index;
        }
      }
    });
    const createList = computed(() => {
      if (!createIndex.value) return [];
      let list = playlist.value.playlist;
      return list.slice(1, createIndex.value);
    });
    const favoritesList = computed(() => {
      if (!createIndex.value) return [];
      let list = playlist.value.playlist;
      return list.slice(createIndex.value);
    });

    getUserPlaylist(uid).then((res) => {
      playlist.value = res.data;
      console.log(playlist.value.playlist);
    });
    getLikelist(uid).then((res) => {
      likeList.value = res.data.ids;
      // const likeFirst = res.data.ids[0];
      // getSearch(likeFirst).then((res) => {
      //   like.value = res.data.result.songs[0];
      // });
    });

    const goSongsList = () => {
      router.push({
        name: "SongsList",
        params: { id: like.value.id },
      });
    };

    return {
      userDetail,
      like,
      likeList,
      active,
      playlist,
      createIndex,
      createList,
      createPlaylist,
      favoritesList,
      goSongsList,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/my.less";
</style>
