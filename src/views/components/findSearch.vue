<template>
  <div class="flex1 flex al_center search_bar" @click="goSearch">
    <van-icon name="search" size="0.5rem" color="rgba(255,255,255,0.8)" />
    <div class="search_text">{{ searchdefault }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "../../router";
import { getSearchDefault } from "../../service/search";
export default {
  setup() {
    const searchdefault = ref(null);
    getSearchDefault().then((res) => {
      searchdefault.value = res.data.data.realkeyword;
    });
    const goSearch = () => {
      router.push({ name: "Search" });
    };
    return {
      searchdefault,
      goSearch,
    };
  },
};
</script>

<style scoped lang="less">
.search_bar {
  background-color: rgba(#aaa, 0.2);
  height: 35px;
  margin-left: 20px;
  border-radius: 50px;
  padding: 0 15px;
}
.search_text {
  margin-left: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}
</style>