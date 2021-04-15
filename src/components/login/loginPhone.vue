<template>
  <van-form @submit="onSubmit" class="mt32">
    <van-field
      v-model="state.username"
      name="phone"
      label="手机号"
      placeholder="请输入手机号"
      :rules="[{ pattern, message: '手机号有误' }]"
    />
    <van-field
      v-model="state.password"
      type="password"
      name="password"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        color="#fff"
        native-type="submit"
        style="color: #de4034"
      >
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { loginByPhone } from "../../service/login";
import { getTest } from "../../service/home";
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    onMounted(() => {
      getTest();
    });
    const store = useStore();
    const state = reactive({
      username: "",
      password: "",
    });
    const onSubmit = async (values) => {
      store.commit("setLoaidngPageTrue", true);
      await loginByPhone({
        phone: values.phone,
        password: values.password,
      });
      store.commit("setLoaidngPageFalse", false);
    };
    const pattern = /^[1]([3-9])[0-9]{9}$/;

    return {
      state,
      onSubmit,
      pattern,
    };
  },
};
</script>

<style>
</style>