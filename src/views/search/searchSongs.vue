<template>
  <div class="search_container">
    <div class="header flex al_center">
      <van-icon
        name="arrow-left"
        class="back"
        color="#fff"
        size="0.6rem"
        @click="back"
      />
      <input
        class="search_input flex1"
        type="text"
        :placeholder="searchdefault"
        v-model="searchText"
      />
      <van-icon
        name="cross"
        color="#fff"
        class="close"
        size="0.5rem"
        v-show="searchText"
        @click.stop="searchText = null"
      />
    </div>
    <van-tabs
      :active="current"
      background="rgba(0,0,0,0)"
      title-inactive-color="rgba(255,255,255,0.5)"
      title-active-color="#fff"
      swipeable
    >
      <van-tab title="综合">
        <songsListBox>
          <list-scroll class="scroll_box">
            <complexSearch :searchConfirm="searchConfirm" />
          </list-scroll>
        </songsListBox>
      </van-tab>
      <van-tab title="单曲">
        <songsListBox>
          <!-- <list-scroll :scroll-data="playlistDetail.tracks" class="scroll_box">
      </list-scroll> -->
        </songsListBox>
      </van-tab>
      <van-tab title="歌单">
        <songsListBox> 歌单 </songsListBox>
      </van-tab>
      <van-tab title="视频"><songsListBox> 视频 </songsListBox></van-tab>
      <van-tab title="歌手"><songsListBox> 歌手 </songsListBox></van-tab>
      <van-tab title="插单"><songsListBox> 插单 </songsListBox></van-tab>
      <van-tab title="专辑"><songsListBox> 专辑 </songsListBox></van-tab>
      <van-tab title="用户"><songsListBox> 用户 </songsListBox></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getSearchSongs } from "../../service/search";
import { useStore } from "vuex";
import { current } from "../../parameter/refPar";
import songsListBox from "../components/songsListBox.vue";
import complexSearch from "./components/complexSearch.vue";
export default {
  components: {
    songsListBox,
    complexSearch,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const searchText = ref(null);
    const store = useStore();
    const searchConfirm = ref(null);

    searchText.value = route.params.name;
    searchConfirm.value = route.params.name;

    onMounted(async () => {
      getSearchSongs({
        keywords: searchText.value,
      }).then((res) => {
        console.log(res.data.result);
        store.dispatch("searchListAction", {
          result: res.data.result,
          offset: 1,
        });
        console.log(store.getters.SEARCH_LIST);
      });
    });

    const back = () => {
      router.back();
    };

    return {
      searchText,
      back,
      current,
      songsListBox,
      searchConfirm,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/search.less";
</style>