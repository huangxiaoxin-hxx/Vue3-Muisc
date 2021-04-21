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
    <searchFixed v-show="showSearchFixed" :searchText="searchText" />
    <div class="content">
      <search-history />
      <div class="mt18">
        <hot-list />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { getSearchDefault } from "../../service/search";
import searchHistory from "../components/searchHistory.vue";
import hotList from "../components/hotList.vue";
import { useRouter } from "vue-router";
import searchFixed from "../components/searchFixed.vue";
export default {
  components: {
    searchHistory,
    hotList,
    searchFixed,
  },
  setup() {
    const searchText = ref(null);
    const searchdefault = ref(null);
    const router = useRouter();
    const showSearchFixed = computed(() => {
      if (searchText.value) {
        return true;
      }
      return false;
    });
    getSearchDefault().then((res) => {
      searchdefault.value = res.data.data.realkeyword;
    });

    const back = () => {
      router.back();
    };

    return {
      searchdefault,
      searchText,
      showSearchFixed,
      back,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/search.less";
</style>