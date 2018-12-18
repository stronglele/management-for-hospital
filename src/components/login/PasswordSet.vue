<template>
  <div id="password-set">
    <el-dialog
      :visible="visible"
      :show-close="false"
      :top="'50%'"
      :custom-class="'pwd-dialog'"
    >
      <div slot="title">
        <h3 class="pwd-title">设置密码</h3>
        <i class="el-icon-close i-close" @click="close()"></i>
      </div>
      <el-form :model="form" :ref="form" :label-position="'left'" :rules="rules">
        <el-form-item label="请输入新密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" style="padding-top: 1em">
          <el-button type="primary" size="large" @click="complete()">完成</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import md5 from 'md5'

  export default {
    name: 'password-set',
    props: [
      'visible',
      'data'
    ],
    data () {
      return {
        form: {
          password: ''
        },
        formLabelWidth: '110px',
        rules: {
          password: [
            {required: true, message: '请设置密码', trigger: 'blur'},
            { min: 6, message: '密码最少六位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      close: function (msg) {
        this.$emit('complete', msg)
        this.$emit('update:visible', false)
      },
      complete: function () {
        this.$refs[this.form].validate(valid => {
          if (valid) {
            this.data.password = md5(`pci-doctor${md5(this.form.password)}`)
            this.$http.post(`${this.$global.oApi}api/ruijin/password/update`, this.data)
              .then(res => {
                if (res.data) {
                  this.close({data: this.data, res: res.data})
                }
              })
              .catch(err => {
                console.log(err)
                this.close({code: -1, msg: '啊哦～网络连接出错了，请稍后再试！'})
              })
          }
        })
      }
    }
  }
</script>

