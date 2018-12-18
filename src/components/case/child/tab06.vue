// 辅助检查
<template>
  <div id="tab06" class="caseform-wrapper">
    <el-form ref="form" :model="form" v-if="items&&form" label-position="top">
      <el-form-item v-for="item in items" :key="item.key">
        <el-checkbox-group v-model="form[item.key]" v-if="item.key&&item.options">
          <div v-for="opt in item.options" :key="opt.label" class="tab06-checkbox">
            <el-checkbox :label="opt.value" :name="item.key">
              {{opt.value}}
            </el-checkbox>
            <div
              v-if="opt.input&&opt.input.contain&&Array.isArray(form[opt.input.contain.key])&&form[opt.input.contain.key].indexOf(opt.input.contain.value)>-1">
              <el-input v-model="form[opt.input.key]" :placeholder="opt.input.placeholder" :rows="5" :clos="10"
                        type="textarea"></el-input>
            </div>
            <div class="case-child"
                 v-if="opt.child&&opt.contain&&Array.isArray(form[opt.contain.key])&&form[opt.contain.key].indexOf(opt.contain.value)>-1">
              <div v-for="child in opt.child" :key="child.key">
                <el-form-item :label="child.label" v-if="child.type=='text'">
                  <el-input v-model="form[child.key]" class="caseform-input"></el-input>
                </el-form-item>
                <el-form-item :label="child.label" v-if="child.type=='date'">
                  <el-date-picker v-model="form[child.key]" type="date" :placeholder="child.label"
                                  class="caseform-input">
                  </el-date-picker>
                </el-form-item>
                <el-form-item :label="child.label" v-if="child.type=='table'">
                  <div class="tab-table">
                    <el-table :data="child.options" stripe v-if="child.options">
                      <el-table-column label="名称" width="250" align="center">
                        <template scope="scope">
                          <span>{{scope.row.label}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="测量值" width="250" align="center">
                        <template scope="scope">
                          <el-input v-model="form[scope.row.key]" class="table-form" size="10"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="正常参考值" width="250" align="center">
                        <template scope="scope">
                          <el-input v-model="form[scope.row.subKey]" class="table-form"></el-input>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
                <el-form-item :label="child.label" v-if="child.type=='checkbox'">
                  <el-checkbox-group v-model="form[opt.key]">
                    <div v-for="cOpt in child.options" :key="cOpt.label">
                      <el-checkbox :label="cOpt.value" :name="opt.key" v-if="cOpt.value !== '其他'" >
                        <tr>
                          <td style="width:150px">{{cOpt.value}}</td>
                          <td style="width:150px"><span
                          v-if="cOpt.input&&Array.isArray(form[opt.key])&&form[opt.key].indexOf(cOpt.value)>-1">
                          <el-input v-model="form[cOpt.input.key]"
                                    class="input-child" size="small"></el-input>
                          {{cOpt.input.unit}}
                         </span></td>
                        </tr>
                      </el-checkbox>
                      <el-checkbox :label="cOpt.value" :name="opt.key" v-if="cOpt.value === '其他'" >
                        {{cOpt.value}}
                          <div
                          v-if="cOpt.input&&Array.isArray(form[opt.key])&&form[opt.key].indexOf(cOpt.value)>-1">
                          <el-input v-model="form[cOpt.input.key]" :rows="5" :clos="10"
                          type="textarea"></el-input>
                          {{cOpt.input.unit}}
                         </div>
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item :label="child.label" v-if="child.type=='mix'">
                  <div v-for="subChild in child.child" :key="subChild.label">
                    <el-form-item :label="subChild.label" v-if="subChild.type=='radio'" class="clear">
                      <div v-for="subobj in subChild.options" :key="subobj.value" class="form-radio">
                        <el-radio-group v-model="form[subChild.key]">
                          <el-radio :label="subobj.value">
                            {{subobj.value}}
                          </el-radio>
                        </el-radio-group>
                        <div v-for="ccOpt in subobj.options" :key="ccOpt.label">
                          <el-checkbox-group v-model="form[subobj.key]"
                                             v-if="subobj.type==='checkbox'&&subobj.options&&form[subChild.key]===subobj.value"
                                             style="position: relative">
                            <el-checkbox :label="ccOpt.value" :name="subobj.key" style="width: 80px">{{ccOpt.value}}
                            </el-checkbox>
                            <span style="position: absolute;left: 90px;top: -1px;width: 300px"
                                  v-if="ccOpt.input&&Array.isArray(form[subobj.key])&&form[subobj.key].indexOf(ccOpt.value)>-1">
                                  <el-input v-model="form[ccOpt.input.key]"
                                            class="input-child" size="small"></el-input>
                                  {{ccOpt.input.unit}}
                            </span>
                          </el-checkbox-group>
                        </div>
                        <div v-if="subobj.type==='checkboxs'&&subobj.child&&form[subChild.key]===subobj.value">
                          <div v-for="sChild in subobj.child" :key="sChild.key">
                            <el-form-item :label="sChild.label" v-if="sChild.type==='checkbox'">
                              <el-checkbox-group v-model="form[sChild.key]">
                                <el-checkbox :label="scopt" :name="sChild.key" v-for="scopt in sChild.options"
                                             :key="scopt">
                                </el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                            <el-form-item :label="sChild.label"
                                          v-if="sChild.type==='radio'&&sChild.contain&&Array.isArray(form[sChild.contain.key])&&form[sChild.contain.key].indexOf(sChild.contain.value)>-1">
                              <el-radio-group v-model="form[sChild.key]">
                                <el-radio :label="scopt" v-for="scopt in sChild.options" :key="scopt">
                                  {{scopt}}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="caseform-button">
      <el-button type="primary" @click="save(0)">保存</el-button>
      <el-button type="primary" @click="previous()">上一步</el-button>
      <el-button type="primary" @click="save(1)">下一步</el-button>
      <el-button @click="preview()">预览</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>
    <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
  </div>
</template>

<script>
  import Tab from './data/tab06'
  import AppDialog from '@/components/_libs/dialog'
  import ElForm from '../../../../node_modules/element-ui/packages/form/src/form.vue'

  export default {
    name: 'tab06',
    components: {
      ElForm,
      'app-dialog': AppDialog
    },
    data () {
      return {
        items: Tab.item,
        form: null,
        initial: null,
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.init()
    },
    methods: {
      save (status) {
        this.form.illnessId = this.$route.params.id
        this.form.modifier = this.token['parameter3']
        this.form.checkedDate = this.form.checkedDate ? new Date(this.form.checkedDate).valueOf() : null

        this.$http.post(`${this.$global.api}auxiliaryExamination/save`, this.form)
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
      init () {
        this.toForm(this.items)
        this.$http.get(`${this.$global.api}/auxiliaryExamination/find/${this.$route.params.id}?time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.form = res.data.data
            }
          })
      },
      toForm (data) {
        let formData = {}
        data.forEach(obj => {
          if (obj.key) {
            formData[obj.key] = []
          }
          if (obj.options) {
            obj.options.forEach(subObj => {
              if (subObj.key) {
                formData[subObj.key] = []
              }
              if (subObj.child) {
                subObj.child.forEach(subChild => {
                  if (subChild.key) {
                    formData[subChild.key] = ''
                  }
                  if (subChild.type && subChild.type === 'table' && subChild.options) {
                    subChild.options.forEach(opt => {
                      formData[opt.key] = ''
                      formData[opt.subKey] = ''
                    })
                  }
                  if (subChild.type && subChild.type === 'checkbox' && subChild.options) {
                    subChild.options.forEach(opt => {
                      if (opt.input) {
                        formData[opt.input.key] = ''
                      }
                    })
                  }
                  if (subChild.type && subChild.type === 'mix' && subChild.child) {
                    subChild.child.forEach(sopt => {
                      if (sopt.key && sopt.type === 'radio') {
                        formData[sopt.key] = ''
                      }
                      if (sopt.options) {
                        sopt.options.forEach(subOpt => {
                          if (subOpt.key) {
                            formData[subOpt.key] = []
                          }
                          if (subOpt.input) {
                            formData[sopt.input.key] = ''
                          }
                          if (subOpt.child) {
                            subOpt.child.forEach(ssubOpt => {
                              formData[ssubOpt.key] = ssubOpt.type === 'radio' ? '' : []
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
          if (obj.input) {
            formData[obj.input.key] = ''
          }
        })
        this.form = formData
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

  .case-child {
    padding: 15px 30px;
    margin: 15px 0;
    border: 1px solid $color-border
  }

  .table-form {
    input {
      border: none !important;
      background: transparent !important;
    }
  }

  .form-radio {
    float: left;
  }

  #tab06 .el-textarea {
    width: 30%;
  }

  #tab06 .table-form .el-input__inner {
    width: 100px;
  }

  .tab06-checkbox .el-checkbox {
    width: 100%;
  }

  .el-textarea textarea{
    white-space: normal;
  }

  .caseform-wrapper {
    .el-checkbox + .el-checkbox {
      margin-left: 0 !important;
    }
  }
  #tab06 .el-textarea{
    width: 30%;
  }

  #tab06 .table-form .el-input__inner {
    width: 100px;
  }

  .tab06-checkbox .el-checkbox {
    width: 100%;
  }

  .el-textarea textarea{
    white-space: normal;
  }

  .caseform-wrapper {
    .el-checkbox + .el-checkbox {
      margin-left: 0 !important;
    }
  }
</style>