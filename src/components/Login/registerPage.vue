<template>
  <div class="register-wrapper" id="registerBackground">
    <div class="form-wrapper">
      <h1 class="register-title">注册</h1>
      <!-- 注册表单 -->
      <el-form
        class="register-form"
        ref="registerForm"   
        :model="registerForm"
        :rules="registerFormRules"
        label-width="100px"
        hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-username"
            v-model="registerForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="telephone">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            v-model="registerForm.telephone"
            placeholder="手机号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="registerForm.password"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item class="register-btn-form-item">
          <el-button
            class="register-btn"
            type="primary"
            @click="submitForm"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js'

// 配置
const config = {
  color: '64, 158, 255', // 线条颜色
  pointColor: '64, 158, 255', // 节点颜色
  opacity: 0.5, // 线条透明度
  count: 99, // 线条数量
  zIndex: -1 // 画面层级
}

export default {
  name: 'registerPage', // 修改组件名称为 'registerPage'
  data() {
    return {
      registerForm: { // 修改数据属性为 'registerForm'
        username: '',
        telephone: '',
        password: ''
      },
      registerFormRules: { // 修改验证规则属性为 'registerFormRules'
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let element = document.getElementById('registerBackground')
      new CanvasNest(element, config)
    })
  },
  methods: {
    submitForm() {
      console.log('注册信息:', this.registerForm.username, this.registerForm.telephone, this.registerForm.password);
      // 在此处处理注册逻辑，将用户信息发送到服务器进行注册
    }
  }
}
</script>

<style lang="stylus" scoped>
.register-wrapper {
  min-height: calc(100vh - 189px) !important;
  padding-top: 50px;

  .form-wrapper {
    width: 375px;
    margin: 0 auto;
    text-align: center;

    .register-title {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 30px;
      color: #000;
    }

    .register-system {
      font-weight: 300;
      color: #999;
    }

    .register-form {
      width: 100%;
      margin-top: 20px;

      >>> .el-form-item__content {
        margin-left: 0 !important;
      }

      &>>> .el-input__inner {
        font-size: 16px;
      }

      .register-btn-form-item {
        .register-btn {
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
