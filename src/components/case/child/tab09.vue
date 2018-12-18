// 出院带药
<template>
  <div id="tab09" class="caseform-wrapper">
    <div class="tab-table">
      <el-table :data="tableData" stripe style="width: 100%" v-if="tableData">
        <el-table-column prop="medicineName" label="药物名称" width="auto" align="center"></el-table-column>
        <el-table-column prop="classifyName" label="药物分类" width="auto" align="center"></el-table-column>
        <el-table-column prop="specs" label="规格" width="auto" align="center"></el-table-column>
        <el-table-column prop="dosage" label="剂量用法" width="auto" align="center"></el-table-column>
        <el-table-column prop="notes" label="注意事项" width="auto" align="center"></el-table-column>
        <el-table-column prop="takeMedicine" label="带药情况" width="auto" align="center"></el-table-column>
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
    <el-button class="drug-button" @click="handleAdd()" size="large">+ 添加一项药物</el-button>
    <div v-show="ifEdit" class="drug-content">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="药物名称">
          <el-autocomplete
            class="caseform-input"
            v-model="form.medicineName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="药物分类">
          <el-input v-model="form.classifyName" disabled class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.specs" disabled class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="剂量用法">
          <el-input v-model="form.dosage" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="注意事项">
          <el-input v-model="form.notes" type="textarea" class="caseform-input"></el-input>
        </el-form-item>
        <el-form-item label="带药情况">
          <el-radio-group v-model="form.takeMedicine">
            <el-radio label="出院带药">出院带药</el-radio>
            <el-radio label="自备药物">自备药物</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save(0)" style="margin-left: 50px">保存</el-button>
          <el-button class="button-base" @click="close()" style="margin-left: 50px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="caseform-button">
      <el-button type="primary" @click="previous()">上一步</el-button>
      <el-button type="primary" @click="next()">下一步</el-button>
      <el-button @click="preview()">预览</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>
    <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
    <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
      <span>确定要删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDelete">确 定</el-button>
        <el-button type="primary" @click="isDelete = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AppDialog from '@/components/_libs/dialog'

  export default {
    name: 'tab09',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        form: {
          medicineName: '',
          classifyName: '',
          specs: '',
          dosage: '',
          notes: '',
          takeMedicine: ''
        },
        ifEdit: false,
        isDelete: false,
        id: '',
        tableData: null,
        title: '',
        message: '',
        timeout: null,
        visible: false
      }
    },
    created () {
      this.init()
    },
    methods: {
      handleEdit (data) {
        for (let obj in data) {
          this.form[obj] = data[obj]
        }
        this.ifEdit = true
      },
      handleDelete (id) {
        this.isDelete = true
        this.id = id
      },
      confirmDelete () {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}dischargeMedication/delete?dmId=${this.id}`)
          .then(res => {
            if (res.data.code === 0) {
              this.title = '提示信息'
              this.message = '删除成功！'
              this.visible = true
              this.init()
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      handleAdd () {
        this.resetForm()
        this.ifEdit = true
      },
      save (status) {
//        console.log(this.form)
        this.form.illnessId = this.$route.params.id
        this.$http.post(`${this.$global.api}dischargeMedication/save`, this.form)
          .then(res => {
            if (res.data.code === 0 && status === 0) {
              this.title = '提示信息'
              this.message = '保存成功！'
              this.visible = true
              this.resetForm()
              this.init()
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      querySearchAsync (queryString, cb) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.$http.get(`${this.$global.api}medicine/findName?name=${encodeURI(queryString)}&time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              let data = res.data.data
              for (let i = 0; i < data.length; i++) {
                data[i].value = data[i].name + '(' + data[i].tradeName + ')'
              }
              cb(data)
            }
          })
        }, 2000 * Math.random())
      },
      handleSelect (item) {
        this.form.dosage = item.dosage
        this.form.notes = item.notes
        this.form.classifyName = item.medicineClassify.name
        this.form.specs = item.specs
      },
      close () {
        this.ifEdit = false
      },
      next () {
        this.$emit('next')
      },
      previous () {
        this.$emit('previous')
        this.save(-1)
      },
      preview () {
        this.$router.push({name: 'CaseDetail', params: {id: this.$route.params.id, userId: this.$route.params.userId}})
      },
      init () {
        this.$http.get(`${this.$global.api}dischargeMedication/find/${this.$route.params.id}?time=${new Date().getTime()}`)
          .then(res => {
            if (res.data.code === 0 && res.data.data) {
              this.tableData = res.data.data
            }
          })
      },
      resetForm () {
        this.ifEdit = false
        delete this.form.id
        this.form = {
          medicineName: '',
          classifyName: '',
          specs: '',
          dosage: '',
          notes: '',
          takeMedicine: ''
        }
      },
      goBack () {
        this.$router.push({name: 'CaseList'})
      }
    }
  }
</script>

<style lang="scss">
  @import '../case';
</style>
