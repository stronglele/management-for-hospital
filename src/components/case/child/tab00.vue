// 基本信息
<template>
  <div id="tab00" class="caseform-wrapper">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="医院名称">
        <el-input v-model="form.hospitalName" class="caseform-input"></el-input>
      </el-form-item>
      <el-form-item label="住院号">
        <el-input v-model="form.num" class="caseform-input"></el-input>
      </el-form-item>
      <el-form-item label="入院日期">
        <el-date-picker v-model="form.hospitalized" type="date" placeholder="入院日期" class="caseform-input">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出院日期">
        <el-date-picker v-model="form.discharged" type="date" placeholder="出院日期" class="caseform-input">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="caseform-button">
      <el-button type="primary" @click="save(0)">保存</el-button>
      <el-button type="primary" @click="save(1)">下一步</el-button>
      <el-button @click="preview()" class="button-base">预览</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>
    <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
  </div>
</template>

<script>
  import AppDialog from '@/components/_libs/dialog'

  export default {
    name: 'tab00',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        form: {
          hospitalName: '',
          num: '',
          hospitalized: '',
          discharged: ''
        },
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.$http.get(`${this.$global.api}basicInformation/get?id=${this.$route.params.id}&time=${new Date().getTime()}`)
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.form.hospitalName = res.data.data.hospitalName
            this.form.num = res.data.data.num
            this.form.hospitalized = res.data.data.hospitalized
            this.form.discharged = res.data.data.discharged
            this.$store.commit('caseDataSet', res.data.data)
          }
        })
    },
    methods: {
      save (status) {
//        console.log(this.form)
        this.form.id = this.$route.params.id
        this.form.modifier = this.token['parameter3']
        this.form.hospitalized = this.form.hospitalized ? new Date(this.form.hospitalized).valueOf() : ''
        this.form.discharged = this.form.discharged ? new Date(this.form.discharged).valueOf() : ''
        this.$http.post(`${this.$global.api}basicInformation/save`, this.form)
          .then(res => {
            if (res.data.code === 0 && status === 0) {
              this.title = '提示信息'
              this.message = '保存成功！'
              this.visible = true
            }
            if (res.data.code === 0 && status === 1) {
              this.$emit('next')
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      preview () {
        this.$router.push({name: 'CaseDetail', params: {id: this.$route.params.id, userId: this.$route.params.userId}})
      },
      goBack () {
        this.$router.push({name: 'CaseList'})
      }
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    }
  }
</script>
