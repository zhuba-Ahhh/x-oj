<template>
  <el-dialog v-model="state.loginDialogVisible" width="370px" :before-close="handleClose" align-center>
    <template #header>
      <div class="el-dialog__title">
        <span v-if="!state.isRegister && !state.forgetPassword">登陆</span>
        <span v-else-if="!state.forgetPassword">注册</span>
        <span v-else>忘记密码</span>
      </div>
    </template>
    <div v-if="!state.isRegister && !state.forgetPassword" class="login">
      <div class="login-input">
        <el-input v-model="state.userName" autosize clearable placeholder="用户名">
          <template #prefix>
            <el-icon class="el-input__icon">
              <UserFilled />
            </el-icon>
          </template>
        </el-input>
        <el-input v-model="state.keyWord" autosize clearable placeholder="密码" show-password>
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary">登陆</el-button>
      </div>
      <div class="login-bottom">
        <el-link @click="changeIsRegister" type="primary">没有账号</el-link>
        <el-link @click="changeIsForget" type="warning">忘记密码?</el-link>
      </div>
    </div>
    <div v-else-if="!state.forgetPassword" class="register">
      <div class="register-input">
        <el-input v-model="state.userName" autosize clearable placeholder="用户名">
          <template #prefix>
            <el-icon class="el-input__icon">
              <UserFilled />
            </el-icon>
          </template>
        </el-input>
        <el-input v-model="state.email" autosize clearable placeholder="邮箱">
          <template #prefix>
            <el-icon class="el-input__icon">
              <Message />
            </el-icon>
          </template>
        </el-input>
        <el-input v-model="state.keyWord" autosize clearable placeholder="密码" show-password>
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock />
            </el-icon>
          </template>
        </el-input>
        <el-button type="success">注册</el-button>
      </div>
      <div class="register-bottom">
        <el-link @click="changeIsRegister" type="success">已有账号</el-link>
        <el-link @click="changeIsForget" type="warning">忘记密码?</el-link>
      </div>
    </div>
    <div v-else class="forget">
      <div class="forget-input">
        <el-input v-model="state.email" autosize clearable placeholder="请输入邮箱">
          <template #prefix>
            <el-icon class="el-input__icon">
              <Message />
            </el-icon>
          </template>
        </el-input>
        <el-input v-model="state.keyWord" autosize clearable placeholder="请输入验证码">
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock />
            </el-icon>
          </template>
        </el-input>
        <el-button type="warning">发送密码重置邮件</el-button>
      </div>
      <div class="forget-bottom">
        <el-link @click="changeIsRegister" type="primary">咦，好像记得密码? 请尝试登录!</el-link>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['changeIsShowLogin'])

const state = reactive<{
  loginDialogVisible: boolean,
  userName: string,
  keyWord: string,
  email: string,
  isRegister: boolean,
  forgetPassword: boolean,
}>({
  loginDialogVisible: true,
  userName: '',
  keyWord: '',
  email: '',
  isRegister: false,
  forgetPassword: false,
})

const changeIsRegister = () => {
  state.isRegister = !state.isRegister;
  state.forgetPassword = false;
}

const changeIsForget = () => {
  state.isRegister = true;
  state.forgetPassword = true;
}

const handleClose = () => {
  emit('changeIsShowLogin');
}
</script>
<style lang="scss" scoped>
.el-dialog__header {
  .el-dialog__title {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    line-height: 1em;
    color: #4e4e4e;
  }
}

.el-dialog__body {
  .login {
    .login-input {

      .el-input,
      .el-button {
        width: 330px;
        height: 40px;
        margin-bottom: 1rem;
      }
    }

    .login-bottom {
      text-align: right;

      .el-link {
        margin-left: 10px;

        .el-link__inner {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }

  .register {
    .register-input {

      .el-input,
      .el-button {
        width: 330px;
        height: 40px;
        margin-bottom: 1rem;
      }
    }

    .register-bottom {
      text-align: right;

      .el-link {
        margin-left: 10px;

        .el-link__inner {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }

  .forget {
    .forget-input {

      .el-input,
      .el-button {
        width: 330px;
        height: 40px;
        margin-bottom: 1rem;
      }
    }

    .forget-bottom {
      text-align: center;

      .el-link {
        margin-left: 10px;

        .el-link__inner {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }
}
</style>