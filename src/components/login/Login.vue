<template>
  <div id="login">
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-content">
          <h1 class="login-title">CAG/PCI术后格式化出院小结后台</h1>
          <div class="login-form">
            <el-form :model="loginForm"
                     :rules="rules"
                     :label-position="labelPosition"
                     ref="loginForm"
            >
              <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="用户名" class="login-input" size="large" auto-complete="off">
                  <template slot="prepend"><span class="icon-user"></span></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" placeholder="密码" type="text" class="login-input" auto-complete="off" size="large" @focus="password($event)">
                  <template slot="prepend"><span class="icon-pwd"></span></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="remember">
                <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
                <a class="login-forget" @click="dialogForgetVisible=true">忘记密码?</a>
              </el-form-item>
              <el-button type="primary" @click="login('loginForm')" class="login-button">登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
      <div class="login-footer"></div>
    </div>
    <password-forget :visible.sync="dialogForgetVisible" @next="toSetPwd($event)"></password-forget>
    <password-set :visible.sync="dialogSetVisible" :data="resetData" @complete="toComplete($event)"></password-set>
    <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
  </div>
</template>

<script>
  import AppDialog from '@/components/_libs/dialog'
  import { setCookie } from '@/components/_libs/util'
  import PasswordForget from '@/components/login/PasswordForget'
  import PasswordSet from '@/components/login/PasswordSet'
  import md5 from 'md5'

  export default {
    name: 'login',
    components: {
      'password-forget': PasswordForget,
      'password-set': PasswordSet,
      'app-dialog': AppDialog
    },
    data () {
      return {
        labelPosition: 'top',
        loginForm: {
          mobile: this.getDecode(window.localStorage.getItem('account')) || '',
          password: '',
          remember: Boolean(window.localStorage.getItem('flag')) || ''
        },
        rules: {
          mobile: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        dialogForgetVisible: false,
        dialogSetVisible: false,
        title: '',
        message: '',
        visible: false,
        resetData: null
      }
    },
    methods: {
      login (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let pwd = md5(`pci-doctor${md5(this.loginForm.password)}`)
            this.$http.post(`${this.$global.oApi}api/ruijin/login`, {
              mobile: this.loginForm.mobile,
              password: `${this.getEncrypt(pwd)}`
            })
              .then(res => {
                if (res.data.code === 0 && res.data.data) {
                  let expireDays = 1000 * 60 * 60
                  let data = res.data.data
                  setCookie('session', res.data.data.parameter7, expireDays)
                  setCookie('u_uuid', res.data.data.parameter3, expireDays)
                  delete data.parameter7
                  delete data.parameter3
                  this.$store.commit('tokenChange', {
                    flag: this.loginForm.remember,
                    token: data,
                    account: this.getEncrypt(this.loginForm.mobile)
                  })
                  this.$router.push(this.$route.query.redirect || '/')
                } else {
                  this.title = '错误信息'
                  this.message = res.data.msg || '登录失败，请稍后再试'
                  this.visible = true
                }
              })
              .catch(err => {
                this.title = '错误信息'
                this.message = '啊哦～服务器出差了，请重试！'
                this.visible = true
                console.log(err)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getEncrypt (value) {
        var encrypted = this.$CryptoJS.AES.encrypt(value, this.$key, {iv: this.$iv, mode: this.$CryptoJS.mode.CBC, padding: this.$CryptoJS.pad.ZeroPadding})
        return encrypted
      },
      getDecode (value) {
        if (value) {
          var decrypted = this.$CryptoJS.AES.decrypt(value, this.$key, {iv: this.$iv, padding: this.$CryptoJS.pad.ZeroPadding})
        } else {
          decrypted = ''
        }
        return decrypted.toString(this.$CryptoJS.enc.Utf8)
      },
      password (event) {
        event.target.type = 'password'
      },
      toSetPwd (data) {
        if (data && data.data && data.data.code === 0) {
          delete data.data
          this.resetData = data
          setTimeout(() => {
            this.dialogForgetVisible = false
            this.dialogSetVisible = true
            console.log(this.resetData)
          }, 300)
        } else if (data && data.data) {
          this.title = '错误信息'
          this.message = data.data.msg || '验证码错误~'
          this.visible = true
        } else if (data) {
          this.title = '错误信息'
          this.message = data.msg || '啊哦～网络连接出错了，请稍后再试！~'
          this.visible = true
        }
      },
      toComplete (data) {
        console.log(data)
        if (data && data.res && data.res.code === 0) {
          this.title = '提示信息'
          this.message = data.res.msg || '重置密码成功～'
          this.visible = true
          this.resetLogin(data.data.mobile, data.data.password)
        } else if (data && data.msg) {
          this.title = '错误信息'
          this.message = data.msg || '重置密码失败，请稍后再试～'
          this.visible = true
        }
      },
      resetLogin (tel, pwd) {
        this.$http.post(`${this.$global.oApi}api/ruijin/login`, {
          mobile: tel,
          password: pwd
        })
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.$store.commit('tokenChange', {
                flag: true,
                token: res.data.data,
                account: tel
              })
              this.$router.push(this.$route.query.redirect || '/')
            } else {
              this.title = '错误信息'
              this.message = res.data.msg || '登录失败，请稍后再试'
              this.visible = true
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出差了，请重试！'
            this.visible = true
            console.log(err)
          })
      }
    }
  }
</script>

<style lang='scss'>
  @import './login';
</style>
