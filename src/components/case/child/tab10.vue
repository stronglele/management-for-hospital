// 随访记录
<template>
  <div id="tab10" class="caseform-wrapper">
    <el-button class="drug-button" @click="push()" size="large">+ 增加特殊随访记录</el-button>
    <ul class="record-content">
      <li>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="制定医生:">
            {{token['parameter2']}}
          </el-form-item>
          <el-form-item label="随访时间:">
            <el-date-picker v-model="form.planDate" type="date" class="caseform-input"></el-date-picker>
          </el-form-item>
        </el-form>
      </li>
      <li v-if="item.flupTime !== ''" v-for="(item, key) in form.flupItems" :key="key">
        <p v-if="item.flupTime===0">一个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===1">三个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===2">六个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===3">九个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===4">十二个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===5">{{item.planDate | date}}
          <i class="el-icon-close" @click="splice(key)" style="margin-left: 15px"></i></p>
        <p v-for="name in item.plan"><i class="el-icon-minus record-icon" @click="del(name, key)"></i>{{name}}</p>
        <p v-if="item.flupTime !== ''"><i class="el-icon-plus record-icon" @click="add(item, key)"></i>添加随访内容</p>
      </li>
    </ul>
    <ul class="record-content" v-for="option in options">
      <li>
        <el-form label-width="80px">
          <el-form-item label="制定医生:">
            {{option.doctorName}}
          </el-form-item>
          <el-form-item label="随访时间:">
            {{option.planDate | date}}
          </el-form-item>
        </el-form>
      </li>
      <li v-for="(item, key) in option.flupItems" :key="key">
        <p v-if="item.flupTime===0">一个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===1">三个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===2">六个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===3">九个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===4">十二个月后  {{item.planDate | date}}</p>
        <p v-if="item.flupTime===5">
          {{item.planDate | date}}
          <i class="el-icon-close" @click="splice(key)" style="margin-left: 15px"></i>
        </p>
        <p v-for="name in item.plan">{{name}}</p>
      </li>
    </ul>
    <div class="caseform-button">
      <el-button type="primary" @click="save(0)">保存</el-button>
      <el-button type="primary" @click="previous()">上一步</el-button>
      <el-button @click="preview()">预览</el-button>
      <el-button @click="goBack()">返回</el-button>
      <el-button @click="complete()">完成提交</el-button>
    </div>
    <el-dialog title="随访计划" :visible.sync="dialogFormVisible"
               custom-class="record-dialog"
               :close-on-click-modal="dclose"
               :close-on-press-escape="dclose">
      <el-form :model="dialogForm">
        <el-form-item label="时间" label-width="80px">
          <el-date-picker v-model="dialogForm.planDate" type="date" class="caseform-input"></el-date-picker>
        </el-form-item>
        <el-form-item label="项目" label-width="80px">
          <el-checkbox-group v-model="dialogForm.plan">
            <el-checkbox label="复查血一套" name="plan" class="checkbox-block"></el-checkbox>
            <el-checkbox label="心电图" name="plan" class="checkbox-block"></el-checkbox>
            <el-checkbox label="心超和彩超" name="plan" class="checkbox-block"></el-checkbox>
            <el-checkbox label="24小时心电图" name="plan" class="checkbox-block"></el-checkbox>
            <el-checkbox label="颈动脉多普勒超声" name="plan" class="checkbox-block"></el-checkbox>
            <el-checkbox label="复查冠脉造影" name="plan" class="checkbox-block"></el-checkbox>
            <el-checkbox label="自定义" name="plan" class="checkbox-block">自定义
              <el-input v-if="Array.isArray(dialogForm.plan)&&dialogForm.plan.indexOf('自定义')>-1"
                        v-model="dialogForm.planName"
                        class="caseform-input"></el-input>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDialog()">确 定</el-button>
      </div>
    </el-dialog>
    <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
  </div>
</template>

<script>
  import '@/components/_libs/filter'
  import AppDialog from '@/components/_libs/dialog'

  export default {
    name: 'tab10',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        form: {
          planDate: '',
          doctorName: '',
          doctorId: '',
          userId: '',
          flupItems: [{
            flupTime: 0,
            planDate: '',
            plan: [],
            planName: ''
          }, {
            flupTime: 1,
            planDate: '',
            plan: [],
            planName: ''
          }, {
            flupTime: 2,
            planDate: '',
            plan: [],
            planName: ''
          }, {
            flupTime: 3,
            planDate: '',
            plan: [],
            planName: ''
          }, {
            flupTime: 4,
            planDate: '',
            plan: [],
            planName: ''
          }]
        },
        options: [],
        dialogForm: {
          planDate: '',
          plan: [],
          planName: '',
          index: ''
        },
        title: '',
        message: '',
        visible: false,
        dclose: false,
        dialogFormVisible: false
      }
    },
    created () {
      this.init()
      this.init1()
    },
    methods: {
      save (status) {
        this.form.doctorName = this.token['parameter2']
        this.form.doctorId = this.token['parameter1']
        this.form.userId = this.$route.params.userId
        this.form.planDate = this.form.planDate ? new Date(this.form.planDate).valueOf() : ''
        this.form.flupItems.forEach(obj => {
          obj.planDate = obj.planDate ? new Date(obj.planDate).valueOf() : ''
          delete obj.planName
          delete obj.id
        })
        this.$http.post(`${this.$global.oApi}api/flup/save`, this.form)
          .then(res => {
            if (res.data.code === 0 && status === 0) {
              this.title = '提示信息'
              this.message = '保存成功！'
              this.visible = true
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      add (item, key) {
        for (let i in item) {
          this.dialogForm[i] = item[i]
        }
        this.dialogForm.index = key
        this.dialogFormVisible = true
      },
      push () {
        let i = this.form.flupItems.length
        let item = {
          flupTime: '',
          planDate: '',
          plan: [],
          planName: ''
        }
        this.form.flupItems.push(item)
        this.add(item, i)
      },
      splice (key) {
        this.form.flupItems.splice(key, 1)
      },
      del (name, key) {
        let i = this.form.flupItems[key].plan.indexOf(name)
        this.form.flupItems[key].plan.splice(i, 1)
      },
      saveDialog () {
        let i = this.dialogForm.index
        if (i > 5) {
          this.dialogForm.flupTime = 5
        }
        let j = this.dialogForm.plan.indexOf('自定义')
        if (j > -1) {
          this.dialogForm.plan.splice(j, 1)
          this.dialogForm.plan.push(this.dialogForm.planName)
        }
        if (typeof this.form.flupItems[i] === 'object') {
          for (let key in this.form.flupItems[i]) {
            this.form.flupItems[i][key] = this.dialogForm[key]
          }
        }
        this.dialogFormVisible = false
      },
      previous () {
        this.$emit('previous')
        this.save(-1)
      },
      preview () {
        this.$router.push({name: 'CaseDetail', params: {id: this.$route.params.id, userId: this.$route.params.userId}})
      },
      complete () {
        this.$http.post(`${this.$global.api}basicInformation/saveAll?illnessId=${this.$route.params.id}`)
          .then(res => {
            if (res.data.code === 0) {
              this.$router.push({name: 'CaseList'})
            }
          })
      },
      init () {
        this.$http.get(`${this.$global.oApi}api/flup/find?userId=${this.$route.params.userId}&doctorId=${this.token['parameter1']}&time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.form.id = res.data.data.id
              this.form.planDate = res.data.data.planDate
              this.form.flupItems = res.data.data.flupItems
            }
          })
      },
      init1 () {
        this.$http.get(`${this.$global.oApi}api/flup/findOthers?userId=${this.$route.params.userId}&doctorId=${this.token['parameter1']}&time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.options = res.data.data
            }
          })
      },
      goBack () {
        this.$router.push({name: 'CaseList'})
      }
    },
    computed: {
      token () {
        return this.$store.state.token
      },
      userId () {
        if (this.$store.state.userId) {
          this.init(this.$store.state.userId)
        }
        return this.$store.state.userId
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/global';

  .record-dialog {
    min-width: 480px !important;
    .checkbox-block {
      display: block;
      margin: 0 !important;
      .caseform-input {
        display: block;
      }
    }
  }

  .record-content {
    padding: 30px;
    border: 1px solid $color-border;
    font-size: 15px;
    margin-bottom: 30px;
    li {
      line-height: 2;
      padding: 15px 0;
      border-bottom: 1px dashed $color-border;
    }
    .record-icon {
      font-size: 11px;
      color: $color-white;
      background: orange;
      margin-right: 15px;
      padding: 1px;
      border: 2px solid orange;
      border-radius: 100%;
      cursor: pointer;
    }
  }
</style>
