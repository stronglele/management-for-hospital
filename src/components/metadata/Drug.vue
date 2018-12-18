<template>
  <div id="drug" class="metadata">
    <div class="drug-top">
      <div class="drug-select">
        <el-select v-model="valueCategory" placeholder="全部" @change="getDrugList(valueCategory, 0)">
          <el-option label="全部" value="0">全部</el-option>
          <el-option v-for="item in drugCategoryList" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="drug-add">
        <el-button @click="addDrug" class="data-btn-add"
                   style="float: right;margin-top: 15px;margin-right: 0"><span
          class="data-plus">+</span> 新增药品
        </el-button>
      </div>
    </div>
    <div class="drug-edit">
      <el-dialog :title="title" :visible.sync="editdata" @open="getDrugCategoryList">
        <el-form :model="medicineDto" :rules="rules" ref="medicineDto">
          <el-form-item label="分类" prop="classifyId">
            <el-select v-model="medicineDto.classifyId" placeholder="请选择药品分类">
              <el-option v-for="item in drugCategoryList" :label="item.name" :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="drug-edit-input">
            <el-form-item label="药品通用名" prop="tradeName">
              <el-input v-model.trim="medicineDto.tradeName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品名">
              <el-input v-model.trim="medicineDto.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model.trim="medicineDto.specs" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格单位">
              <el-input v-model.trim="medicineDto.unit" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="剂量用法">
              <el-input v-model.trim="medicineDto.dosage" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="注意事项">
              <el-input v-model.trim="medicineDto.notes" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="状态">
            <el-select v-model="medicineDto.usingStatus" placeholder="启用">
              <el-option label="启用" value="true"></el-option>
              <el-option label="禁用" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveDrug('medicineDto')">保存
          </el-button>
          <el-button @click="editdata = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="data-table">
      <el-table stripe :data="drugList" style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" class="tableId" width="50"></el-table-column>
        <el-table-column class="data-column" align="center" prop="tradeName" label="通用名" width="auto"
                         min-width="150"></el-table-column>
        <el-table-column class="data-column" align="center" label="分类" width="auto" min-width="150">
          <template scope="scope">
            <span>{{scope.row.medicineClassify.name }}</span>
          </template>
        </el-table-column>
        <el-table-column class="data-column" align="center" prop="name" label="商品名" width="auto"
                         min-width="150"></el-table-column>
        <el-table-column class="data-column" align="center" prop="specs" label="规格" width="auto"
                         min-width="150"></el-table-column>
        <el-table-column class="data-column" align="center" prop="unit" label="规格单位" width="auto"
                         min-width="100"></el-table-column>
        <el-table-column class="data-column" align="center" prop="dosage" label="剂量用法" width="auto"
                         min-width="150"></el-table-column>
        <el-table-column class="data-column" align="center" prop="notes" label="注意事项" width="auto"
                         min-width="200"></el-table-column>
        <el-table-column class="data-column" align="center" prop="usingStatus" label="状态" width="auto"
                         min-width="100"></el-table-column>
        <el-table-column class="dc-column" align="center" label="编辑" width="auto" min-width="150">
          <template scope="scope">
            <el-button class="data-btn"
                       @click="editDrug(scope.row)">编辑
            </el-button>
            <el-button class="data-btn"
                       @click="setDeleteId(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>确定要删除么?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteDrug(deleteId)">确 定</el-button>
          <el-button @click="isDelete = false">取 消</el-button>
  </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="isErrorMsg" size="tiny">
        <span>{{errorMsg}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="isErrorMsg = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                   :page-size="20" layout="prev, pager, next, jumper" :total="totalElements" v-if="isPage">
    </el-pagination>
  </div>
</template>
<script>
  export default{
    name: 'drug',
    data () {
      return {
        valueCategory: '',
        drugCategoryList: [],
        drugList: [],
        title: '',
        medicineDto: {
          id: '',
          classifyId: '',
          tradeName: '',
          name: '',
          specs: '',
          unit: '',
          dosage: '',
          notes: '',
          usingStatus: ''
        },
        rules: {
          classifyId: [{required: true, message: '请选择药品分类', trigger: 'change'}],
          tradeName: [{required: true, message: '请输入药品通用名', trigger: 'blur'}]
        },
        editdata: false,
        isDelete: false,
        deleteId: '',
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
      this.getDrugCategoryList()
      this.getDrugList(0, 0)
    },
    methods: {
//        查询药品类目
      getDrugCategoryList () {
        this.$http.get(`${this.$global.api}medicineClassify/find/us?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              this.drugCategoryList = []
            } else {
              content.forEach(obj => {
                obj.id = `${obj.id}`
              })
              this.drugCategoryList = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getDrugList (classifyId, page) {
        this.$http.get(`${this.$global.api}medicine/find?classifyId=${classifyId}&size=20&page=${page}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.drugList = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              content.forEach(obj => {
                obj.medicineClassify.id = `${obj.medicineClassify.id}`
              })
              this.drugList = content
              for (let i = 0; i < res.data.data.content.length; i++) {
                res.data.data.content[i].usingStatus = this.formatStatus(res.data.data.content[i].usingStatus)
              }
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      formatStatus (statu) {
        if (statu === true) {
          return '启用'
        }
        if (statu === false) {
          return '禁用'
        }
        return null
      },
      addDrug () {
        this.editdata = true
        this.title = '新增药品名'
        this.medicineDto = {
          classifyId: '',
          tradeName: '',
          name: '',
          specs: '',
          unit: '',
          dosage: '',
          notes: '',
          usingStatus: ''
        }
      },
      editDrug (res) {
        this.editdata = true
        this.title = '编辑药品名'
        this.medicineDto = {
          id: res.id,
          classifyId: res.medicineClassify.id,
          tradeName: res.tradeName,
          name: res.name,
          specs: res.specs,
          unit: res.unit,
          dosage: res.dosage,
          notes: res.notes,
          usingStatus: res.usingStatus
        }
      },
      setStatu (statu) {
        if (statu === '启用' || statu === 'true') {
          return 'true'
        }
        if (statu === '禁用' || statu === 'false') {
          return 'false'
        }
      },
      saveDrug (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.medicineDto.usingStatus === '') {
              this.medicineDto.usingStatus = 'true'
            }
            this.medicineDto.usingStatus = this.setStatu(this.medicineDto.usingStatus)
            this.$http.post(`${this.$global.api}medicine/save`, this.medicineDto, {'headers': {'Content-Type': 'application/json; charset=utf-8'}}).then(res => {
              if (res.data && res.data.code === 0) {
                this.editdata = false
                this.getDrugList(0, this.currentPage - 1)
              } else {
                this.isErrorMsg = true
                this.errorMsg = res.data.msg
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      setDeleteId (id) {
        this.isDelete = true
        this.deleteId = id
      },
      deleteDrug (id) {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}medicine/delete?id=${id}`).then(res => {
          if (res.data && res.data.code === 0) {
            this.getDrugList(0, this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = '删除失败！'
          }
        })
      },
      handleCurrentChange () {
        this.getDrugList(0, this.currentPage - 1)
      }
    }
  }
</script>
<style lang='scss'>
  @import './metadata';
</style>
