<template>
  <div class="login_container">
    <div class="logo">
      <img src="../../assets/logo.png" />
    </div>
    <van-tabs
      :active="active"
      background="rgba(0,0,0,0)"
      color="#fff"
      title-inactive-color="rgba(255,255,255,0.5)"
      title-active-color="#fff"
      animated
    >
      <van-tab title="手机号登录">
        <loginPhone />
      </van-tab>
      <van-tab title="邮箱登录">
        <login-email />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import loginPhone from "../../components/login/loginPhone.vue";
import loginEmail from "../../components/login/loginEmail.vue";
export default {
  setup() {
    const active = ref(0);
    return { active };
  },
  components: {
    loginPhone,
    loginEmail,
  },
};
</script>

<style scoped lang="less">
@import "../../common/login.less";
</style>