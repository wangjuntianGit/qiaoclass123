<template>
    <div>
         <div class='comment'>
            <el-row class="erea">
                 <el-col :md="24"> <h5>评论:</h5></el-col>
                 <el-col :md="24">
                        <el-input class='c-text' type="textarea" maxlength='200' :rows="2" placeholder="还可以输入200个字" v-model="textarea"></el-input>
                 </el-col>
                <el-col :md="2" :push="22">
                    <el-button class="c-btn" type="primary">评论</el-button>
                 </el-col>
            </el-row>
            <el-row class='complate'>
                <el-col><h5>全部评论</h5></el-col>
            </el-row>
            <el-row class="detail">                
                <el-col :md="24">
                    <el-row>
                        <el-col :span="1">
                            <el-avatar icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="28"></el-avatar>
                        </el-col>
                        <el-col :span="18">
                            <el-row>
                                <el-col :span='3'>
                                    <span class="c-name">逍遥子</span>
                                </el-col>
                                <el-col :span='21'>
                                    <span class='time'>6-10 09:28</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span='24'>
                                    <span class='txt'>很赞,学到了</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span='5'>
                            <el-row>
                                <el-col :span='9'><span class='report'>举报</span></el-col>
                                <el-col :span="6"><i class='el-icon-chat-dot-square icon-comment' title='回复'></i></el-col>
                                <el-col :span="7"><i class="iconfont xxm-dianzan icon-praise" title='点赞'></i></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
                <hr>
            </el-row>
            <el-row class="detail">                
                <el-col :md="24">
                    <el-row>
                        <el-col :span="1">
                            <el-avatar icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="28"></el-avatar>
                        </el-col>
                        <el-col :span="18">
                            <el-row>
                                <el-col :span='3'>
                                    <span class="c-name">逍遥子</span>
                                </el-col>
                                <el-col :span='21'>
                                    <span class='time'>6-10 09:28</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span='24'>
                                    <span class='txt'>很赞,学到了</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span='5'>
                            <el-row>
                                <el-col :span='9'><span class='report'>举报</span></el-col>
                                <el-col :span="6"><i class='el-icon-chat-dot-square icon-comment' title='回复'></i></el-col>
                                <el-col :span="7"><i class="iconfont xxm-dianzan icon-praise" title='点赞'></i></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
                <hr>
            </el-row>
           <el-row type="flex" justify="center">
               <el-col :span="4">
                   <el-button plain class='btn'>更多评论</el-button>
               </el-col>
           </el-row>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Comment',
  data () {
    return {
         textarea: ''
    }
  }
}
</script>
<style scoped>
    /* @import url(../../assets/css/resource.css); */
    @import url(../../assets/iconfont/iconfont.css);
</style>
<style >
     h1,h2,h3,h4,h5{ padding:0;margin:0;}
    .comment>.erea *{margin-bottom: 5px;}
    .comment .c-btn{padding:7px 14px;}
    .comment .c-name,.time,.txt{font-size:13px;color:#9c9c9c;}
    .comment .report{font-size:13px;color:#9c9c9c; vertical-align:middle;}
    .comment .icon-comment{font-size:17px;color:#9c9c9c; vertical-align:middle;}
    .comment .icon-praise{font-size: 17px;color:#9c9c9c; vertical-align:middle;}
    .comment>.detail *{margin-bottom: 2px;}
    .comment>.complate h5{margin-bottom: 15px;}
    .btn{margin: 15px 0;padding: 9px 9px;}
    .el-button.is-plain:hover{border: 1px solid #DCDFE6;color: #606266;}
    .comment>.detail{margin-top: 11px;}
    .comment .el-button--primary{color:#fff;background:#31BC90;border: none;}
     .comment .btn{color:#fff;background:#31BC90;border: none;}
    .comment .el-button.is-plain:active{color:#fff;background:#31BC90;border: none;}
    .comment .el-button.is-plain:focus, .el-button.is-plain:hover{color:#fff;background:#31BC90;border: none;}
</style>
