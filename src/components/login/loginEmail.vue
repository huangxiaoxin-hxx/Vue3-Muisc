<template>
  <van-form @submit="onSubmit" class="mt32">
    <van-field
      v-model="state.username"
      name="email"
      label="邮箱"
      placeholder="请输入邮箱"
      :rules="[{ pattern, message: '邮箱有误' }]"
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
import { loginByEmail } from "../../service/login";
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
      store.commit("setLoaidngPageTrue");
      await loginByEmail({
        email: values.email,
        password: values.password,
      });
      store.commit("setLoaidngPageFalse");
    };
    const pattern = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;

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