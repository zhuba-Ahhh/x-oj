<template>
  <div class="news">
    <div class="news-top">
      <h1>每日早报</h1>
      <div class="news-img">
        <el-image src="https://bing.icodeq.com" alt="Random picture" lazy>
          <template #placeholder>
            <div class="image-placeholder">
              <div class="placeholder-content"></div>
            </div>
          </template>
        </el-image>
      </div>
    </div>
    <div v-if="(state.news as newsType).news" class="news-title">
      <h2>{{ (state.news as newsType).title + (state.news as newsType).date }}</h2>
    </div>
    <div v-if="(state.news as newsType).news" class="news-main">
      <p v-for="item, index in (state.news as newsType).news" :key="1 + index">
        {{ `${index < 9 ? '0' + (index + 1) : index + 1}、${item}` }} </p>
    </div>
    <div v-if="(state.news as newsType).news" class="news-weiyu">
      <h2>{{ (state.news as newsType).weiyu }}</h2>
    </div>
    <div class="news-change">
      <div class="news-change__box">
        <div class="news-change__button" @click="changeData(1)">前一天</div>
      </div>
      <div class="news-change__box">
        <div class="news-change__button" @click="changeData(0)">切换新闻源</div>
      </div>
      <div class="news-change__box">
        <div class="news-change__button" @click="changeData(-1)">后一天</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { getNews } from '@/api/others/news'
import type { newsParams } from '@/api/others/news'
import { nowTimer } from '@/common/hooks/timer'
import type { newsType } from '@/types/api'

const state = reactive<{
  news: newsType | {},
}>({
  news: {},
});
const nowTime = ref<string>('');

let timer: number | null | undefined = null;

const params: newsParams = reactive({
  index: '0',
  cache: '0',
  origin: 'zhihu'
});

const getData = (params: newsParams, type: number) => {
  getNews(params).then(res => {
    state.news = res.data;
    if (type === 0) {
      ElMessage({
        message: `获取 ${params.origin} 新闻成功 ${(state.news as newsType).date}`,
        type: 'success',
      })
    } else {
      ElMessage({
        message: `${(state.news as newsType).date} `,
        type: 'success',
      })
    }
  })
}

const changeData = (type: number) => {
  if (params.index === '0' && type === -1) {
    ElMessage({
      message: `已经是最新的一天啦～`,
      type: 'warning',
    })
    return;
  }
  if (type === 0) {
    params.origin = params.origin === '163' ? 'zhihu' : '163';
  }
  else params.index = `${Number(params.index) + type} `;
  console.log(params, type);
  getData(params, type);
}

onBeforeMount(() => {
  timer = setInterval(() => {
    nowTime.value = nowTimer(new Date());
  }, 100);

  getData(params, 0)
})

onBeforeUnmount(() => {
  clearInterval(timer as number);
})

</script>

<style lang="scss" scoped>
.news {
  display: flex;
  flex-direction: column;
  align-items: center;

  .news-top {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      text-align: center;
      margin-bottom: 10px;

      &::after {
        content: "";
        display: block;
        border-bottom: 1px solid #49b1f5;
        position: relative;
        top: 0.5rem;
        width: 100%;
      }
    }

    .news-img {
      margin: 1rem 0;
      width: 75%;

      .el-image {
        border-radius: 6px;
      }

      .image-placeholder {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 75%;
        /* 设置占位符的高宽比 */
      }

      .placeholder-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, #f6f7f8, #e2e3e4, #f6f7f8);
        /* 占位符背景颜色 */
        background-size: 200% 100%;
        animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        /* 动画效果 */
      }

      @keyframes pulse {
        0% {
          background-position: 0 50%;
          /* 在开始时设置初始背景位置 */
        }

        50% {
          background-position: 100% 50%;
          /* 在中间点时设置第二个背景位置 */
        }

        100% {
          background-position: 0 50%;
          /* 在结尾时设置最终背景位置 */
        }
      }
    }
  }

  .news-title,
  .news-weiyu {
    width: 75%;
    text-align: center;
    background: #fff;
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
    border: 1px dashed #965221;
    margin-bottom: 1rem;
  }

  .news-main {
    width: 75%;

    p {
      margin-bottom: 1rem;
      font-weight: 500;
    }
  }

  .news-change {
    width: 75%;
    display: flex;
    align-items: center;
    margin: 1rem 0 5rem 0;

    .news-change__box {
      flex: 1;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #1dbbc9;
      font-weight: 500;
      color: #000000;
      cursor: pointer;

      .news-change__button {
        font-weight: 500;
        color: #000000;
      }

      &:active {
        opacity: 0.6;
        transform: scale(0.95);
        transition: transform 0.2s ease-in-out;
      }

      &:hover:before {
        animation: opacityFallbackIn 0s step-start forwards;
        clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
      }

      &:before {
        animation: opacityFallbackOut .5s step-end forwards;
        animation-duration: 0.5s;
        animation-timing-function: step-end;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;
        animation-name: opacityFallbackOut;
        backface-visibility: hidden;
        background-color: #EBEBEB;
        clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transform: translateZ(0);
        transition: clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1), -webkit-clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1);
        width: 100%;
      }
    }
  }
}
</style>