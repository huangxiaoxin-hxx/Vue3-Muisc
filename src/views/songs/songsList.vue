<template>
  <div>
    <div class="header flex al_center">
      <van-icon name="arrow-left" color="#fff;" size="0.6rem" @click="onBack" />
      <div class="list_title">歌单</div>
    </div>

    <div
      v-if="playlistDetail"
      class="songs_top_box"
      :style="{ backgroundImage: 'url(' + playlistDetail.coverImgUrl + ')' }"
    ></div>

    <div class="container" v-if="playlistDetail">
      <div class="flex top_box_info">
        <img :src="playlistDetail.coverImgUrl" />
        <div>
          <div class="playlist_name">{{ playlistDetail.name }}</div>
          <div class="flex al_center">
            <img
              :src="playlistDetail.creator.avatarUrl"
              class="create_avatar"
            />
            <div class="create_name">{{ playlistDetail.creator.nickname }}</div>
            <van-icon name="arrow" color="#fff" />
          </div>
        </div>
      </div>
      <div class="playlist_box" :style="{ height: clientHeight - 200 + 'px' }">
        <list-scroll :scroll-data="playlistDetail.tracks" class="scroll_box">
          <div class="scroll_content">
            <div
              class="play_list"
              v-for="(item, index) in playlistDetail.tracks"
              :key="index"
              @click="goPlayer(index)"
            >
              <div class="flex al_center">
                <div class="playlist_index">{{ index + 1 }}</div>
                <div class="flex1">
                  <div class="song_name">{{ item.name }}</div>
                  <div class="song_description flex">
                    <div class="al_name_box">
                      <div v-for="(singer, index2) in item.ar" :key="index2">
                        {{ index2 == 0 ? singer.name : "/" + singer.name }}
                      </div>
                    </div>
                    <div class="al_name">- {{ item.al.name }}</div>
                  </div>
                </div>
                <van-icon name="ellipsis" size="0.5rem" />
              </div>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, toRefs } from "vue";
import { getPlayListDetail } from "../../service/songs";
import { clientHeight } from "../../parameter/refPar";
import listScroll from "../../components/ListScroll.vue";
import { setStore, getStore } from "../../utils/storage";
import { useStore } from "vuex";
export default {
  components: {
    listScroll,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    if (route.params.id) {
      setStore("playlistId", route.params.id);
    }
    const state = reactive({
      playlistId: getStore("playlistId"),
      playlistDetail: null,
    });

    onMounted(async () => {
      clientHeight.value = document.documentElement.clientHeight;
      const detail = await getPlayListDetail(state.playlistId);
      console.log(detail);
      state.playlistDetail = detail.data.playlist;
    });
    const onBack = () => {
      router.back();
    };
    const goPlayer = (index) => {
      console.log(state.playlistDetail.tracks);
      store.dispatch("selectPlay", {
        list: state.playlistDetail.tracks,
        index,
      });
      console.log(store.state.playList);
    };

    return {
      ...toRefs(state),
      onBack,
      clientHeight,
      goPlayer,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/songs.less";
</style>