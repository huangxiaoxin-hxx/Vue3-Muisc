<template>
  <div class="history_box flex al_center">
    <div class="title">历史</div>
    <div class="history_list">
      <div
        class="history_item"
        v-for="(item, index) in list"
        :key="index"
        @click="selectText(item)"
      >
        {{ item }}
      </div>
    </div>
    <van-icon name="delete-o" color="#fff" size="0.6rem" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const list = ref([
      "薛之谦",
      "周杰伦",
      "许嵩",
      "日久生情",
      "陈奕迅",
      "李建",
      "风吹麦浪",
    ]);

    const selectText = (item) => {
      context.emit("selectText", item);
    };

    return {
      list,
      selectText,
    };
  },
};
</script>

<style lang="less" scoped>
.history_box {
  width: 100%;
  height: 30px;
  justify-content: space-between;
  .title {
    width: 8%;
    color: #fff;
    font-size: 14px;
  }
  .history_list {
    width: 80%;
    height: 100%;
    overflow: scroll;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    .history_item {
      margin-right: 10px;
      padding: 0px 10px;
      box-sizing: border-box;
      background-color: #242526;
      color: #fff;
      border-radius: 50px;
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>