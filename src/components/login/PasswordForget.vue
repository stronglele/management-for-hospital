<template>
  <div id="password-forget">
    <el-dialog
      :visible="visible"
      :show-close="false"
      :top="'50%'"
      :custom-class="'pwd-dialog'"
    >
      <div slot="title">
        <h3 class="pwd-title">忘记密码</h3>
        <i class="el-icon-close i-close" @click="close()"></i>
      </div>
      <el-form :model="form" :ref="form" :label-position="'left'" :rules="rules">
        <el-form-item label="请输入手机号" prop="tel" :label-width="formLabelWidth">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码" prop="code" :label-width="formLabelWidth">
          <el-input v-model="form.code" class="pwd-input-code"></el-input>
          <el-button type="primary" @click="sendCode()" :disabled="checkCode">
            {{ ifCode ? `发送验证码` : codeText}}
          </el-button>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" size="large" @click="next()" :disabled="checkNext">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'password-forget',
    props: [
      'visible'
    ],
    data () {
      return {
        form: {
          tel: '',
          code: ''
        },
        formLabelWidth: '110px',
        rules: {
          tel: [
            {validator: this.validateTel, trigger: 'blur'}
          ],
          code: [
            {validator: this.validateCode, trigger: 'blur'}
          ]
        },
        ifCode: true,
        codeText: ''
      }
    },
    methods: {
      close: function (msg) {
        this.$emit('next', msg)
        this.$emit('update:visible', false)
      },
      sendCode: function () {
        this.ifCode = false
        this.timedCount()
        this.$refs[this.form].validateField('tel', (msg) => {
          console.log(msg)
          if (!msg) {
            console.log('send code')
            this.$http.get(`${this.$global.uApi}api/verification_code?mobile=${this.form.tel}`)
          }
        })
      },
      timedCount: function () {
        let _this = this
        let count = 60
        _this.codeText = `${count}s后重新获取`
        let i = setInterval(function () {
          console.log(count)
          if (count === 1) {
            _this.ifCode = true
            clearInterval(i)
          } else {
            _this.codeText = `${--count}s后重新获取`
          }
        }, 1000)
      },
      next: function () {
        this.$refs[this.form].validate(valid => {
          if (valid) {
            this.$http.get(`${this.$global.uApi}/api/verification_code/check?time=${new Date().getTime()}`, {params: {mobile: this.form.tel, code: this.form.code}})
              .then(res => {
                if (res.data) {
                  this.$emit('next', {mobile: this.form.tel, code: this.form.code, data: res.data})
                }
              })
              .catch(err => {
                console.log(err)
                this.close({code: -1, msg: '啊哦～网络连接出错了，请稍后再试！'})
              })
          }
        })
      },
      validateTel: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号'))
        } else if (value && value.length !== 11 && !isNaN(Number(value))) {
          return callback(new Error('请输入正确的11位手机号'))
        } else {
          callback()
        }
      },
      validateCode: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入验证码'))
        } else if (value && value.length !== 6 && !isNaN(Number(value))) {
          return callback(new Error('请输入正确的6位验证码'))
        } else {
          callback()
        }
      }
    },
    computed: {
      checkNext: function () {
        return !(this.form && this.form.tel && this.form.code)
      },
      checkCode: function () {
        console.log(this.ifCode)
        return !(this.form && this.form.tel && this.ifCode)
      }
    }
  }
</script>
