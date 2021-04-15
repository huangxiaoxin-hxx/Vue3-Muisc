<template>
  <div class="search_container">
    <div class="header flex al_center">
      <van-icon name="arrow-left" class="back" color="#fff" size="0.6rem" />
      <input
        class="search_input flex1"
        type="text"
        :placeholder="searchdefault"
        v-model="searchText"
      />
    </div>
    <div class="content">
      <search-history />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSearchDefault } from "../../service/search";
import searchHistory from "../components/searchHistory.vue";
export default {
  components: {
    searchHistory,
  },
  setup() {
    const searchText = ref(null);
    const searchdefault = ref(null);
    getSearchDefault().then((res) => {
      searchdefault.value = res.data.data.realkeyword;
    });

    return {
      searchdefault,
      searchText,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/search.less";
</style>