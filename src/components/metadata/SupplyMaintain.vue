<template>
  <div class="metadata">
    <div class="drug-top">
      <a class="back" @click="backSupply" style="cursor:pointer">返回</a>
      <el-button @click="editSupplyMaintain" class="data-btn-add"><span
        class="data-plus">+</span> 新增耗材名
      </el-button>
    </div>
    <el-dialog title="新增耗材名" :visible.sync="editdata">
      <el-form :model="dto" :rules="rules" ref="dto">
        <el-form-item label="耗材名" prop="name">
          <el-input v-model.trim="dto.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSupplyMaintain('dto')">保存</el-button>
        <el-button @click="editdata = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="data-table">
      <el-table stripe :data="supplyMaintainList">
        <el-table-column align="center" prop="id" label="序号" class="tableId">
        </el-table-column>
        <el-table-column class="dc-column" align="center" prop="name" label="耗材名"></el-table-column>
        <el-table-column align="center" label="编辑">
          <template scope="scope">
            <el-button class="data-btn" @click="editSupplyMaintain(scope.row)">编辑</el-button>
            <el-button class="data-btn" @click="setDeleteId(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>确定要删除么?</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteSupplyMaintain(deleteId)">确 定</el-button>
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
  export default {
    name: 'supplyType',
    data () {
      return {
        dto: {id: '', name: ''},
        rules: {name: [{required: true, message: '请输入耗材名', trigger: 'blur'}]},
        editdata: false,
        isDelete: false,
        deleteId: '',
        supplyMaintainList: [],
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
      this.getSupplyMaintainList(0)
    },
    methods: {
      backSupply () {
        this.$router.push({name: 'Supplies'})
      },
      editSupplyMaintain (res) {
        this.editdata = true
        if (res.id > 0) {
          this.title = '编辑耗材名称'
          this.dto = res
        } else {
          this.title = '新增耗材名称'
          this.dto = {id: '', name: ''}
        }
      },
      saveSupplyMaintain (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post(`${this.$global.api}material/saveName`, this.dto).then(res => {
              if (res.data && res.data.code === 0) {
                this.editdata = false
                this.getSupplyMaintainList(this.currentPage - 1)
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
      getSupplyMaintainList (page) {
        this.$http.get(`${this.$global.api}material/getName?size=20&page=${page}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.supplyMaintainList = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              this.supplyMaintainList = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      setDeleteId (id) {
        this.isDelete = true
        this.deleteId = id
      },
      deleteSupplyMaintain (id) {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}material/deleteName?id=${id}`).then(res => {
          if (res.data && res.data.code === 0) {
            this.getSupplyMaintainList(this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = '删除失败！'
          }
        })
      },
      handleCurrentChange () {
        this.getSupplyMaintainList(this.currentPage - 1)
      }
    }
  }
</script>
<style lang='scss'>
  @import './metadata';
</style>
