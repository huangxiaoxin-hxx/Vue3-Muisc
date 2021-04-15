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
          <div class="flex al_center" style="margin-bottom: 10px">
            <img
              :src="playlistDetail.creator.avatarUrl"
              class="create_avatar"
            />
            <div class="create_name">{{ playlistDetail.creator.nickname }}</div>
            <van-icon name="arrow" color="#fff" />
          </div>
          <!-- subscribed -->
          <van-button
            color="#d82526"
            :icon="subscribed ? 'success' : 'plus'"
            round
            size="small"
            @click="subscribedFuc"
            :loading="loadingBtn"
            >{{ subscribed ? "已收藏" : "收藏" }}({{
              subscribedCount
            }}人收藏)</van-button
          >
        </div>
      </div>
      <div class="playlist_box" :style="{ height: clientHeight - 200 + 'px' }">
        <list-scroll :scroll-data="playlistDetail.tracks" class="scroll_box">
          <div class="scroll_content">
            <div
              class="play_list"
              v-for="(item, index) in playlistDetail.tracks"
              :key="index"
            >
              <div class="flex al_center" @click="goPlayer(index)">
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
import { reactive, onMounted, toRefs, computed } from "vue";
import { getPlayListDetail, subscribePlayList } from "../../service/songs";
import { clientHeight } from "../../parameter/refPar";
import listScroll from "../../components/ListScroll.vue";
import { Dialog, Toast } from "vant";
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
      subscribed: false,
      subscribedCount: 0,
      loadingBtn: false,
    });
    const updateList = async () => {
      const detail = await getPlayListDetail(state.playlistId);
      state.playlistDetail = detail.data.playlist;
      state.subscribed = detail.data.playlist.subscribed;
      state.subscribedCount = detail.data.playlist.subscribedCount;
    };
    const t = computed(() => {
      if (state.subscribed) {
        return 2;
      } else {
        return 1;
      }
    });
    const subscribedFuc = async () => {
      if (state.subscribed) {
        Dialog.confirm({
          message: "确定不再收藏此歌单吗？",
        })
          .then(async () => {
            // on confirm
            state.loadingBtn = true;
            await subscribePlayList({
              t: t.value,
              id: route.params.id,
            });
            state.loadingBtn = false;
            state.subscribed = !state.subscribed;
            updateList();
          })
          .catch(() => {
            // on cancel
          });
        return;
      }
      state.loadingBtn = true;
      await subscribePlayList({
        t: t.value,
        id: route.params.id,
      });
      Toast.success("收藏成功");
      state.loadingBtn = false;
      state.subscribed = !state.subscribed;
    };
    onMounted(async () => {
      clientHeight.value = document.documentElement.clientHeight;
      updateList();
    });
    const onBack = () => {
      router.back();
    };
    const goPlayer = (index) => {
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
      subscribedFuc,
      t,
      goPlayer,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/songs.less";
</style>