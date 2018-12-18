// 主要化验/特殊检查结果
<template>
  <div id="tab05" class="caseform-wrapper">
    <div>
      <el-button class="drug-button" @click="pushInspection()" size="large">+ 添加检验项</el-button>
      <div class="drug-content" v-for="(item, key) in items" :key="key">
        <el-button size="large" @click="delInsp(key)" class="right-button" v-if="!(items.length === 1)">删除</el-button>
        <el-form ref="item" :model="item" label-width="120px">
          <el-form-item label="选择检查大类">
            <el-select v-model="item.inspectType" placeholder="请选择" v-if="types" class="caseform-input"
                       @change="selectType(item.inspectType, key)">
              <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查时间">
            <el-date-picker v-model="item.reportDate" type="date" class="caseform-input"></el-date-picker>
          </el-form-item>
          <div class="tab-table">
            <el-table :data="item.items" stripe v-if="item.items">
              <el-table-column label="检查指标" width="auto" align="center">
                <template scope="scope">
                  <span>{{scope.row.inspection}}</span>
                </template>
              </el-table-column>
              <el-table-column label="下限值" width="auto" align="center">
                <template scope="scope">
                  <el-input v-if="scope.row.lowerlimit!==undefined" v-model="scope.row.lowerlimit"
                            class="table-form"></el-input>
                  <el-input v-if="scope.row.lowerlimit===undefined" class="table-form" disabled value="/"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="上限值" width="auto" align="center">
                <template scope="scope">
                  <el-input v-if="scope.row.toplimit!==undefined" v-model="scope.row.toplimit"
                            class="table-form"></el-input>
                  <el-input v-if="scope.row.toplimit===undefined" class="table-form" disabled value="/"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="参考值" width="auto" align="center">
                <template scope="scope">
                  <el-input v-if="scope.row.reference!==undefined" v-model="scope.row.reference"
                            class="table-form"></el-input>
                  <el-input v-if="scope.row.reference===undefined" class="table-form" disabled value="/"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单位" width="auto" align="center">
                <template scope="scope">
                  <el-input v-model="scope.row.unit" class="table-form"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="数值" width="150" align="center">
                <template scope="scope">
                  <el-input v-model="scope.row.result" placeholder="请输入数值" class="table-form"
                            @change="valueChange(scope.row, key, scope.$index)"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="标准" width="170" align="center">
                <template scope="scope">
                  <el-select v-model="scope.row.standard" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="编辑" width="auto" align="center">
                <template scope="scope">
                  <div class="table-button__wrapper">
                    <el-button class="table-button" size="small" @click="delRow(key, scope.$index)">删除
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <el-dialog title="提示" :visible.sync="isDeletePre" size="tiny">
        <span>确定要删除么?</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDeletePre">确 定</el-button>
        <el-button type="primary" @click="isDeletePre = false">取 消</el-button>
      </span>
      </el-dialog>
    </div>
    <el-button class="drug-button" @click="addImage()" size="large">+ 添加影像报告</el-button>
    <div class="tab-table">
      <el-table :data="imageList" stripe style="width: 100%" v-if="imageList">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left">
              <el-form-item label="临床诊断：">
                <span>{{ props.row.diagnosis }}</span>
              </el-form-item>
              <el-form-item label="影像描述：">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="诊断描述：">
                <span>{{ props.row.opinion }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="检查名称" width="auto" align="center"></el-table-column>
        <el-table-column label="报告日期" width="auto" align="center">
          <template scope="scope">
            <span>{{scope.row.createdDate | date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="报告单号" width="auto" align="center"></el-table-column>
        <el-table-column prop="technique" label="检查技术" width="auto" align="center">
          <template scope="scope">
            <span>{{scope.row.technique === 0 ? '无' : '常规'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template scope="scope">
            <div class="table-button__wrapper">
              <el-button class="table-button" size="small" @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button class="table-button" size="small" @click="handleDelete(scope.row.id)">删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="ifEdit" class="drug-content">
      <el-form ref="form" :model="imageForm" label-width="180px">
        <el-form-item label="检查名称">
          <el-input v-model="imageForm.name" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="报告日期">
          <el-date-picker v-model="imageForm.createdDate" type="date" class="caseform-input"></el-date-picker>
        </el-form-item>
        <el-form-item label="报告单号">
          <el-input v-model="imageForm.num" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="临床诊断">
          <el-input v-model="imageForm.diagnosis" type="textarea" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="检查技术">
          <el-radio-group v-model="imageForm.technique">
            <el-radio v-for="opt in optionImg" :key="opt.value" :label="opt.value">{{opt.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="影像描述">
          <el-input v-model="imageForm.description" type="textarea" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="诊断描述">
          <el-input v-model="imageForm.opinion" type="textarea" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveImage()">保存</el-button>
          <el-button class="button-base" @click="closeImage()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="caseform-button">
      <el-button type="primary" @click="save(0)">保存</el-button>
      <el-button type="primary" @click="previous()">上一步</el-button>
      <el-button type="primary" @click="save(1)">下一步</el-button>
      <el-button @click="preview()">预览</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>
    <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
    <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
      <span>确定要删除么?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDelete">确 定</el-button>
        <el-button type="primary" @click="isDelete = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import '@/components/_libs/filter'
  import AppDialog from '@/components/_libs/dialog'

  export default {
    name: 'tab05',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        items: [],
        types: null,
        options: [{
          value: 0,
          label: '正常'
        }, {
          value: 1,
          label: '偏低'
        }, {
          value: 2,
          label: '偏高 '
        }],
        optionImg: [{
          value: 1,
          label: '常规'
        }, {
          value: 0,
          label: '无'
        }],
        imageForm: {
          createdDate: '',
          description: '',
          diagnosis: '',
          name: '',
          num: '',
          opinion: '',
          technique: ''
        },
        id: '',
        imageList: null,
        ifEdit: false,
        delKeyPre: '',
        delIndexPre: '',
        isDeletePre: false,
        isDelete: false,
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.getTypes()
      this.getData()
    },
    methods: {
      save (status) {
        if (this.items.length !== 0 && this.inspectionLength() === true) {
          this.items.forEach(item => {
            item.illnessId = this.$route.params.id
            item.modifier = this.token['parameter3']
            item.reportDate = item.reportDate ? new Date(item.reportDate).valueOf() : ''
          })
          this.$http.post(`${this.$global.api}labReportRecord/saveRecord`, this.items)
            .then(res => {
              if (res.data.code === 0 && status === 0) {
                this.title = '提示信息'
                this.message = '保存成功！'
                this.visible = true
                this.getData(0)
              }
              if (res.data.code === 0 && status === 1) {
                this.$emit('next')
              }
            })
            .catch(err => {
              this.title = '错误信息'
              this.message = '啊哦～服务器出小差了，请重试！'
              this.visible = true
              console.log(err)
            })
        } else if (this.items.length === 0 && status === 1) {
          this.$emit('next')
        }
      },
      previous () {
        this.$emit('previous')
        this.save()
      },
      preview () {
        this.$router.push({name: 'CaseDetail', params: {id: this.$route.params.id, userId: this.$route.params.userId}})
      },
      selectType (type, key) {
        this.$http.get(`${this.$global.api}inspect/getAllInspectItem?inspectTypeName=${encodeURI(type)}&&time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
//              console.log(res.data.data)
              let inspect = res.data.data
              let items = []
              inspect.forEach(obj => {
                let item
                if (obj.type === 1) {
                  item = {
                    inspection: obj.name,
                    lowerlimit: obj.lowerlimit,
                    toplimit: obj.toplimit,
                    result: '',
                    standard: '',
                    unit: obj.unit
                  }
                } else {
                  item = {
                    inspection: obj.name,
                    reference: obj.reference,
                    result: '',
                    standard: '',
                    unit: obj.unit
                  }
                }
                items.push(item)
              })
              this.items[key].items = items
              console.log(this.items)
            } else {
              this.items[key].items = null
            }
          })
          .catch(err => {
            this.items[key].items = null
            console.log(err)
          })
      },
      getTypes () {
        this.$http.get(`${this.$global.api}inspect/getInspectTypes?time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.types = res.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getData (status) {
        this.$http.get(`${this.$global.api}labReportRecord/get?illnessId=${this.$route.params.id}&&time=${new Date().getTime()}`)
          .then(res => {
            // 0为检验项 1为影像报告
            if (res.data.code === 0 && res.data.data && status === 0) {
              this.items = res.data.data.recordDtos
            } else if (res.data.code === 0 && res.data.data && status === 1) {
              this.imageList = res.data.data.imagingReportDtos
            } else {
              this.items = res.data.data.recordDtos
              this.imageList = res.data.data.imagingReportDtos
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      pushInspection () {
        this.items.push({
          inspectType: '',
          reportDate: '',
          items: null
        })
      },
      inspectionLength () {
        let status
        this.items.forEach(item => {
          if (item.inspectType === '' || item.reportDate === '') {
            this.title = '提示信息'
            this.message = '请将数据添加完全'
            this.visible = true
            status = false
          } else {
            status = true
          }
        })
        return status
      },
      delInsp (key) {
        this.items.splice(key, 1)
      },
      delRow (key, index) {
        this.isDeletePre = true
        this.delKeyPre = key
        this.delIndexPre = index
      },
      confirmDeletePre () {
        this.items[this.delKeyPre].items.splice(this.delIndexPre, 1)
        this.isDeletePre = false
      },
      valueChange (obj, key, index) {
        if (obj.lowerlimit && obj.toplimit && obj.result) {
          let i
          if (Number(obj.result) < Number(obj.lowerlimit)) {
            i = 1
          }
          if (Number(obj.result) > Number(obj.toplimit)) {
            i = 2
          }
          if (Number(obj.lowerlimit) <= Number(obj.result) && Number(obj.result) <= Number(obj.toplimit)) {
            i = 0
          }
          this.items[key].items[index].standard = i
        }
      },
      addImage () {
        this.resetForm()
        this.ifEdit = true
      },
      saveImage () {
        this.imageForm.illnessId = this.$route.params.id
        this.imageForm.modifier = this.token['parameter3']
        this.imageForm.createdDate = this.imageForm.createdDate ? new Date(this.imageForm.createdDate).valueOf() : ''
        this.$http.post(`${this.$global.api}labReportRecord/saveReport`, this.imageForm)
          .then(res => {
            if (res.data.code === 0) {
              this.title = '提示信息'
              this.message = '保存成功！'
              this.visible = true
              this.resetForm()
              this.getData(1)
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出小差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      handleEdit (data) {
        for (let obj in data) {
          this.imageForm[obj] = data[obj]
        }
        this.ifEdit = true
      },
      handleDelete (id) {
        this.id = id
        this.isDelete = true
      },
      confirmDelete () {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}labReportRecord/deleteReport?id=${this.id}`)
          .then(res => {
            if (res.data.code === 0) {
              this.title = '提示信息'
              this.message = '删除成功！'
              this.visible = true
              this.getData(1)
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出小差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      closeImage () {
        this.ifEdit = false
      },
      resetForm () {
        this.ifEdit = false
        delete this.imageForm.id
        this.imageForm = {
          createdDate: '',
          description: '',
          diagnosis: '',
          name: '',
          num: '',
          opinion: '',
          technique: ''
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
  @import '../case';

  .right-button {
    position: absolute;
    right: 15px;
    top: 15px;
    color: #2186ed;
    border-color: #2186ed;
  }
  .drug-content .el-form-item{
    width: 90%;
  }
</style>