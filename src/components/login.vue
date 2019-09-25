<template>
  <div class="login">
    <div class="headerBox" v-if="$host != $sdcr">
      <my-container>
        <el-container>
          <el-header>
            <div class="wrap">
              <el-row type="flex" flex-direction="column">
                <el-col :span="6">
                  <div class="logo">
                    <el-link :underline="false" href>
                      <img src="../assets/image/logo.png" title="开窍物理" />
                    </el-link>
                  </div>
                </el-col>
                <el-col :span="8" class="floatRight"></el-col>
              </el-row>
            </div>
          </el-header>
        </el-container>
      </my-container>
    </div>
    <div class="mainBox loginBoxHeight" v-if="$host != $sdcr">
      <my-container>
        <el-container type="flex" flex-direction="column">
          <el-main>
            <div class="wrapMain">
              <!-- qiaoclass的注册登录模块 -->
              <div class="frontBacks">
                <!-- <el-row>
                  <el-col >
                    <el-card> -->
                      <!-- <el-tabs v-model="activeItem" @tab-click="selectItem">
                        <el-tab-pane label="注册" name="register">
                          <el-form ref="formregister" :model="formregister" :rules="rules">
                            <el-form-item prop="mobile">
                              <el-input
                                v-model="formregister.mobile"
                                placeholder="请输入手机号"
                                maxlength="11"
                                clearable
                              >
                                <i slot="prefix" class="iconfont xxm-phone"></i>
                              </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                              <el-input
                                style="cursor:pointer;"
                                type="password"
                                class="regPwd"
                                v-model="formregister.password"
                                minlength="6"
                                maxlength="20"
                                placeholder="请输入6-20位字母、数字密码"
                                clearable
                              >
                                <i slot="prefix" class="iconfont xxm-dengluzhucemima"></i>
                                <i slot="suffix" class="el-icon-view"></i>
                              </el-input>
                            </el-form-item>
                            <el-form-item prop="code" style="margin-bottom:20px;">
                              <el-col :span="13">
                                <el-input
                                  v-model="formregister.code"
                                  minlength="4"
                                  maxlength="4"
                                  placeholder="请输入验证码"
                                  clearable
                                >
                                  <i slot="prefix" class="iconfont xxm-yanzhengma"></i>
                                </el-input>
                              </el-col>
                              <el-col :span="9" :offset="2">
                                <el-button
                                  type="button"
                                  @click="sendcode"
                                  :disabled="disabled"
                                >{{content}}</el-button>
                              </el-col>
                            </el-form-item>

                            <el-form-item class="userdeal">
                              <el-row type="flex" justify="center">
                                <el-col :span="24" style="font-size:12px;">
                                  <el-checkbox v-model="kqchecked" style="margin-right:0px;">我同意开窍物理</el-checkbox>
                                  <router-link
                                    style="line-height:0;color:#31bc90;font-weight:bold;"
                                    :underline="false"
                                    to="/usercontract"
                                  >用户协议</router-link>
                                </el-col>
                              </el-row>
                            </el-form-item>
                            <el-form-item>
                              <el-button ref="regbtn" type="primary" @click="register">注册并登录</el-button>
                            </el-form-item>
                          </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="登录" name="login">
                          <el-form ref="formlogin" :model="formlogin" :rules="rules">
                            <el-form-item prop="mobile">
                              <el-input
                                v-model="formlogin.mobile"
                                maxlength="11"
                                placeholder="请输入手机号"
                                clearable
                                @keyup.enter.native="login"
                              >
                                <i slot="prefix" class="iconfont xxm-phone"></i>
                              </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                              <el-input
                                style="cursor:pointer"
                                type="password"
                                v-model="formlogin.password"
                                minlength="6"
                                maxlength="20"
                                placeholder="请输入密码"
                                clearable
                                @keyup.enter.native="login"
                              >
                                <i slot="prefix" class="iconfont xxm-dengluzhucemima"></i>
                                <i slot="suffix" class="el-icon-view"></i>
                              </el-input>
                            </el-form-item>
                            <el-form-item style="margin-bottom:6px;text-align:center;">
                              <el-row type="flex" justify="space-around">
                                <el-col :span="10">
                                  <el-checkbox
                                    style="line-height:0;"
                                    v-model="formlogin.rememberpassword"
                                    label="1"
                                  >记住密码</el-checkbox>
                                </el-col>
                                <el-col :span="10">
                                  <router-link
                                    class="fetpwd"
                                    style="line-height:0;"
                                    :underline="false"
                                    :to="{name:'register', query:{siteId:1}}"
                                  >忘记密码？</router-link>
                                </el-col>
                              </el-row>
                            </el-form-item>
                            <el-form-item>
                              <el-button type="primary" @click="login">登录</el-button>
                            </el-form-item>
                          </el-form>
                        </el-tab-pane>
                      </el-tabs>-->
                      <!-- 开窍物理登录 -->
                      <div  class="loginMain_kaiqiao" style='width:300px'>
                        <h3>登录</h3>
                        <el-form ref="formlogin" :model="formlogin" :rules="rules">
                          <el-form-item prop="mobile">
                            <el-input
                              v-model="formlogin.mobile"
                              maxlength="11"
                              placeholder="请输入手机号"
                              clearable
                              @keyup.enter.native="login"
                            >
                              <i slot="prefix" class="iconfont xxm-phone"></i>
                            </el-input>
                          </el-form-item>
                          <el-form-item prop="password">
                            <el-input
                              style="cursor:pointer"
                              type="password"
                              v-model="formlogin.password"
                              minlength="6"
                              maxlength="20"
                              placeholder="请输入密码"
                              clearable
                              @keyup.enter.native="login"
                            >
                              <i slot="prefix" class="iconfont xxm-dengluzhucemima"></i>
                              <i slot="suffix" class="el-icon-view"></i>
                            </el-input>
                          </el-form-item>
                          <el-form-item style="margin-bottom:6px;text-align:center;">
                            <el-row type="flex" justify="space-around">
                              <el-col :span="10">
                                <el-checkbox
                                  style="line-height:0;"
                                  v-model="formlogin.rememberpassword"
                                  label="1"
                                >记住密码
                                </el-checkbox>
                              </el-col>
                              <el-col :span="10">
                                <router-link
                                  class="fetpwd"
                                  style="line-height:0;"
                                  :underline="false"
                                  :to="{name:'register', query:{siteId:2}}"
                                >忘记密码？</router-link>
                              </el-col>
                            </el-row>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="login">登录</el-button>
                          </el-form-item>
                        </el-form>
                      </div>
                    <!-- </el-card>
                  </el-col>
                </el-row> -->
              </div>
            </div>
          </el-main>
        </el-container>
      </my-container>
    </div>
    <!-- 超然中学单独的登录 -->
    <div class="chaoranschool loginBoxHeight" v-if="$host == $sdcr">
      <el-row>
        <img
          src="https://xxm-common.oss-cn-qingdao.aliyuncs.com/chaoran_logo.png"
          alt="山东超然中学"
          width="100px"
          class="sdchaoranLogin"
        />
      </el-row>

      <div :span="7" class="loginMain">
        <h3>登录</h3>
        <el-form ref="formlogin" :model="formlogin" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              v-model="formlogin.mobile"
              maxlength="11"
              placeholder="请输入手机号"
              clearable
              @keyup.enter.native="login"
            >
              <i slot="prefix" class="iconfont xxm-phone"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="cursor:pointer"
              type="password"
              v-model="formlogin.password"
              minlength="6"
              maxlength="20"
              placeholder="请输入密码"
              clearable
              @keyup.enter.native="login"
            >
              <i slot="prefix" class="iconfont xxm-dengluzhucemima"></i>
              <i slot="suffix" class="el-icon-view"></i>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:6px;text-align:center;">
            <el-row type="flex" justify="space-around">
              <el-col :span="10">
                <el-checkbox
                  style="line-height:0;"
                  v-model="formlogin.rememberpassword"
                  label="1"
                >记住密码</el-checkbox>
              </el-col>
              <el-col :span="10">
                <router-link
                  class="fetpwd"
                  style="line-height:0;"
                  :underline="false"
                  :to="{name:'register', query:{siteId:2}}"
                >忘记密码？</router-link>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chaoranschoolFooter" v-if="$host == $sdcr">
      <h5>学校地址：山东省诸城市土墙工业园横二路和纵一路交界处</h5>
      <h5>联系电话：0536-6187999</h5>
    </div>
    <Footer :isSdcrLook="false"></Footer>
  </div>
</template>

<script>
import getCode from '../api/user'
import personal from '../api/personal.js'
import Auth from '../services/auth'
import userApi from '../api/user'
import Footer from '@/components/layout/siteFooter'
export default {
  name: 'login',
  components: {
    Footer
  },
  data () {
    // 手机号验证
    let checkmobile = (rule, value, callback) => {
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!value) {
        callback(new Error('请输入手机号码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        return callback() // 这里加入回调函数，不然在掉接口前的$this.$refs不起作用
      }
    }
    // 这里定义blur事件，在清空后，错误信息提示会立刻出现，不然要等到获取焦点然后失去焦点才会提示错误信息
    let checkpassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        return callback()
      }
    }
    let checkcode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        return callback()
      }
    }
    return {
      $host: this.$host,
      canClick: true,
      content: '发送验证码',
      disabled: false,
      totalTime: 60,
      activeItem: 'login',
      disabled1: false,
      disabled2: true,
      disabled3: true,
      seen: false,
      time: '',
      btntxt: '',
      kqchecked: true,
      formlogin: {
        mobile: '',
        password: '',
        role: '1',
        rememberpassword: true
      },
      formregister: {
        mobile: '',
        password: '',
        role: '1',
        code: ''
      },
      // 验证规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkmobile }
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
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位手机验证码', trigger: 'blur' },
          { validator: checkcode }
        ]
      }
    }
  },
  mounted () {
    // 计算中间部分的高度
    this.initHeight()
    // 控制密码显隐
    let ShowPwd = document.getElementsByClassName('el-icon-view')
    let regShowPwd = ShowPwd[0]
    regShowPwd.onmousedown = function () {
      let inputTxt = this.parentNode.parentNode.parentNode.firstChild
        .nextSibling
      inputTxt.setAttribute('type', 'text')
    }
    regShowPwd.onmouseup = function () {
      let inputTxt = this.parentNode.parentNode.parentNode.firstChild.nextSibling
      inputTxt.setAttribute('type', 'password')
    }
    let loginShowPwd = ShowPwd[1]
    if (loginShowPwd) {
      loginShowPwd.onmousedown = function () {
        let inputTxt = this.parentNode.parentNode.parentNode.firstChild.nextSibling
        inputTxt.setAttribute('type', 'text')
      }
      loginShowPwd.onmouseup = function () {
        let inputTxt = this.parentNode.parentNode.parentNode.firstChild.nextSibling
        inputTxt.setAttribute('type', 'password')
      }
    }
  },
  methods: {
    initHeight () {
      let cHeight = document.documentElement.clientHeight || document.body.clientHeight
      let mainHeight = document.getElementsByClassName('loginBoxHeight')
      let fHeight = document.getElementsByClassName('siteFooter')[0]
        .offsetHeight
      if (this.$host != this.$sdcr) {
        let navHeight = document.getElementsByTagName('header')[0].offsetHeight
        mainHeight[0].style.height = cHeight - navHeight - fHeight + 'px'
      } else if (this.$host == this.$sdcr) {
        mainHeight[0].style.height = cHeight - 30 - 170 - fHeight + 'px'
      }
    },
    showQr () {
      this.seen = true
    },
    hideQr () {
      this.seen = false
    },
    getProfile () {
      let params = {}
      personal
        .getProfile(params)
        .then(res => {
          if (res.data.status == 1) {
            this.info = Object.assign(res.data.data, {})
            // 向vuex提交头像地址
            this.$store.dispatch('common/setImgSrc', this.info.avatar)

            this.$store.dispatch('common/setMyInfo', this.info)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    login () {
      this.$refs.formlogin.validate(valid => {
        if (valid) {
          if (this.$host == this.$sdcr) {
            // 超然中学siteid为2
            this.formlogin.siteid = 2
          } else {
            //   其他siteid为1
            this.formlogin.siteid = 1
          }
          userApi.getLogin(this.formlogin).then(res => {
            if (res.data.status == 1) {
              Auth.login(res.data.data.access_token)
              this.$message({
                message: res.data.info,
                center: true,
                type: 'success',
                duration: 1500
              })
              this.getProfile()
              localStorage.setItem('selectTimState', 0)
              this.$router.replace({ path: '/siteresources/index' })
            } else if (res.data.status == 0) {
              this.$message({
                message: res.data.info,
                center: true,
                duration: 1500
              })
              this.formlogin.mobile = ''
              this.formlogin.password = ''
            }
          })
        } else {
          console.log('error')
          return false
        }
      })
    },
    register () {
      if (this.kqchecked == false) {
        this.$message({
          message: '您还未同意用户协议',
          duration: 1500
        })
        return
      }
      this.$refs.formregister.validate(valid => {
        if (valid) {
          console.log(this.formregister)
          userApi.getRegister(this.formregister).then(res => {
            console.log('res', res)
            if (res.data.status == 1) {
              userApi
                .getLogin({
                  mobile: this.formregister.mobile,
                  password: this.formregister.password,
                  rememberpassword: true,
                  role: '1'
                })
                .then(res => {
                  if (res.data.status == 1) {
                    Auth.login(res.data.data.access_token)
                    this.$message({
                      message: res.data.info,
                      center: true,
                      type: 'success',
                      duration: 1500
                    })
                    this.getProfile()
                    localStorage.setItem('selectTimState', 0)
                    this.$router.replace({ path: '/siteresources/index' })
                  } else if (res.data.status == 0) {
                    this.$message({
                      message: res.data.info,
                      center: true,
                      duration: 1500
                    })
                  }
                })
            } else if (res.data.status == 0) {
              this.$message({
                message: res.data.info,
                center: true,
                duration: 1500
              })
            }
          })
        } else {
          console.log('error')
          return false
        }
      })
    },
    sendcode: function () {
      let that = this
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (that.formregister.mobile == '') {

      } else if (!reg.test(that.formregister.mobile)) {

      } else {
        that.disabled1 = false
        that.disabled2 = false
        that.disabled3 = true
        getCode
          .getCode({ mobile: that.formregister.mobile, source: 0 })
          .then(res => {
            console.log('获取验证码', res)
            if (res.data.status == 1) {
              that.time = 60
              that.countDown()
              that.formregister.getCode = '1'
              let jsonStr = JSON.stringify(that.formregister)
              this.$message({
                message: res.data.info,
                center: true,
                type: 'success',
                duration: 1500
              })
            } else if (res.data.status == 0) {
              this.$message({
                message: res.data.info,
                center: true,
                duration: 1500
              })
            }
          })
        that.formregister.getCode = ''
      }
    },
    // 60s倒计时
    countDown () {
      if (!this.canClick) return
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
  }
}
</script>
<style lang="scss">
.login {
  position: relative;
  height: 100%;
  .el-tabs__nav {
    width: 100% !important;
  }
  .el-tabs__active-bar {
    width: 50% !important;
  }
  .el-tabs__item {
    width: 50%;
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-align: center;
  }
  .el-tabs__active-bar {
    background: #31bc90;
  }
  .el-tabs__item:hover,
  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: #31bc90;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-button {
    width: 100%;
    background: #31bc90;
    color: #fff;
  }
  .el-row--flex.is-justify-space-around {
    justify-content: center;
  }
  input.el-input__inner {
    border-radius: 4px;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #31bc90;
    outline: 0;
  }
  .el-button:focus,
  .el-button:hover {
    color: #fff;
    border-color: #217b5f;
    background-color: #217b5f;
  }

  .el-button:active {
    color: #ccc;
    border-color: #5f6265;
    background-color: #217b50;
    outline: 0;
  }
  .el-button--primary {
    color: #fff;
    background-color: #31bc90;
    border-color: #31bc90;
    letter-spacing: 5px;
    font-size: 16px;
    height: 40px;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #31bc90;
    background: #31bc90;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #31bc90;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #31bc90;
    border-color: #31bc90;
  }
  .el-link.el-link--default:hover {
    color: #606266;
  }
  .userdeal {
    text-align: center;
    margin-bottom: 6px;
  }
  .userdeal .el-checkbox__label {
    font-size: 12px;
  }
  .userdeal .el-link.el-link--default {
    font-size: 12px;
    color: #31bc90;
    font-weight: bold;
  }
  .el-button .el-button--primary:focus {
    color: #fff;
    background-color: #31bc90;
    border-color: #31bc90;
  }
  .el-card__body {
    padding: 15px;
  }

  .frontBacks .el-row--flex.is-justify-space-aroun {
    text-align: center;
  }
  .headerBox {
    height: 60px;
    line-height: 60px;
    background: white;
  }
  .mainBox {
    padding-top: 20px;
    padding-right: 80px;
    background: url("https://xxm-common.oss-cn-qingdao.aliyuncs.com/login_bg.png");
  }
  a {
    text-decoration: none;
    color: #606266;
  }
  a:hover {
    color: #31bc90;
  }
  .chaoranschool {
    position: relative;
    width: 62.5%;
    margin: 0 auto;
    background: url("https://xxm-common.oss-cn-qingdao.aliyuncs.com/chaoran_login_bg.png") no-repeat;
    background-size: cover;
    background-position: 50%;
  }
  .loginMain {
    position: absolute;
    background: hsla(0, 0%, 100%, 0.94);
    right: 30px;
    bottom: 45px;
    padding: 20px 20px 0px;
    border-radius: 4px;
    width: 300px;
  }
  .loginMain h3,.login_kaiqiao h3 {
    text-align: center;
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0px auto 20px;
  }
  .sdchaoranLogin {
    margin: 0px 10px 0 40px;
  }
  .chaoranschoolFooter {
    margin-top: 62px;
  }
  .chaoranschoolFooter h5 {
    text-align: center;
    font-size: 18px;
    font-weight: normal;
    line-height: 40px;
    margin: 10px 0;
  }
  .chaoranschoolFooter h5:last-child {
    margin-bottom: 90px;
  }
  .loginMain_kaiqiao{
    background: #fff;
    width: 300px;
    padding: 20px 20px 20px;
    border-radius: 4px;
    position:absolute ;
    right: 300px;
    h3{
      text-align: center;
      font-size: 18px;
      margin: 0 auto 20px;
    }
  }
}
</style>
