<template>
  <div class="introdesc">
    <div class="info">
      <el-row>
        <!-- 8.10_LY start-->
        <el-col :md="24">
          <div class="intro">
            <h4>简介:</h4>
            <span v-if="status===false">{{intro.desc}}</span>
            <el-input
              v-if="status===true"
              class="c-text"
              v-model="intro.desc"
              type="input"
              maxlength="30"
              :rows="2"
              placeholder
              @input="handleIntroNum()"
            >
              <span
                slot="suffix"
                class="introNum"
              >{{introNum - (intro.desc?intro.desc.length:0) +'/'+ introNum}}</span>
            </el-input>
          </div>
        </el-col>
        <el-col :md="24">
          <div class="explain">
            <h4>说明:</h4>
            <span v-if="status===false">{{intro.content}}</span>
            <el-input
              v-if="status===true"
              class="c-text"
              v-model="intro.content"
              type="input"
              maxlength="60"
              :rows="2"
              placeholder
              @input="handleIntroNum()"
            >
              <span
                slot="suffix"
                class="explainNum"
              >{{explainNum - (intro.content?intro.content.length:0) +'/'+ explainNum}}</span>
            </el-input>
          </div>
        </el-col>
        <!-- end-->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Intro",
  data() {
    return {
      shareStatus: "",
      introNum: 30,
      explainNum: 60
    };
  },
  props: ["status", "intro"],
  mounted() {
    // this.introNum = 30 - parseInt((this.intro.desc).length)
    // console.log('数据长度',this.introNum)
    // this.explainNum = 60 - parseInt((this.intro.content).length)
    // console.log(this.intro.desc)
    console.log("porps数据", this.intro.desc);
  },
  methods: {
    handleIntroNum() {
      $(document).unbind('keydown')
    }
  }
};
</script>

<style scoped lang='scss'>
//   h1,h2,h3,h4,h5{ padding:0;margin:0;}
//   .introdesc .info{background: #F0F6F5;padding: 10px;margin-bottom: 10px;}
//   .introdesc .info .intro{display:flex; margin-bottom: 10px;font-size: 14px;align-items: center;}
//   .introdesc .info .intro>h4{margin-right: 10px;white-space: nowrap;font-size: 14px;}
//   .introdesc .info .explain{display:flex;font-size: 14px;align-items: center;}
//    .introdesc .info .explain>h4{margin-right: 10px;white-space: nowrap;}
//    .introdesc>.info .introNum,.explainNum {line-height: 40px;}
//  .info .el-input--suffix .el-input__inner {padding-right: 40px;}
.introdesc {
  h1,h2,h3,h4,h5{ padding:0;margin:0;}
  .info {
    background: #f0f6f5;
    padding: 10px;
    margin-bottom: 10px;
    .intro {
      display: flex;
      margin-bottom: 10px;
      font-size: 14px;
      align-items: center;
      h4 {
        margin-right: 10px;
        white-space: nowrap;
        font-size: 14px;
      }
      .introNum{line-height: 40px;}
      .el-input--suffix .el-input__inner {padding-right: 40px;}
    }
    .explain {
      display: flex;
      font-size: 14px;
      align-items: center;
      h4 {
        margin-right: 10px;
        white-space: nowrap;
      }
      .explainNum{line-height: 40px;}
    }
  }
}
</style>
