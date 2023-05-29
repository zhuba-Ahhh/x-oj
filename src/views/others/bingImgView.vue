<template>
  <h2 class="nowTime">
    Bing Wallpaper {{ nowTime }}
  </h2>
  <div v-if="state.imgs[0] && state.imgs[0][0] && state.imgs[0][0].url" class="toDayBing">
    <el-image :src="state.imgs[0][0].url" :alt="state.imgs[0][0].title" lazy>
      <template #placeholder>
        <div class="image-placeholder">
          <div class="placeholder-content"></div>
        </div>
      </template>
    </el-image>
  </div>
  <main>
    <div v-for="bingImgs, index in state.imgs" :key="index + 1" class="imgBox">
      <div class="imgBox-title">
        <h2>{{ titleComputed(index) }}</h2>
      </div>
      <div v-for="item of bingImgs" :key="item.hsh" class="imgItem">
        <h4>
          {{ item.title }}
        </h4>
        <div class="bingImg">
          <el-image :src="item.url" :alt="item.title" lazy>
            <template #placeholder>
              <div class="image-placeholder">
                <div class="placeholder-content"></div>
              </div>
            </template>
          </el-image>
        </div>
        <h4>
          {{ timeFormat(item.enddate) }}
          <a target="_blank" rel="noopener" :href="item.url">download 4k</a>
        </h4>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { getBingImg } from '@/api/others/img'
import { timeFormat } from '@/common/tools'
import type { bingImg } from '@/types/api'

const state = reactive<{
  imgs: bingImg[][],
}>({
  imgs: [],
});
const nowTime = ref<string>('');

const titleComputed = (type: number) => {
  return type === 0 ? 'Chinese – China' : type === 1 ? 'English – United Kingdom' : 'Japanese – Japan'
}

const getImgData = () => {
  const nations: string[] = ['zh-CN', 'en-US', 'ja-JP'];
  nations.forEach((nation, index) => {
    getBingImg(nation).then(res => {
      const temp: bingImg[] = [];
      temp.push(...res.data);
      temp.forEach(item =>
        item.url = 'https://bing.com' + item.url
      )
      state.imgs[index] = temp;
    })
  })
}

onBeforeMount(() => {
  getImgData()
})

</script>

<style lang="scss" scoped>
.nowTime {
  text-align: center;
}

.toDayBing {
  display: flex;
  justify-content: center;
  margin-top: 6px;

  .el-image {
    width: 50%;
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

main {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;

  .imgBox {
    width: 33vw;

    .imgBox-title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 12px;
      border: 1px solid #eeeeee;
      vertical-align: middle;
      background: rgba(153, 169, 191, 0.1);
    }

    .imgItem {
      padding: 6px 12px;
      vertical-align: middle;
      border: 1px solid #eeeeee;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .bingImg {
        padding: 2px;
        width: 80%;
        flex: 1;

        img {
          width: 100%;
          border-radius: 6px;
          margin-top: 4px;
          object-fit: cover;
        }
      }
    }
  }
}

a {
  text-decoration: underline transparent;
  color: #49b1f5;
}

a:hover {
  text-decoration-color: #49b1f5;
}
</style>