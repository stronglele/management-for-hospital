<template>
  <div id="supplies" class="metadata">
    <div class="supplies-top">
      <el-button @click="editSupply" class="data-btn-add"><span class="data-plus">+</span>
        新增商品
      </el-button>
      <el-dialog :title="title" :visible.sync="editdata" @open="showList">
        <el-form :model="dto" :rules="rules" ref="dto">
          <el-form-item label="耗材商品名" prop="name">
            <el-input v-model.trim="dto.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="耗材类型(厂商名)" prop="companyId">
            <el-select v-model="dto.companyId" placeholder="请选择耗材类型(厂商名)">
              <el-option v-for="item in companyList" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="耗材名" prop="nameId">
            <el-select v-model="dto.nameId" placeholder="请选择耗材名">
              <el-option v-for="item in nameList" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="online">
            <el-select v-model="dto.online" placeholder="启用">
              <el-option label="启用" value="true"></el-option>
              <el-option label="禁用" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSupply('dto')">保存</el-button>
          <el-button @click="editdata = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-button @click="showSupplyTypeMaintain" class="data-btn-add">耗材类型(厂商名)维护</el-button>
      <el-button @click="showSupplyMaintain" class="data-btn-add">耗材维护</el-button>
    </div>
    <div class="data-table">
      <el-table stripe :data="supplyList">
        <el-table-column align="center" prop="id" label="序号" class="tableId">
        </el-table-column>
        <el-table-column class="dc-column" align="center" prop="name" label="商品名"></el-table-column>
        <el-table-column class="dc-column" align="center" prop="companyName" label="耗材类型（厂商名）"></el-table-column>
        <el-table-column class="dc-column" align="center" prop="materialName" label="耗材名"></el-table-column>
        <el-table-column class="dc-column" align="center" prop="online" label="状态"></el-table-column>
        <el-table-column align="center" label="编辑">
          <template scope="scope">
            <el-button class="data-btn" @click="editSupply(scope.row)">编辑</el-button>
            <el-button class="data-btn" @click="setDeleteId(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>确定删除?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isDelete = false">取 消</el-button>
          <el-button type="primary" @click="deleteSupply(deleteId)">确 定</el-button>
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
    name: 'supplies',
    data () {
      return {
        title: '',
        companyList: [],
        nameList: [],
        dto: {companyId: '', id: '', name: '', nameId: '', online: ''},
        rules: {
          name: [{required: true, message: '请输入耗材名', trigger: 'blur'}],
          companyId: [{required: true, message: '请选择耗材类型(厂商名)', trigger: 'change'}],
          nameId: [{required: true, message: '请选择耗材名', trigger: 'change'}],
          online: [{required: true, message: '请选择状态', trigger: 'change'}]
        },
        supplyList: [],
        statue: '',
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
      this.getSuppliesList(0)
    },
    methods: {
      showSupplyTypeMaintain () {
        this.$router.push({name: 'SupplyType'})
      },
      showSupplyMaintain () {
        this.$router.push({name: 'SupplyMaintain'})
      },
      getSuppliesList (page) {
        this.$http.get(`${this.$global.api}material/getMaterial?size=20&page=${page}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.supplyList = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              content.forEach(obj => {
                obj.companyId = `${obj.companyId}`
                obj.nameId = `${obj.nameId}`
              })
              this.supplyList = content
              for (let i = 0; i < res.data.data.content.length; i++) {
                res.data.data.content[i].online = this.formatOnline(res.data.data.content[i].online)
              }
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      formatOnline (statu) {
        if (statu === true) {
          return '启用'
        }
        if (statu === false) {
          return '禁用'
        }
        return null
      },
      showList () {
        this.getComponeyList()
        this.getNameList()
      },
      getComponeyList () {
        this.$http.get(`${this.$global.api}material/getCompanies?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              this.companyList = []
            } else {
              content.forEach(obj => {
                obj.id = `${obj.id}`
              })
              this.companyList = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getNameList () {
        this.$http.get(`${this.$global.api}material/getNames?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              this.nameList = []
            } else {
              content.forEach(obj => {
                obj.id = `${obj.id}`
              })
              this.nameList = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      editSupply (res) {
        this.editdata = true
        if (res.id > 0) {
          this.title = '编辑耗材'
          this.dto.id = res.id
          this.dto.companyId = res.companyId
          this.dto.name = res.name
          this.dto.nameId = res.nameId
          this.dto.online = res.online
        } else {
          this.title = '新增耗材'
          this.dto = {companyId: '', id: '', name: '', nameId: '', online: ''}
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
      saveSupply (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.dto.online === '') {
              this.dto.online = 'true'
            }
            this.dto.online = this.setStatu(this.dto.online)
            this.$http.post(`${this.$global.api}material/saveMaterial`, this.dto).then(res => {
              if (res.data && res.data.code === 0) {
                this.editdata = false
                this.getSuppliesList(this.currentPage - 1)
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
      deleteSupply (id) {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}material/deleteMaterial?id=${id}`).then(res => {
          if (res.data && res.data.code === 0) {
            this.getSuppliesList(this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = '删除失败！'
          }
        })
      },
      handleCurrentChange () {
        this.getSuppliesList(this.currentPage - 1)
      }
    }
  }
</script>
<style lang='scss'>
  @import './metadata';
</style>
