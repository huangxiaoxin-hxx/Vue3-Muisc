<template>
  <div>
    <div class="yun_loading" v-show="loadingBol">
      <van-loading type="spinner" color="#0094ff" />
    </div>
    <play-song v-show="audioList.length" />
    <router-view />
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import playSong from "./views/player/audioIndex.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    playSong,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const loadingBol = computed(() => {
      return store.state.loadingPage;
    });
    const audioList = computed(() => {
      return store.getters.AUDIO_LIST;
    });

    watch(
      () => route.name,
      () => {
        if (route.name == "Home") {
          console.log(route.name);
          store.commit("setIsHome", true);
        } else {
          console.log(route.name);
          store.commit("setIsHome", false);
        }
      }
    );

    return {
      loadingBol,
      audioList,
    };
  },
};
</script>

<style>
</style>

