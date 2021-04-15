<template>
  <div class="container">
    <div class="header flex al_center">
      <van-icon
        name="wap-nav"
        color="#fff"
        size="24"
        badge=""
        @click="showPopup"
      />
      <component :is="headerComp"></component>
    </div>

    <div class="content">
      <!-- <cloud-page> -->
      <component :is="currentComp" @returnActive="returnActive"></component>
      <!-- </cloud-page> -->
    </div>
    <van-tabbar
      v-model="active"
      @change="onChange"
      :border="false"
      active-color="#bb423f"
    >
      <van-tabbar-item icon="fire">发现</van-tabbar-item>
      <van-tabbar-item icon="tv-o">播客</van-tabbar-item>
      <van-tabbar-item icon="music">我的</van-tabbar-item>
      <van-tabbar-item icon="service">K歌</van-tabbar-item>
      <van-tabbar-item icon="friends">云村</van-tabbar-item>
    </van-tabbar>
    <van-popup
      @click-overlay="clickOverlay"
      :show="show"
      position="left"
      :style="{
        width: '80%',
        height: '100vh',
        background: '#151617',
        color: '#fff',
      }"
    >
      <div class="flex userinfo al_center">
        <img :src="userDetail.avatarUrl" />
        <div class="name">{{ userDetail.nickname }}</div>
        <van-icon name="arrow" size="0.4rem" />
      </div>
      <div class="login_out">
        <button class="login_out_btn" @click="loginOut">退出账号</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { current, show, userDetail } from "../parameter/refPar";
import { onMounted, ref, computed } from "vue";
import findPage from "./homePage/findPage.vue";
import bokePage from "./homePage/bokePage.vue";
import myPage from "./homePage/myPage.vue";
import kmusicPage from "./homePage/kmusicPage.vue";
import cloudVillage from "./homePage/cloudVillage.vue";
import findSearch from "./components/findSearch.vue";
import { getUserInfo, getUserDetail } from "../service/user";
import { setStore } from "../utils/storage";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    let userId = null;
    onMounted(async () => {
      let userinfo = await getUserInfo();
      userId = userinfo.data.account.id;
      setStore("id", userId);
      getUserDetail(userId).then((res) => {
        userDetail.value = res.data.profile;
        store.commit("setUserDetail", res.data);
      });
    });

    const active = ref(0);
    const onChange = (index) => {
      current.value = index;
      console.log(current);
    };

    const showPopup = () => {
      show.value = true;
    };
    const currentComp = computed(() => {
      switch (current.value) {
        case 0:
          return findPage;
        case 1:
          return bokePage;
        case 2:
          return myPage;
        case 3:
          return kmusicPage;
        case 4:
          return cloudVillage;
      }
    });
    const headerComp = computed(() => {
      switch (current.value) {
        case 0:
          return findSearch;
        case 1:
          return;
        case 2:
          return;
        case 3:
          return;
        case 4:
          return;
      }
    });
    const clickOverlay = () => {
      show.value = false;
    };
    const returnActive = (value) => {
      active.value = value;
    };
    const loginOut = () => {
      store.dispatch("loginOut");
    };
    return {
      onChange,
      active,
      currentComp,
      show,
      showPopup,
      clickOverlay,
      userDetail,
      headerComp,
      returnActive,
      loginOut,
    };
  },
};
</script>

<style>
body {
  background-color: #212223;
}
</style>

<style lang="less" scoped>
@import "../common/home.less";

.van-tabbar {
  background-color: #1c1d21;
}
.van-tabbar-item--active {
  background-color: #1c1d21;
}
</style>
