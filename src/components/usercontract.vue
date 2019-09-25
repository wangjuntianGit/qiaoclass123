<template>
  <div class="usercontract">
    <div class="headerbox">
        <div class="header">
          <div class="logo">
            <img src="../assets/image/logo.png" />
          </div>
          <div class="loginRegist">
            <span class="login" @click="login()">登录</span>
            <span class="verl">|</span>
            <span class="register" @click="login()">注册</span>
          </div>
        </div>
    </div>
    <div class="main">
        <div class="content">
            <div class="firstL">
            <p class="TCss">用户协议</p>
            </div>
            <div class='detailBox'>
            <div class="one">
            <h3 class="title">一、所有用户必须遵循：</h3>
            <div class="content">
                <p class="txtCss">- 遵守所有使用网络服务的网络协议、规定、程序和惯例；</p>
                <p class="txtCss">- 不得使用开窍课堂网站从事违法活动；</p>
                <p class="txtCss">- 不得干扰或侵犯开窍课堂网站的正常运行和其他用户的正常使用；</p>
                <p class="txtCss">- 未经允许，不得以任何形式下载或试图下载开窍课堂网站的任何内容；</p>
                <p class="txtCss">- 用户购买的课程只允许个人使用，不能用于其他目的；</p>
                <p class="txtCss">- 从中国境内向境外传输技术性资料时不得违反中国有关法律、法规。</p>
            </div>
            </div>
            <div class="two">
            <h3 class='title'>二、同时用户承诺：</h3>
            <div class="content">
                <p class="txtCss">(1)不得利用开窍课堂网络教育平台制作、复制、查阅和传播下列信息：</p>
                <div class="detail">
                <p class="txtCss">-任何非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、淫秽的信息资料；</p>
                <p class="txtCss">-任何教唆他人进行违法犯罪行为的资料；</p>
                <p class="txtCss">-不利于国内团结和社会安定的资料；</p>
                <p class="txtCss">-任何不符合国家法律、法规规定的资料、信息；</p>
                <p class="txtCss">-任何捏造或者歪曲事实，散布谣言，扰乱社会秩序的信息；</p>
                <p class="txtCss">-损害开窍课堂网站的声誉和商业利益的信息；</p>
                </div>

                <p class="txtCss">(2)不得未经许可而非法进入其它个人或组织电脑系统；</p>
                <p class="txtCss">(3)未经允许，不得对开窍课堂网络教育平台中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</p>
                <p class="txtCss">(4)不得故意制作、传播计算机病毒等破坏性程序；</p>
                <p class="txtCss">(5)法律规定的其他义务。</p>
                <p
                class="duty txtCss"
                >如果用户的行为违背上述两款规定，开窍课堂网站可以做出独立判断并有权立即取消用户资格。用户应对自己在开窍课堂网络教育平台上的违法行为承担全部法律责任。</p>
            </div>
            </div>
            <div class="three">
            <h3 class="title">三、基于网络服务的特殊性，用户同意：</h3>
            <div class="content">
                <p class="txtCss">- 在注册时按照注册提示提供准确用户名和密码以及其它个人资料；</p>
                <p
                class="txtCss"
                >- 在个人的注册信息发生变化时，用户应及时更新自己的注册信息，保证其个人资料的详尽和准确。所有用户输入的个人信息将被视作准确表明了用户的身份，并作为开窍课堂网站提供所有服务的有效身份依据。</p>
                <p class="txtCss">- 用户自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置；</p>
                <p class="txtCss">- 用户应自行负担因使用这种接入方式而产生的上网电话费、上网信息费及教育信息费。</p>
            </div>
            </div>
            <div class="four">
            <h3 class="title">四、用户的用户名、密码。</h3>
            <div class="content">
                <p class="txtCss">- 用户一旦注册成功，成为开窍课堂的正式用户后，应当对自己的用户名（亦称帐号）、密码的安全性负全部责任。用户的密码只能由用户自己掌握。</p>
                <p class="txtCss">- 对于用户因帐号或密码泄露造成的各种损失，开窍课堂网站不承担任何责任。用户发现任何非法使用用户帐号的情况，应立即通知开窍课堂网站。</p>
            </div>
            </div>
            </div>
        </div>
    </div>

    <!-- 底部 -->
    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Footer from '@/components/layout/siteFooter'
export default {
  name: 'usercontract',
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.push('/login')
    }
  },
  mounted () {
    var bodyHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    var tHeight = document.getElementsByClassName('header')[0].clientHeight
    var fHeight = document.getElementsByClassName('box')[0].clientHeight
    var Main = document.getElementsByClassName('main')[0]
    Main.style.height = bodyHeight - tHeight - fHeight + 'px'
    console.log('Main高度', Main.style.height)
  },
  components: {
    Footer
  }
}
</script>

<style scoped>
* {
  margin: 0;
  border: 0;
  outline: 0;
  font-family: "微软雅黑";
}
.usercontract .headerbox {
  width:100%;
  margin:0 auto;
  background: #fff;
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 10;
  top:0;
}
.usercontract .header {
  max-width:1200px;
  margin:0 auto;
  height: 60px;
  line-height: 60px;
  background-color: #ffffff;
  display: flex;
}

.usercontract .logo {
  flex: 1;
}

.usercontract .loginRegist {
  /* margin-left: 43.54%; */
  color: #999999;
  float: left;
  font-size: 14px;
  font-family: "微软雅黑";
  font-weight: normal;
}
.usercontract .verl {
  height: 12px;
  line-height: 12px;
}
.usercontract .main {
  width: 100%;
  margin-top: 80px;
  overflow-y: auto;
}
/* .usercontract .content {
  margin-left: 18.7%;
  margin-top: 2%;
  margin-bottom: 5%;
} */
.usercontract .txtCss {
  font-size: 14px;
  font-family: "微软雅黑";
  font-weight: normal;
  line-height: 38px;
}
.usercontract .TCss {
  font-size: 20px;
  font-family: "微软雅黑";
  font-weight: bold;
}
.usercontract .firstL {
  text-align: center;
  padding-top:25px;
}
/*滚动条样式*/
.usercontract .main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.usercontract .main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.usercontract .main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.usercontract .login,
.register {
  cursor: pointer;
}
.usercontract .detailBox>.one,.two,.three,.four{margin-bottom: 10px;}
.usercontract .detailBox>.one > .content > p {
  text-indent: 24px;
}
.usercontract .detailBox>.two > .content {
  text-indent: 25px;
}
.usercontract .detailBox>.two > .content > .detail {
  text-indent: 55px;
}
.usercontract .detailBox>.two > .content > .duty {
  /* text-indent: 30px; */
}
.usercontract .detailBox>.three > .content {
  padding-left: 30px;
}
.usercontract .detailBox>.four>.content{
  text-indent: 30px;
}
.usercontract .main>.content{padding-bottom:40px;max-width: 1200px;background:#fff;margin: 0 auto;}
.usercontract .title{
  color:#333;
  line-height:20px;
  font-size:14px;
  margin-bottom: 3px;
}
.usercontract .content{
  box-shadow: none;
  background:#fff;
  margin-top:0;
  margin-bottom:0;
  width:100%;
  border-radius:0;
}
.usercontract .detailBox{
  padding:20px 40px;
}
.login:hover{
  color:#31bc90;
}
.register:hover{
  color:#31bc90;
}
</style>
