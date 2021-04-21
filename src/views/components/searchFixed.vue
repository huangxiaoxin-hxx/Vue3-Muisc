<template>
  <div class="search_fixed">
    <div
      class="search_list flex al_center"
      v-for="(item, index) in searchList"
      :key="index"
      @click="goSongs(item)"
    >
      <van-icon
        name="search"
        color="#aaa"
        size="0.5rem"
        style="margin-right: 10px"
      />
      <div class="search_list_name ellipsis">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref, watchEffect } from "vue";
import { getSearList } from "../../service/search";
import { useRouter } from "vue-router";
export default {
  props: {
    searchText: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();
    const text = computed(() => {
      return props.searchText;
    });
    const searchList = ref([]);
    function getSearchText(val, wait) {
      return setTimeout(() => {
        console.log("val", val);
        //这里获取keyword，发送请求
        if (val) {
          getSearList(val).then((res) => {
            console.log(res.data.result.songs);
            searchList.value = res.data.result.songs.slice(0, 10);
          });
        }
      }, wait);
    }

    watchEffect((onInvalidate) => {
      let timer = getSearchText(props.searchText, 300); //再重新生成定时器
      onInvalidate(() => {
        //watchEffect里面先执行这个函数，即是清除掉之前的定时器
        clearTimeout(timer);
      });
    });

    const goSongs = (item) => {
      router.push({
        name: "searchSongs",
        params: { id: item.id, name: item.name },
      });
    };
    return {
      text,
      searchList,
      goSongs,
    };
  },
};
</script>

<style lang="less" scoped>
.search_fixed {
  width: 100%;
  position: fixed;
  top: 50px;
  bottom: 0;
  background-color: #151617;
  z-index: 19;
  padding-left: 10px;
  padding-top: 10px;
  box-sizing: border-box;
  .search_list {
    height: 40px;
    color: #fff;
  }
  .search_list_name {
    height: 40px;
    line-height: 40px;
    width: 90%;
    border-bottom: 1px solid rgba(#fff, 0.3);
  }
}
</style>