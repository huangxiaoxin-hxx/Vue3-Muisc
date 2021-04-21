<template>
  <div style="color: #fff">
    <!-- banner -->
    <div class="bgblack">
      <div class="swiper_box">
        <van-swipe
          class="my-swipe"
          style="height: 150px"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item v-for="(item, index) in banners" :key="index">
            <img :src="item.pic" mode="" class="" />
            <div class="label" :class="item.titleColor">
              {{ item.typeTitle }}
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- dragon_ball -->
    <div class="dragon_ball_box">
      <div v-for="(item, index) in ball" :key="index" class="dragon_ball">
        <div class="ball_img">
          <img :src="item.iconUrl" />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend_box">
      <div class="flex al_center mrl10">
        <div class="title flex1">
          {{ recommend && recommend.uiElement.subTitle.title }}
        </div>
        <div class="more flex al_center">
          {{ recommend && recommend.uiElement.button.text
          }}<van-icon name="arrow" />
        </div>
      </div>
      <div class="recommend_scroll">
        <div
          v-for="(item, index) in recommend && recommend.creatives"
          :key="index"
          @click="goList(item.creativeId)"
          class="recommend_item"
        >
          <img
            :src="item.uiElement.image.imageUrl"
            :alt="item.uiElement.mainTitle.title"
          />
          <div class="recommend_item_title">
            {{ item.uiElement.mainTitle.title }}
          </div>
        </div>
      </div>
    </div>
    <!-- 私人定制 -->
    <div class="find_page_box">
      <div class="mrl20">
        <div class="small_title">
          {{
            privateCustom &&
            privateCustom.uiElement.mainTitle &&
            privateCustom.uiElement.mainTitle.title
          }}
        </div>
        <div class="flex al_center">
          <div class="title flex1 flex al_center">
            <van-icon name="replay" @click="flashprivateCustom" />
            {{ privateCustom && privateCustom.uiElement.subTitle.title }}
          </div>
          <div class="more flex al_center">
            <van-icon name="play" />
            {{ recommend && recommend.uiElement.button.text }}
          </div>
        </div>
      </div>
      <van-swipe :loop="false" :width="340" class="private_custom_swiper">
        <van-swipe-item
          v-for="(item, index) in privateCustom && privateCustom.creatives"
          :key="index"
        >
          <div
            class="private_list flex al_center"
            v-for="(song, index2) in item.resources"
            :key="index2"
          >
            <img :src="song.uiElement.image.imageUrl" />
            <div class="song_title">{{ song.uiElement.mainTitle.title }}</div>
            <div
              class="description"
              v-if="song.resourceExtInfo.songData.alias.length"
            >
              ({{ song.resourceExtInfo.songData.alias[0] }})
            </div>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.4)">
              <text>-{{ song.resourceExtInfo.artists[0].name }}</text>
            </div>
          </div>
        </van-swipe-item>
        <template #indicator> </template>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getDragonBall,
  getBlockPage,
  getToplist,
} from "../../service/find";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup(props, context) {
    context.emit("returnActive", 0);
    const router = useRouter();
    const banners = ref(null);
    const ball = ref(null);
    const recommend = ref(null);
    const privateCustom = ref(null);
    getBanner().then((res) => {
      banners.value = res.data.banners;
    });
    getDragonBall().then((res) => {
      ball.value = res.data.data;
      console.log(ball);
    });
    getBlockPage().then((res) => {
      recommend.value = res.data.data.blocks[1];
      privateCustom.value = res.data.data.blocks[2];
    });
    getToplist().then((res) => {
      console.log(res);
    });
    const flashprivateCustom = () => {
      getBlockPage().then((res) => {
        privateCustom.value = res.data.data.blocks[2];
      });
    };
    const goList = (id) => {
      console.log(id);
      router.push({
        name: "FavoritesList",
        params: { id: id },
      });
    };
    return {
      banners,
      ball,
      recommend,
      privateCustom,
      flashprivateCustom,
      goList,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/find.less";
</style>