// 入院简史
<template>
  <div id="tab03" class="caseform-wrapper">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="患者发病时间">
        <el-date-picker v-model="form.diseaseTime" type="date" placeholder="患者发病时间" class="caseform-input">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="诱因">
        <el-input v-model="form.incentive" class="caseform-input"></el-input>
      </el-form-item>
      <el-form-item label="出现症状">
        <el-select v-model="form.symptom" class="caseform-input">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="诊疗经过">
        <el-input v-model="form.treatmentPass" class="caseform-input" type="textarea" :rows="5" :clos="10"></el-input>
      </el-form-item>
    </el-form>
    <div class="caseform-button">
      <el-button type="primary" @click="save(0)">保存</el-button>
      <el-button type="primary" @click="previous()">上一步</el-button>
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
    name: 'tab03',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        form: {
          diseaseTime: '',
          incentive: '',
          symptom: '',
          treatmentPass: ''
        },
        options: [{
          label: '胸痛',
          value: '胸痛'
        }, {
          label: '胸闷',
          value: '胸闷'
        }, {
          label: '背痛',
          value: '背痛'
        }, {
          label: '腹痛',
          value: '腹痛'
        }, {
          label: '晕厥',
          value: '晕厥'
        }, {
          label: '无',
          value: '无'
        }],
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.$http.get(`${this.$global.api}admissionHistory/find/${this.$route.params.id}?time=${new Date().getTime()}`)
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.form.diseaseTime = res.data.data.diseaseTime
            this.form.incentive = res.data.data.incentive
            this.form.symptom = res.data.data.symptom
            this.form.treatmentPass = res.data.data.treatmentPass
          }
        })
    },
    methods: {
      save (status) {
//        console.log(this.form)
        this.form.illnessId = this.$route.params.id
        this.form.modifier = this.token['parameter3']
        this.form.diseaseTime = this.form.diseaseTime ? new Date(this.form.diseaseTime).valueOf() : ''
        this.$http.post(`${this.$global.api}admissionHistory/save`, this.form)
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
      previous () {
        this.$emit('previous')
        this.save(-1)
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

<style lang="scss">
  @import '../../../assets/css/global';

  .caseform-wrapper {
    .el-select {
      width: 150px;
    }

    > .el-input {
      display: inline-block !important;
      width: 200px !important;
    }

    .el-select .el-input .el-input__icon,
    .el-input__icon {
      color: $color-primary;
    }

    .el-select .el-input .el-input__icon {
      top: 0 !important;
      transform: none !important;
    }
    .el-input__icon.el-icon-caret-top:before {
      content: '\E604' !important;
    }
    .el-select .el-input .el-input__icon.is-reverse {
      transform: rotateZ(180deg) !important;
    }
  }
</style>
