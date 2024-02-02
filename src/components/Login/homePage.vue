<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-wrapper" id="loginBackground">
    <div class="form-wrapper">
      <h1 class="login-title">登录</h1>
      <!-- 登录表单 -->
      <el-form
        class="login-form"
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="100px"
        hide-required-asterisk
      >
        <el-form-item prop="telephone">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            v-model="loginForm.telephone"
            placeholder="手机号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item class="login-btn-form-item">
          <router-link to="/map">
            <el-button class="login-btn" type="primary">登录</el-button>
          </router-link>
          <div class="header-content">
            <button>忘记密码</button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  
  <script>
import CanvasNest from "canvas-nest.js";

// 配置
const config = {
  color: "64, 158, 255", // 线条颜色
  pointColor: "64, 158, 255", // 节点颜色
  opacity: 0.5, // 线条透明度
  count: 99, // 线条数量
  zIndex: -1, // 画面层级
};

export default {
  name: "homePage",
  data() {
    return {
      loginForm: {
        telephone: "",
        password: "",
      },
      loginFormRules: {
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      let element = document.getElementById("loginBackground");
      new CanvasNest(element, config);
    });
  },
  methods: {
    submitForm() {
      console.log(
        "登录信息:",
        this.loginForm.telephone,
        this.loginForm.password
      );
      // 此处只打印登录信息，不进行实际的登录操作
    },
  },
};
</script>
  
  <style lang="stylus" scoped>
  .login-wrapper {
    min-height: calc(100vh - 189px) !important;
    padding-top: 50px;

    .form-wrapper {
      width: 375px;
      margin: 0 auto;
      text-align: center;

      .login-title {
        margin-bottom: 10px;
        font-weight: 300;
        font-size: 30px;
        color: #000;
      }

      .login-system {
        font-weight: 300;
        color: #999;
      }

      .login-form {
        width: 100%;
        margin-top: 20px;

        >>> .el-form-item__content {
          margin-left: 0 !important;
        }

        &>>> .el-input__inner {
          font-size: 16px;
        }

        .login-btn-form-item {
          .login-btn {
            width: 100%;
          }

          &>>> .el-button {
            padding: 10px 90px;
            font-size: 16px;
          }
        }
      }

      .tip {
        width: 70%;
        margin-left: 86px;
      }
    }
  }
</style>
  