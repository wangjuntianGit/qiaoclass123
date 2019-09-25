<template>
    <div class='box siteFooter'>
       <div class="level01" slot="qiaoclassFooter"  v-if="$host != $sdcr">
            <div class="wraBox">
                <my-container>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="9">
                            <div class="logo">
                                <el-link :underline="false" href="">
                                    <img src="../../assets/image/logo.png" />
                                </el-link>
                            </div>
                        </el-col>
                        <el-col :span="10" type="flex" flex-direction="column" class="contactUs">
                            <el-link :underline="false" title ><span>联系我们</span>/CONTACT US</el-link>
                            <P>电话：029-85211230</P>
                            <P>地址：陕西省西安市碑林区南二环79号广丰国际大厦二区2308</P>
                        </el-col>
                        <el-col :span="7" type="flex" flex-direction="row" justify="space-around" class="contactNum">
                            <el-col :span="3">
                                <el-link :underline="false">
                                    <img src="../../assets/image/weibo.png" alt="weibo" title="微博">
                                </el-link>
                            </el-col>
                            <el-col :span="3">
                                <el-link :underline="false">
                                    <img src="../../assets/image/qq.png" alt="qq" title="QQ">
                                </el-link>
                            </el-col>
                            <el-col :span="3" class="wechat_icon" >
                                <img src="../../assets/image/wechat.png" alt="wechat" title="微信公众号" >
                                <img class="qrcode" src="../../assets/image/wechat_icon.jpg" alt="公众号二维码" >
                            </el-col>
                        </el-col>
                    </el-row>
                </my-container>
            </div>
        </div>
        <div class="chaoranschoolFooter" slot="chaoranschoolFooter" v-if="$host == $sdcr && isSdcrLook == true">
              <h5>学校地址：山东省诸城市土墙工业园横二路和纵一路交界处</h5>
              <h5>联系电话：0536-6187999</h5>
        </div>
        <div class="level02 wrapbottom">
            <div class="wrap">
                <el-col>© Copyright 西安小虾米教育科技有限公司 版权所有 陕ICP备19001588号</el-col>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'vfooter',
  props: ['isSdcrLook'],
  data () {
    return {
      seen: false
    }
  },
  computed: {

  },
  methods: {
    showQr () {
      this.seen = true
    },
    hideQr () {
      this.seen = false
    }
  }
}
</script>
<style lang='scss' scoped>
    .siteFooter{
        position: fixed;bottom:-1px;width: 100%;
        .level01{
            width:100%;
            height:130px;
            background:#373A39;
            .contactUs{
                .el-link{
                   letter-spacing: 1px;
                }
                line-height:32px;
                p{color:#999;margin:0;font-size:12px;letter-spacing: 1px;line-height:28px;}
                span{color:#fff;letter-spacing: 1px;line-height:28px;}
                }
            .wechat_icon{
                position:relative;
                .qrcode{
                    width:100px;
                    position: absolute;
                    top:36px;left:12px;
                    display: none;
                    }
                img:nth-child(1):hover + img{display: block;}
                }
            }
        .wrapbottom{
            width: 100%;
            height:60px;
            line-height:60px;
            text-align:center;
            background:#232625;
            color:#999;
            .wrap{font-size:14px;}
        }
        .chaoranschoolFooter{
            margin-top: 20px;
            h5{
                text-align: center;
                font-size: 18px;
                font-weight: normal;
                line-height: 40px;
                margin:10px 0;
                :last-child{margin-bottom: 90px;}
                }
            }
    }
</style>
