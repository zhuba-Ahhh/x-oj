<template>
  <main>
    <header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-image src="src/assets/img/svg/favicon.svg" alt="logo" @click="goToHome" />
        <el-menu-item index="home">
          <el-icon>
            <HomeFilled />
          </el-icon>
          首页
        </el-menu-item>
        <el-menu-item index="problem">
          <el-icon>
            <Grid />
          </el-icon>
          题目
        </el-menu-item>
        <el-menu-item index="train">
          <el-icon>
            <Checked />
          </el-icon>
          训练
        </el-menu-item>
        <el-menu-item index="trophy">
          <el-icon>
            <TrophyBase />
          </el-icon>
          比赛
        </el-menu-item>
        <el-menu-item index="review">
          <el-icon>
            <TrendCharts />
          </el-icon>
          评测
        </el-menu-item>
        <el-sub-menu index="histogram">
          <template #title>
            <el-icon>
              <Histogram />
            </el-icon>
            排名
          </template>
          <el-menu-item index="acm">
            <el-icon>
              <Trophy />
            </el-icon>
            ACM 排名
          </el-menu-item>
          <el-menu-item index="oi">
            <el-icon>
              <Flag />
            </el-icon>
            OI 排名
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="comment">
          <el-icon>
            <Comment />
          </el-icon>
          讨论
        </el-menu-item>
        <el-menu-item index="ours">
          <el-icon>
            <UserFilled />
          </el-icon>
          团队
        </el-menu-item>
        <el-sub-menu index="info">
          <template #title>
            <el-icon>
              <InfoFilled />
            </el-icon>
            关于
          </template>
          <el-menu-item index="introduction">
            <el-icon>
              <ChromeFilled />
            </el-icon>
            简介
          </el-menu-item>
          <el-menu-item index="developer">
            <el-icon>
              <User />
            </el-icon>
            开发者
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="Funs">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            Funs
          </template>
          <el-menu-item index="bing">
            <el-icon>
              <PictureFilled />
            </el-icon>
            bing
          </el-menu-item>
          <el-menu-item index="news">
            <el-icon>
              <BellFilled />
            </el-icon>
            news
          </el-menu-item>
        </el-sub-menu>
        <div class="login">
          <el-button type="primary" class="loginBtn" round auto-insert-space @click="changeIsShowLogin">登陆</el-button>
        </div>
      </el-menu>
    </header>
    <Login v-if="state.loginDialogVisible" @changeIsShowLogin="changeIsShowLogin"></Login>

    <router-view v-slot="{ Component }">
      <keep-alive :max="10">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <el-backtop :bottom="100">
      <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 18px;
        color: #1989fa;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      ">
        <el-icon>
          <Top />
        </el-icon>
        UP
      </div>
    </el-backtop>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, reactive } from 'vue'
import router from '@/router'
import Login from '@/components/Login/index.vue'

const activeIndex = ref('home')
const state = reactive({
  loginDialogVisible: false,
})
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const goToHome = () => {
  router.push({
    path: 'home',
  })
}

const changeIsShowLogin = () => {
  state.loginDialogVisible = !state.loginDialogVisible;
}

</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #49b1f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

a:hover {
  text-decoration-color: #49b1f5;
}

header {
  .el-image {
    width: 26px;
    margin: 0 20px;
  }

  .login {
    right: 13px;
    margin-left: 40px;
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .loginBtn {
      margin-top: 13px;
    }
  }
}

main {
  background-color: #eff3f5;
  height: 100%;
}

.el-icon {
  svg {
    path {
      fill: none;
      stroke: #333333;
      stroke-width: 3;
      stroke-linecap: round;

      @keyframes move {
        0% {
          stroke-dashoffset: 0, 600px;
        }

        100% {
          stroke-dashoffset: 600px, 0;
        }
      }

      &:hover {
        animation: move 1s;
      }
    }
  }
}

.el-menu-demo {
  justify-content: space-between;
}
</style>