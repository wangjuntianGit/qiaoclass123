<template>
  <div class="setting">
    <!-- <editAvator :imginfocircle="true"></editAvator> -->

    <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="130px">
      <el-form-item label="手机号：" prop="mobile">
        <div style="padding-left:14px;">{{infoForm.mobile}}</div>
      </el-form-item>
      <el-form-item label="ID：" prop="uid">
        <div style="padding-left:14px;">{{infoForm.uid}}</div>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="uname">
        <el-input v-model="infoForm.uname"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="infoForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色：" prop="role">
        <el-select v-model="infoForm.role" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教授学科：" prop="subject">
        <el-select v-model="infoForm.subject" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in subjectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校：" prop="school">
        <el-input v-model="infoForm.school" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import personal from '../../api/personal.js';
import editAvator from '../uploadfile/upload-only-img';
import { mapState } from 'vuex';
export default {
  name: 'setting',
  components: {
    editAvator
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      infoForm: {
        avatar: ''
      },
      rules: {
        mobile: [{ message: '请输入手机号', trigger: 'blur' }],
        uid: [{ trigger: 'blur' }],
        uname: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' },
          {
            max: 4,
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '不能大于4个汉字，不能有空格',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
            type: 'number'
          }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
        subject: [
          { required: true, message: '请选择教授学科', trigger: 'blur' }
        ],
        school: [{ required: true, message: '请填写学校', trigger: 'blur' }]
      },
      roleList: [
        // {
        //     		value: '0',
        //     		label: '学生'
        // 		},
        {
          value: '1',
          label: '教师'
        }
        // {
        // 		value: '9',
        // 		label: '其他'
        // }
      ],
      subjectList: [
        {
          value: '1',
          label: '物理'
        }
      ]
    }
  },
  computed: {
    //   aaaavatorImgUrl 为监听的属性名，实质为一个方法
    ...mapState({
      aaaavatorImgUrl: state => state.common.avatorImgUrlBack
    })
  },
  watch: {
    aaaavatorImgUrl (val) {
      this.infoForm.avatar = val
      console.log('this.info.avator', this.infoForm.avatar)
    }
  },
  methods: {
    // 获取个人信息
    getProfile () {
      let params = {}
      personal
        .getProfile(params)
        .then(res => {
          if (res.data.status == 1) {
            this.infoForm = Object.assign(res.data.data, {})
            this.infoForm.sex = Number(this.infoForm.sex)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },

    // 头像变化
    avatarChange () {
      var that = this
      let myFile = document.getElementById('file')
      myFile.onchange = function () {
        if (this.files[0]) {
          that.infoForm.avatar = new FormData()
          that.infoForm.avatar.append('avatar', this.files[0])

          var reader = new FileReader()
          reader.readAsDataURL(this.files[0])
          reader.onloadend = function () {
            that.infoForm.avatar = reader.result
          };
        }
      }
    },
    // 修改个人信息 确定
    submitForm () {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = {
            uname: this.infoForm.uname,
            mobile: this.infoForm.mobile,
            sex: this.infoForm.sex == 1 ? 1 : 2,
            role: this.infoForm.role,
            subject: this.infoForm.subject,
            school: this.infoForm.school,
            avatar: this.infoForm.avatar
          }
          console.log('params', params)

          personal
            .updprofile(params)
            .then(res => {
              if (res.data.status == 1) {
                this.getProfile()
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  center: true
                })
              } else {
                console.log('修改失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>
<style lang='scss'>
.setting {
  height: 100%;
  .el-form {
    padding-right: 130px;
  }
  .infoAvatar {
    width: 120px;
    height: 120px;
    background: #ccc;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 60px;
    position: relative;
    overflow: hidden;
  }
  .infoAvatar::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  /*滚动条凹槽的颜色，还可以设置边框属性*/
  .infoAvatar::-webkit-scrollbar-track-piece {
    background-color: #fff;
  }
  /*滚动条的宽度*/
  .infoAvatar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 12px;
  }
  /*滚动条的设置*/
  .infoAvatar::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
    border-radius: 10px;
  }
  .infoAvatar::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }
  .infoAvatar img {
    width: 100%;
    height: 100%;
  }
  .infoAvatar div {
    width: 100%;
    height: 100%;
    line-height: 120px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: transparent;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    transition: 0.4s;
    -moz-transition: 0.4s; /* Firefox 4 */
    -webkit-transition: 0.4s; /* Safari 和 Chrome */
    -o-transition: 0.4s;
  }
  .infoAvatar div:hover {
    background: rgba(83, 91, 88, 0.8);
    color: #fff;
  }
  .infoAvatar div input {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .el-select .el-input .el-select__caret {
    color: #acacac !important;
  }
  .el-button--primary {
    background: #31bc90;
    width: 120px;
    font-size: 16px;
    line-height: 44px;
    padding: 0;
  }
  .el-message {
    background: #fff;
    height: calc(100% - 200px);
  }
  .el-radio-group .is-checked .el-radio__inner {
    border-color: #31bc90;
    background: #31bc90;
  }
  .el-radio-group .is-checked .el-radio__label {
    color: #31bc90;
  }
  .el-input__inner:focus {
    border-color: #31bc90;
  }
  .el-radio__inner:hover {
    border-color: #31bc90;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #31bc90;
  }
  .el-select-dropdown__item.selected {
    color: #31bc90;
  }
}
</style>
