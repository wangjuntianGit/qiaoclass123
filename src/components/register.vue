<template>
  <div class="register">
    <div class="headerbox">
      <my-container>
        <el-container type="flex" flex-direction="column">
          <el-header>
            <!-- 头部logo和导航 -->
            <div class="wrap">
              <el-row>
                <el-col :span="18">
                  <div class="logo">
                    <el-link :underline="false">
                      <img src="../assets/image/logo.png" title="开窍物理" alt />
                    </el-link>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="loginRegist">
                    <span class="login" @click="handelLogin()">登录</span>
                    <span  v-if="$route.query.siteId == 1">|</span>
                    <span class="register" @click="handelLogin()"  v-if="$route.query.siteId == 1">注册</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-header>
        </el-container>
      </my-container>
    </div>
    <my-container>
      <el-container type="flex" flex-direction="column">
        <el-main>
          <div class="wrapmain">
            <div class="main-box">
              <div id="role">
                <span class="Iteacher">重置密码</span>
              </div>
              <el-form ref="form" :model="formData" :rules="rules">
                <el-form-item prop="mobile" required>
                  <el-input v-model="formData.mobile" placeholder="请输入手机号" maxlength="11">
                    <i slot="prefix" class="iconfont xxm-phone"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" required>
                  <el-input
                    style="cursor"
                    type="password"
                    v-model="formData.password"
                    minlength="6"
                    maxlength="20"
                    placeholder="请输入6-20位字母、数字密码"
                    clearable
                  >
                    <i slot="prefix" class="iconfont xxm-dengluzhucemima"></i>
                    <i slot="suffix" class="el-icon-view"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="getCode" required>
                  <el-col :span="14">
                    <el-input
                      v-model="formData.getCode"
                      minlength="4"
                      maxlength="4"
                      placeholder="请输入验证码"
                      clearable
                    >
                      <i slot="prefix" class="iconfont xxm-yanzhengma"></i>
                    </el-input>
                  </el-col>
                  <el-col :span="8" :offset="1">
                    <!-- <el-button type="button" @click="sendcode" :disabled="disabled1" v-if="disabled1==false">发送验证码</el-button>
                                        <el-button type="button" @click="sendcode" :disabled="!disabled2" v-if="disabled2==false">{{btntxt}}</el-button>
                    <el-button type="button" @click="sendcode" :disabled="disabled3" v-if="disabled3==false">重新获取</el-button>-->
                    <el-button type="button" @click="sendcode" :disabled="disabled">{{content}}</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item class="resetpwd">
                  <el-button type="primary" @click="resetSub">重置密码</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-main>
      </el-container>
    </my-container>
    <Footer :isSdcrLook="false">
    </Footer>
  </div>
</template>
<script>
import getCode from '../api/user'
import resetpwd from '../api/user'
import Footer from '@/components/layout/siteFooter'
export default {
  name: 'register',
  data () {
    var checkPhone = function (rule, value, callback) {
      const phoneReg = /^1[34578]\d{9}$/
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      setTimeout(function () {
        if (phoneReg.test(value)) {
          callback()
        } else {
          callback(new Error('电话号码格式不正确'))
        }
      }, 100)
    }
    var checkCode = function (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        return callback()
      }
    }
    let checkpassword = function (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入密码!'))
      } else {
        return callback()
      }
    }
    return {
      canClick: true,
      content: '发送验证码',
      disabled: false,
      totalTime: 60,
      btntxt: '',
      disabled1: false,
      disabled2: true,
      disabled3: true,
      time: '',
      formData: {
        mobile: '',
        getCode: '',
        password: '',
        code: ''
      },
      rules: {
        mobile: [
          { validator: checkPhone, message: '请输入手机号码', trigger: 'blur' }
        ],
        getCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位手机验证码', trigger: 'blur' },
          { validator: checkCode }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '请输入6-20位字母、数字密码',
            trigger: 'blur'
          },
          { validator: checkpassword }
        ]
      }
    }
  },
  methods: {
    handelLogin () {
      this.$router.push({ name: 'login' })
    },
    // 重置密码
    resetSub: function () {
      var that = this
      that.$refs.form.validate(function (valid) {
        if (valid) {
          that.formData.code = that.formData.getCode
          let jsonStr = JSON.stringify(that.formData)
          //    console.log('jsonStr',jsonStr)
          // that.$http.post('http://<?php echo $_SERVER['HTTP_HOST']?>/web/index.php?r=api/resetpwd',{'jsonStr':jsonStr},{emulateJSON:true})
          //     .then(function(res){
          //         console.log('res',res)
          //         if(res.body.status === '1'){
          //             that.$message({message:"密码重置成功",type:'success'})
          //             that.formData.mobile = ''
          //         }else if(res.body.status === '0'){
          //             that.$message({message:"验证码输入错误",type:'success'})
          //             that.formData.getCode = ''
          //         }
          //     })
          resetpwd
            .resetPassword({
              mobile: that.formData.mobile,
              password: that.formData.password,
              code: that.formData.getCode
            })
            .then(res => {
              console.log('ok', res)
              if (res.data.status == 1) {
                that.$message({ message: res.data.info, type: 'success', duration: 1500 })
                that.formData.password = ''
                that.formData.getCode = ''
                localStorage.setItem('selectTimState', 1)
                that.$router.replace({ path: '/login' })
              } else if (res.data.status == 0) {
                that.$message({ message: res.data.info, duration: 1500 })
                that.formData.getCode = ''
              }
            })
        }
      })
    },
    sendcode: function () {
      var that = this
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (that.formData.mobile == '') {
        // that.$message({message:"手机号码不能为空",center:true})
        // return;
      } else if (!reg.test(that.formData.mobile)) {
        // that.$message({message:"请输入正确手机号",center:true})
        // return;
      } else {
        that.disabled1 = false
        that.disabled2 = false
        that.disabled3 = true
        that.time = 60
        that.countDown()
        that.formData.getCode = '1'
        let jsonStr = JSON.stringify(that.formData)

        console.log('tel', that.formData.mobile)
        getCode.getCode({ mobile: that.formData.mobile }).then(res => {
          console.log(res)
        })
        that.formData.getCode = ''
      }
    },
    // 60s倒计时

    countDown () {
      if (!this.canClick) retutn
      this.canClick = false
      this.content = this.totalTime + 's'
      this.disabled = true
      let clock = setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's'
        this.disabled = true
        if (this.totalTime < 0) {
          clearInterval(clock)
          this.content = '重新发送'
          this.totalTime = 60
          this.disabled = false
          this.canClick = true
        }
      }, 1000)
    }
  },
  components: {
    Footer
  },
  mounted () {
    var showPwd = document.getElementsByClassName('el-icon-view')[0]
    // console.log(showPwd)
    showPwd.onmousedown = function () {
      this.parentNode.parentNode.parentNode.firstChild.nextSibling.setAttribute(
        'type',
        'text'
      )
    }
    showPwd.onmouseup = function () {
      this.parentNode.parentNode.parentNode.firstChild.nextSibling.setAttribute(
        'type',
        'password'
      )
    }
  },
  beforeCreate () {
    this.$host = ''
    console.log('this.$host ', this.$host)
    console.log('this.$sdcr ', this.$sdcr)
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  border: 0;
  outline: 0;
}
.register {
  .headerbox {
    background: #fff;
  }
  .wrap {
    height: 60px;
    line-height: 60px;
  }
  img {
    vertical-align: middle;
  }
  .wrapmain {
    width: 100%;
    height: 600px;
    position: relative;
  }
  .main-box {
    padding: 0 20px;
    border-radius: 4px;
    width: 300px;
    height: 340px;
    box-shadow: 8px 8px 8px #e2e6e5;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -180px;
    background-color: #fff;
  }
  #role {
    height: 3.125rem;
    line-height: 3.125rem;
    width: 100%;
    text-align: center;
    padding-bottom: 0.2rem;
    margin-top: 10px;
  }
  .Iteacher {
    font-family: "微软雅黑";
    font-size: 1.125rem;
    color: #222222;
    font-weight: bold;
  }
  .el-button {
    color: #fff;
    background-color: #31bc90;
    border-color: #31bc90;
    padding: 12px 12px;
  }
  .el-button:hover {
    color: #fff;
    border-color: #217b5f;
    background-color: #217b5f;
  }
  .el-button--primary {
    position: relative;
    width: 100%;
    color: #fff;
    background-color: #31bc90;
    border-color: #31bc90;
    letter-spacing: 5px;
    font-size: 16px;
  }
  .el-button--primary:hover {
    color: #fff;
    border-color: #217b5f;
    background-color: #217b5f;
  }
  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    width: 100%;
    /* background-color:#217b5f; */
  }
  .el-button:focus {
    color: #fff;
    background-color: #217b5f;
    border-color: #217b5f;
  }
  .resetpwd {
    margin-top: 32px;
  }
  .el-footer {
    padding: 0;
  }
  .loginRegist {
    .login,
    .register {
      cursor: pointer;
    }
    .login:hover{color:#31bc90;}
    .register:hover{color:#31bc90;}
  }
}
</style>
