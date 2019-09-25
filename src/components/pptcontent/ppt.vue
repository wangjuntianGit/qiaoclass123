<template>
    <div class="pptdetail">
         <div style='background:#f5f5f5'>
            <my-container>
                <div class="ppt">
                    <el-row>
                        <el-col :md="4" :xl="5">
                            <div class="menu">
                                <div class="firstlevel" v-for="(item,index) in menuContent" :key="index">
                                    <div>
                                        <span class="firsttitle" @click="firstcatalog($event)">
                                            <img class="showimg" @click="go($event)"  src="../../assets/image/icons/show.png" />
                                            {{item.label}}
                                        </span>
                                        <div class="secondlevel" v-for="seitem in item.children">
                                            <span class="secondtitle" @click="ppt(seitem.id,seitem.label,$event)" :title="seitem.label" :data-id="seitem.id">{{ seitem.label }}</span>
                                            <div class="thirdlevel" v-for="thitem in seitem.children">
                                                <span class="thirdtitle" @click="ppt(thitem.id,thitem.label,$event)" :title="thitem.label" :data-id="thitem.id">{{ thitem.label }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :md="16" :xl="14" style="padding:0 10px;" class="mainContent">
                            <div class="right">
                                <div class="canvas"></div>
                                <div class="pptcanvas_page">
                                    <el-row type="flex" justify="space-around">
                                        <el-col :span="7" >学习目标</el-col>
                                        <el-col :span="7" style="text-align:center">
                                            <i class="el-icon-caret-left" @click="prevBtn"></i>
                                            <span>第{{cpage}}页，共{{tpage}}页</span>
                                            <i class="el-icon-caret-right" @click="nextBtn"></i>
                                        </el-col>
                                        <el-col :span="7" style="text-align:right">
                                            <!-- <el-link :underline="false">备注</el-link> -->
                                                <i class="iconfont xxm-quanpingzuidahua btn-fullscreen" @click="cfullScreen">全屏</i>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                        <el-col :md="4" :xl="5">
                                <div class="info leftmenu">
                                    <div class="tabplan">
                                        <ul class="page">
                                        </ul>
                                    </div>
                                </div>
                        </el-col>
                    </el-row>
                    <!-- <div class="control">
                        <input type="button" class="btn " value="全屏" />
                    </div> -->
                </div>
            </my-container>
        </div>
        <div class="fullscreen">
            <input type="button" class="btn-exit-fullscreen" value="退出全屏" />
        </div>
    </div>
</template>
<script>
import SPpt from '../../../static/utils/pptcontent/script/webppt.js'
import $ from 'jquery'
import {fetchPptDetail} from '../../api/index'
// import { setTimeout } from 'timers'
export default {
  name: 'ppt',
  data () {
    return {
      web: '',
      scale: '',
      pptDataList: [],
      ppt_base: '',
      ppt_json: [],
      cpage: '',
      tpage: '',
      menuContent: [
        {label: '纲领',
          children: [
            {label: '本章目录', id: 1},
            {label: '本节目录', id: 2},
            {label: '学习目标', id: 3},
            {label: '知识拓扑', id: 4}
          ]
        },
        {label: '知识点',
          children: [
            {label: '知识总结',
              children: [
                {label: '知识总结-P1', id: 5},
                {label: '知识总结-P2', id: 6}]
            },
            {label: '例题1',
              children: [
                {label: '例题1-P1', id: 7},
                {label: '例题1-P2', id: 8}]
            }
          ]
        },
        {label: '课堂总结',
          children: [
            {label: '课堂总结', id: 9}
          ]
        },
        {label: '课堂练习',
          children: [
            {label: '题型总结', id: 10},
            {label: '题型讲解', id: 11},
            {label: '练习题1', id: 12}
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  //   computed: {
  //     pptbase: () => {
  //       return this.ppt_base
  //     }
  //   },
  //   watch: {
  //     pptbase () {
  //       debugger
  //       this.$emit('sendPptBase', this.ppt_base)
  //     }
  //   },
  mounted: function () {
    // this.fullScreen()
    let _this = this
    this.web = new SPpt({
      container: $('.canvas'),
      objectContainer: $('.ppt ul.object'),
      pageContainer: $('.ppt ul.page'),
      thumbWidth: 211,
      onPageChange: (oldPage, nowPage) => {
        this.cpage = nowPage
      }
    })
    this.keydown()
    this.initHeight()
  },
  created: function () {
    this.getPptdetail()
  },
  methods: {
    initHeight () {
      var cHeight = document.documentElement.clientHeight || document.body.clientHeight
      var tHeight = document.getElementsByClassName('topbox')[0].clientHeight
      var pptbox = document.getElementsByClassName('ppt')[0]
      var mainContent = document.getElementsByClassName('mainContent')[0]
      var infoMenu = document.getElementsByClassName('leftmenu')[0]
      pptbox.style.height = cHeight - tHeight - 70 + 'px'
      mainContent.style.height = pptbox.style.height
      infoMenu.style.height = pptbox.style.height
      console.log('总的高度:', cHeight, '头部高度', tHeight)
      var lHeight = document.getElementsByClassName('menu')[0]
      console.log('左侧菜单：', lHeight)
      lHeight.style.height = pptbox.style.height
    },
    showPpt (json) {
      $('.ppt ul.docment li div').empty()
      $('.ppt ul.object').empty()

      //   for (var item in json.ppt.info) {
      //     if (item == 'created' || item == 'modified') {
      //       $('.ppt ul.docment li.' + item + ' div').html(json.ppt.info[item] ? moment(parseInt(json.ppt.info[item]) * 1000).format('YYYY年MM月DD日 HH:mm:ss') : '-')
      //     } else {
      //       $('.ppt ul.docment li.' + item + ' div').html(json.ppt.info[item] || '-')
      //     }
      //   }

      var w = json.ppt.info.layoutWidth
      this.scale = json.ppt.info.layoutHeight / w
      var h = $('.canvas').width() * this.scale
      $('.canvas').height(h)

      this.web.load({
        data: json.ppt,
        resource: json.resource
      })

    //   $('.btn-fullscreen, .btn-editor').prop('disabled', false)
    },
    switchTab (n) {
      $('.tabhost li').eq(n).addClass('h').siblings('li').removeClass('h')
      $('.tabplan > ul').hide().eq(n).show()
    },
    getPptdetail: function () {
      let _this = this
      fetchPptDetail({'id': this.$route.query.ptid})
        .then(res => {
          if (res.data.status == 1) {
            this.pptDataList = res.data.data
            this.ppt_base = this.pptDataList.ppt_base
            console.log('this.ppt_base ', this.ppt_base)
            _this.$emit('sendPptBase', this.ppt_base)
            this.ppt_json = this.pptDataList.ppt_json
            this.showPpt(this.ppt_json)
            var viewvalue = $('.ppt svg').attr('viewbox')
            $('.ppt svg').removeAttr('viewbox')
            document.getElementsByTagName('svg')[0].setAttribute('viewBox0000', viewvalue)
            this.tpage = this.web.getPageMax()
            this.cpage = this.web.getPage()
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    cfullScreen () {
      screenfull && screenfull.request()
      var _scale = $('.fullscreen').height() / $('.fullscreen').width()

      var w = $('.canvas').width()
      var h = $('.canvas').height()
      $('.fullscreen').append($('.canvas').css({
        'width': w,
        'height': h,
        'transform': 'scale(' + ($('.fullscreen').width() / w) + ',' + ($('.fullscreen').width() / w) + ')'
      })).css({
        'display': 'flex'
      })
      //   })
      this.ofullScreen()
    },
    ofullScreen () {
      $('.btn-exit-fullscreen').on('click', function () {
        // aaa && aaa.exit()
        screenfull && screenfull.exit()
        $('.fullscreen').hide()
        $('.ppt .right').append($('.canvas').css({
          'transform': '',
          'width': ''
        }))
        // this.web.reload()
      })
    },
    keydown (e) {
      document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
          case 37:	// 上和左
          case 38:
            this.prevBtn()
            break

          case 39:	// 下和右
          case 40:
            this.nextBtn()
            break

          case 27:	// ESC键  用于全屏时恢复正常
            console.log('exit')
            screenfull && screenfull.exit()
            // $('.btn-exit-fullscreen').click()
            $('.fullscreen').hide()
            $('.ppt .right').append($('.canvas').css({
              'transform': '',
              'width': ''
            }))
            break
        }
      })
    },
    prevBtn () {
      var page = this.web.getPage()
      if (page <= 1) {
        new Toast('当前第一页').show()
        return
      }
      this.web.pageTo(page - 1)
      this.cpage = this.web.getPage()
    },
    nextBtn () {
      var page = this.web.getPage()
      if (page >= this.web.getPageMax()) {
        new Toast('当前最后一页').show()
        return
      }
      this.web.pageTo(page + 1)
      this.cpage = this.web.getPage()
    }

  }
}
</script>
<style>
@import url(../../assets/css/createppt.css);
@import url(../../assets/iconfont/iconfont.css);
.upload {width:100%; border:1px #ddd solid; background:rgb(252, 240, 240);}
.upload .box {padding:20px}
.upload_drag {border:1px var(--primary-color) dotted}
.upload .progress {width:0; overflow:hidden; display:none; height:3px; background:var(--primary-color)}

.ppt {width:100%;margin-top:15px;background: #fff;padding:10px 0;box-shadow: 1px 1px 4px #9c9c9c;}

.ppt .tabhost {background:#eee; display:flex}
.ppt .tabhost li {padding:7px 10px; cursor:pointer; color:#999; flex:1; text-align:center}
.ppt .tabhost li.h {background:#fff; color:#333}

.ppt .info.leftmenu { background:#fff; display:flex; flex-direction:column;}
.ppt .tabplan {flex:1; height:0; overflow-y:auto;overflow-x: hidden;}
.ppt .docment {padding:10px 20px}
.ppt .docment li {margin-top:10px}
.ppt .docment li div {color:#999; font-size:12px; margin:5px 0 0 10px}

.ppt .object li, .ppt .page li {margin:10px; font-size:12px}
.ppt li.h {background:#fafafa}

.ppt ul.page li {position:relative; cursor:pointer}
.ppt ul.page li > div {position:absolute; width:100%; left:0; top:0; text-align:center; background:rgba(0,0,0,.6); color:#fff; font-size:12px}

.ppt .control {display:flex; margin-bottom:10px; justify-content:flex-end}
.ppt .control .btn {margin-right:10px; display:block}
.ppt .control .btn:last-child {margin-right:0}
.ppt .canvas {border:1px #ddd solid; background:#fff;width: 100%;}
.ppt .right {position: relative;}
.ppt .pptcanvas_page{width:100%;height: 40px;line-height: 40px;background: #F0F6F5;position: absolute;bottom:-40px;font-size: 14px;}

/* .ppt .menu::-webkit-scrollbar,.ppt .tabplan::-webkit-scrollbar{
    width: 4px;
    height:400px;
}
.ppt .menu::-webkit-scrollbar-thumb ,.ppt .tabplan::-webkit-scrollbar{
   border-radius: 10px;
   -webkit-box-shadow: inset 0 0 5px rgba(90, 88, 88, 0.2);
   background: rgba(53, 53, 53, 0.2);
}
.ppt .menu::-webkit-scrollbar-track,.ppt .tabplan::-webkit-scrollbar {
    -webkit-box-shadow: inset 0 0 5px rgba(29, 28, 28, 0.2);
   border-radius: 0;
   background: rgba(58, 57, 57, 0.1);
} */

 /*滚动条样式*/
        .pptdetail .menu::-webkit-scrollbar {/*滚动条整体样式*/
            width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 3px;
        }
        .pptdetail .menu::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .pptdetail .menu::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }

/* .ppt .pptcanvas_page .el-col{text-align: center} */
.fullscreen {overflow:hidden; display:none; background:#000; position:absolute; top:0; left:0; right:0; bottom:0; justify-content:center; align-items:center}
.fullscreen .btn-exit-fullscreen {z-index:100;cursor:pointer; border:0; position:absolute; right:10px; top:10px; padding:7px 20px; background:rgba(255,255,255,.6); color:#000; border-radius:5px}
.pptdetail_header .el-button{height: 30px;line-height: 30px; padding:0 20px;}
.pptdetail_header{height: 60px;line-height: 60px;}
.pptdetail_header .ppttitle{font-size: 18px;font-weight: bold;color:#fff;}
/* .pptdetail .editBut{width:60px;margin:0 auto;} */

.pptdetail .mainContent {overflow-y: auto}
.pptdetail .ppt{overflow:hidden;}

 /*滚动条样式*/
        .pptdetail .mainContent::-webkit-scrollbar {/*滚动条整体样式*/
            width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 3px;
        }
        .pptdetail .mainContent::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .pptdetail .mainContent::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }

         /*滚动条样式*/
        .ppt .tabplan::-webkit-scrollbar {/*滚动条整体样式*/
            width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 3px;
        }
        .ppt .tabplan::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .ppt .tabplan::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }
        .pptdetail .el-button:focus, .el-button:hover {
    color: #606266;
    border-color: #fff;
    background-color: #fff;
}
</style>
