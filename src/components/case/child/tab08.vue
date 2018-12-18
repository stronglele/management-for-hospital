// 出院转归
<template>
  <div id="tab08" class="caseform-wrapper">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="出院转归">
        <el-radio-group v-model="form.name">
          <el-radio label="未愈"></el-radio>
          <el-radio label="好转"></el-radio>
          <el-radio label="死亡"></el-radio>
        </el-radio-group>
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
    name: 'tab08',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        form: {
          name: ''
        },
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.$http.get(`${this.$global.api}hospitalOutcome/find/${this.$route.params.id}?time=${new Date().getTime()}`)
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.form.name = res.data.data.name
          }
        })
    },
    methods: {
      save (status) {
//        console.log(this.form)
        this.form.illnessId = this.$route.params.id
        this.form.modifier = this.token['parameter3']
        this.$http.post(`${this.$global.api}hospitalOutcome/save`, this.form)
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
</style>
