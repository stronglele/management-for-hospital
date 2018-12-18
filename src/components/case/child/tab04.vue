// CAG/PCI手术记录
<template>
  <div id="tab04" class="caseform-wrapper">
    <el-form ref="form" :model="form" v-if="items&&form" label-position="top">
      <div v-for="(value, key) in tab" :key="key" class="caseform-content">
        <!--分块表头-->
        <h2 class="title">{{key}}</h2>
        <!--分块主体-->
        <div v-for="item in value" :key="item.key">
          <!-- 一级日期表单 -->
          <el-form-item :label="item.label" v-if="item.type&&item.type==='date'">
            <el-date-picker v-model="form[item.key]" type="date" :placeholder="item.label" class="caseform-input">
            </el-date-picker>
            <span v-if="item.unit">{{item.unit}}</span>
          </el-form-item>
          <!-- 一级text表单 -->
          <el-form-item :label="item.label" v-if="item.type&&item.type==='text'">
            <el-input v-model="form[item.key]" type="text" class="caseform-input"></el-input>
            <span v-if="item.unit">{{item.unit}}</span>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type&&item.type==='radio'">
            <el-radio-group v-model="form[item.key]">
              <el-radio v-for="obj in item.options" :key="obj" :label="obj">{{obj}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 一级checkbox表单 -->
          <el-form-item :label="item.label" v-if="item.type&&item.type==='checkbox'">
            <el-checkbox-group v-model="form[item.key]" v-if="item.options">
              <div v-for="opt in item.options" :key="opt.value" class="clear" style="position: relative">
                <!-- 一级表单选项 -->
                <el-checkbox
                  v-if="(!opt.contain)||(opt.contain&&Array.isArray(form[opt.contain.key])&&form[opt.contain.key].indexOf(opt.contain.value)>-1)"
                  :label="opt.value" :name="item.key" class="checkbox-block" style="width: 100px">
                  {{opt.value}}
                </el-checkbox>
                <!-- checkbox附带input行内表单 -->
                <span style="position: absolute;left: 110px;top: 9px"
                      v-if="opt.input&&opt.input.contain&&Array.isArray(form[opt.input.contain.key])&&form[opt.input.contain.key].indexOf(opt.input.contain.value)>-1">
                    <el-input v-model="form[opt.input.key]" :placeholder="opt.input.placeholder"
                              class="input-child" size="small"></el-input>
                    {{opt.input.unit}}
                  </span>
                <!--checkbox附带二级checkbox表单 -->
                <div v-if="opt.options&&Array.isArray(form[item.key])&&form[item.key].indexOf(opt.value)>-1"
                     class="form-child">
                  <el-checkbox-group v-model="form[opt.key]">
                    <div v-for="child in opt.options" :key="child.value" class="clear" style="position: relative">
                      <!-- 二级checkbox表单 -->
                      <el-checkbox :label="child.value" :name="opt.key" class="checkbox-block" style="width: 100px">
                        {{child.value}}
                      </el-checkbox>
                      <!-- 二级checkbox附带行内input表单 -->
                      <span style="position: absolute;left: 140px;top: 9px"
                            v-if="child.input&&child.input.contain&&Array.isArray(form[child.input.contain.key])&&form[child.input.contain.key].indexOf(child.input.contain.value)>-1">
                        <el-input v-model="form[child.input.key]" :placeholder="child.input.placeholder"
                                  class="input-child" size="small"></el-input>
                        {{child.input.unit}}
                      </span>
                    </div>
                  </el-checkbox-group>
                </div>
                <!--checkbox附带radio表单 -->
                <div v-if="opt.radios&&Array.isArray(form[item.key])&&form[item.key].indexOf(opt.value)>-1">
                  <el-form-item :label="radio.label" v-for="radio in opt.radios" :key="radio.key" class="form-child">
                    <el-radio-group v-model="form[radio.key]">
                      <el-radio v-for="obj in radio.options" :key="obj" :label="obj">{{obj}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div
                  v-if="opt.input&&!opt.input.contain&&Array.isArray(form[item.key])&&form[item.key].indexOf(opt.value)>-1">
                  <el-form-item :label="opt.input.label" class="form-child">
                    <el-input v-model="form[opt.input.key]" class="caseform-input"></el-input>
                  </el-form-item>
                </div>
                <!--checkbox附带二级child表单 -->
                <div v-if="opt.child&&Array.isArray(form[item.key])&&form[item.key].indexOf(opt.value)>-1"
                     class="form-child">
                  <el-form-item :label="opt.label">
                    <el-checkbox-group v-model="form[opt.key]['hc']">
                      <div v-for="child in opt.child" :key="child.value">
                        <!-- 二级checkbox表单 -->
                        <el-checkbox :label="child.value" :name="'hc'" class="checkbox-block">
                          {{child.value}}
                        </el-checkbox>
                        <div v-show="Array.isArray(form[opt.key]['hc'])&&form[opt.key]['hc'].indexOf(child.value)>-1">
                          <!-- 二级checkbox附带select表单sub -->
                          <div v-if="child.select&&options" class="form-child">
                            <el-form-item :label="child.select.label">
                              <el-select v-model="form[opt.key][child.select.key]" class="caseform-input">
                                <el-option v-for="item in options[child.value] || []"
                                           :key="item.companyName_name"
                                           :label="item.companyName_name"
                                           :value="item.companyName_name">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <!-- 二级checkbox附带多个input表单sub -->
                          <div v-if="child.inputs" class="form-child">
                          <span v-for="input in child.inputs" :key="input.key">
                            <b>{{input.label}}</b>
                            <el-input v-model="form[opt.key][input.key]" class="input-child"
                                      size="small"></el-input>
                            {{input.unit}}
                           </span>
                          </div>
                        </div>
                      </div>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
              </div>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
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
  import Tab from './data/tab04'
  import AppDialog from '@/components/_libs/dialog'

  export default {
    name: 'tab04',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        tab: Tab,
        items: null,
        form: null,
        initial: null,
        options: null,
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
        this.form.cagdate = this.form.cagdate ? new Date(this.form.cagdate).valueOf() : ''
        this.form.pcidate = this.form.pcidate ? new Date(this.form.pcidate).valueOf() : ''
        let postForm = {}
        for (let key in this.form) {
          if ((typeof this.form[key]) === 'object' && !Array.isArray(this.form[key])) {
            postForm[key] = JSON.stringify(this.form[key])
          } else {
            postForm[key] = this.form[key]
          }
        }
        this.$http.post(`${this.$global.api}operationRecord/save`, postForm)
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
        this.$http.get(`${this.$global.api}material/getNames?time=${new Date().getTime()}`)
          .then(res => {
            let items = []
            let child = []
            for (let key in Tab) {
              items.push(...Tab[key])
            }
            if (res.data.code === 0 && res.data.data) {
              res.data.data.forEach(obj => {
                child.push(this.setHC(obj.name))
              })
            }
            items.forEach(obj => {
              if (obj.key === 'sis') {
                obj.options.forEach(subObj => {
                  subObj.child = child
                })
              }
            })
            this.items = items
            this.toForm(items)
            this.getData()
          })
          .catch(err => {
            console.log(err)
          })
        this.$http.get(`${this.$global.api}material/getAllMaterial?time=${new Date().getTime()}`)
          .then(res => {
//            let company = []
            if (res.data.code === 0 && res.data.data) {
//              res.data.data.forEach(obj => {
//                company.push({label: obj.name, value: obj.name})
//              })
              this.options = res.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getData () {
        this.$http.get(`${this.$global.api}operationRecord/get?illnessId=${this.$route.params.id}&time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.initial = res.data.data
              for (let key in this.initial) {
                this.form[key] = this.initial[key]
              }
            }
          })
      },
      toForm (data) {
        let formData = {}
        data.forEach(obj => {
          if (obj.key) {
            formData[obj.key] = obj.type === 'checkbox' ? [] : ''
          }
          if (obj.options) {
            obj.options.forEach(opt => {
              if (opt.key && !opt.child) {
                formData[opt.key] = []
              }
              if (opt.input && opt.input.key) {
                formData[opt.input.key] = ''
              }
              if (opt.options) {
                opt.options.forEach(child => {
                  if (child.input && child.input.key) {
                    formData[child.input.key] = ''
                  }
                })
              }
              if (opt.key && opt.child) {
                formData[opt.key] = {}
                formData[opt.key]['hc'] = []
                opt.child.forEach(child => {
                  if (child.inputs) {
                    child.inputs.forEach(input => {
                      if (input.key) {
                        formData[opt.key][input.key] = ''
                      }
                    })
                  }
                  if (child.select && child.select.key) {
                    formData[opt.key][child.select.key] = ''
                  }
                })
              }
              if (opt.radios) {
                opt.radios.forEach(radio => {
                  if (radio.key) {
                    formData[radio.key] = ''
                  }
                })
              }
            })
          }
        })
        this.form = formData
      },
      setHC (name) {
        return {
          'value': name,
          'select': {
            'key': `${name}-M`,
            'label': '商品名'
          },
          'inputs': [{
            'key': `${name}-W`,
            'label': '宽度*长度',
            'unit': '*'
          }, {
            'key': `${name}-L`,
            'label': '',
            'unit': ''
          }]
        }
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

  .checkbox-block {
    display: block !important;
    padding: 10px 0 !important;
  }

  .input-child {
    display: inline-block !important;
    width: 150px !important;
    margin-left: 15px !important;
  }

  .form-child {
    padding: 0 30px 15px !important;
  }
</style>
