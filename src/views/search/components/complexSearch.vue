<template>
  <div class="complex_box">
    <!-- 单曲模块 -->
    <div class="single_box" v-show="checkArr && checkArr.song"></div>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { getSearchType } from "../../../service/search";
import { checkModel } from "../../../methods";
export default {
  props: {
    searchConfirm: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const data = ref(null);
    const modelArr = [
      "song", // 单曲
      "playList", // 歌单
      "video", // 视频
      "album", //专辑
      "artist", // 歌手
      "user", // 用户
    ];
    const checkArr = ref(null);
    getSearchType({
      keywords: props.searchConfirm,
      type: 1018,
    }).then((res) => {
      console.log(res.data);
      data.value = res.data.result;
      // 检测模块数据是否存在
      checkArr.value = checkModel(modelArr, data.value.order);
    });

    const search = computed(() => {
      return props.searchConfirm;
    });

    watch(search, (val) => {
      console.log(val);
      getSearchType({
        keywords: props.searchConfirm,
        type: 1018,
      }).then((res) => {
        console.log(res.data);
      });
    });

    return {
      checkArr,
    };
  },
};
</script>

<style lang="less" scoped>
.single_box {
  width: 100%;
  min-height: 50px;
  background-color: #2a2b2c;
}
</style>