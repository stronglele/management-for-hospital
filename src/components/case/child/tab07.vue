// 围手术期评估
<template>
  <div id="tab07" class="caseform-wrapper">
    <el-form ref="form" :model="form" label-width="180px" v-if="items&&form">
      <div v-for="item in items" :key="item.key">
        <div v-show="!item.condition||(item.condition&&form[item.condition.key]==item.condition.value)">
          <el-form-item :label="item.label" v-if="item.type=='radio'">
            <el-radio-group v-model="form[item.key]">
              <el-radio v-for="obj in item.options" :key="obj" :label="obj">{{obj}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type=='text'">
            <el-input v-model="form[item.key]" :placeholder="item.options" class="caseform-input"></el-input>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type=='textarea'">
            <el-input type="textarea" v-model="form[item.key]" :placeholder="item.options" :rows="5" :clos="10"
                      class="caseform-input"></el-input>
          </el-form-item>
        </div>
      </div>
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
  import Tab from './data/tab07'

  export default {
    name: 'tab07',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        items: null,
        form: null,
        initial: null,
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.items = Tab.items
      this.toform(Tab.items)
      this.$http.get(`${this.$global.api}perioperativeEvents/find/${this.$route.params.id}?time=${new Date().getTime()}`)
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.initial = res.data.data
          }
        })
    },
    methods: {
      toform (data) {
        let form = {}
        data.forEach(obj => {
          data[obj.key] = ''
        })
        this.form = form
      },
      save (status) {
        console.log(this.form)
        this.form.illnessId = this.$route.params.id
        this.form.modifier = this.token['parameter3']
        this.$http.post(`${this.$global.api}perioperativeEvents/save`, this.form)
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
    },
    watch: {
      initial: function (data) {
        this.form = data
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/global';

  .el-textarea textarea {
    white-space: normal;
  }
</style>
