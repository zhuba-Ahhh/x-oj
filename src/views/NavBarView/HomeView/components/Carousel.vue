<template>
  <el-card class="box-card">
    <template #header>
      <div class="carousel-top">欢迎使用 X-OJ</div>
    </template>
    <el-carousel>
      <el-carousel-item v-for="item in state.carouselImgArr" :key="item.id">
        <img :src="item.url" :alt="String(item.id)">
        <!-- <div class="carousel-text">{{ item }}</div> -->
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getHomeCarouselImg } from '@/api/home';
import type { carouselImg } from '@/api/home';
import { api } from '@/common/const'

const state = reactive<{
  carouselImgArr: carouselImg[]
}>({
  carouselImgArr: [],
});

onMounted(() => {
  getHomeCarouselImg().then(res => {
    state.carouselImgArr.push(...res.data);
    state.carouselImgArr.forEach((item) => item.url = api(item.url));
  })
})
</script>
<style lang="scss" scoped>
.box-card {
  width: 60vw;

  .el-card__header {
    .carousel-top {
      text-align: center;
      font-weight: 600;
      font-size: 25px;
      font-family: Raleway;
      color: #409eff;
    }
  }

  .el-carousel {
    .el-carousel__container {
      height: 60vh;
    }

    .carousel-text {
      color: #475669;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
      text-align: center;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>