<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { getBingImg } from '@/api/index'

const nowTime = ref<string>('');
const bingImgs = reactive<any>([]);

let timer: number | null | undefined = null;

const nowTimer = (now: Date) => {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
  timer = setInterval(() => {
    nowTime.value = nowTimer(new Date());
  }, 100);

  getBingImg().then(res => {
    console.log(res);

    bingImgs.push(...res.data);
  })
})

onBeforeUnmount(() => {
  clearInterval(timer as number);
})

</script>

<template>
  <main>
    <h2>
      {{ nowTime }}
    </h2>
    <div v-for="item of bingImgs" :key="item.hsh">
      <h3>
        {{ item.title }}
      </h3>
      <h3>
        {{  item.enddate  }}
      </h3>
      <div class="bingImg">
        <img 
          v-if="item.url"
          :src="'https://bing.com' + item.url" alt="" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.bingImg {
  padding: 2px;
  background-color: #fff;
  img {
    width: 240px;
    border-radius: 6px;
    border: solid 1px #000;
  }
}
</style>