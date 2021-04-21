<template>
  <div class="songs_list_box" :style="{ height: clientHeight - 100 + 'px' }">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { clientHeight } from "../../parameter/refPar";
export default {
  setup() {
    onMounted(async () => {
      clientHeight.value = document.documentElement.clientHeight;
    });
    return {
      clientHeight,
    };
  },
};
</script>

<style lang="less" scoped>
.songs_list_box {
  width: 100%;
  background-color: #151617;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  box-sizing: border-box;
}
</style>