<template>
  <div id="checkCategory" class="metadata">
    <el-button @click="editCheckCategory" class="data-btn-add"><span class="data-plus">+</span> 新增检查类目
    </el-button>
    <el-dialog :title="title" :visible.sync="editdata">
      <el-form :model="dto" :rules="rules" ref="dto">
        <el-form-item label="检查类目名" prop="name">
          <el-input v-model.trim="dto.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveCheckCategory('dto')">保存</el-button>
        <el-button @click="editdata = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="data-table">
      <el-table stripe :data="checkCategorys" width="100%">
        <el-table-column align="center" prop="id" label="序号" class="tableId" width="auto" min-width="50">
        </el-table-column>
        <el-table-column class="dc-column" align="center" prop="name" label="检查类目名" width="auto" min-width="150"></el-table-column>
        <el-table-column align="center" label="编辑" width="auto" min-width="150">
          <template scope="scope">
            <el-button class="data-btn" @click="editCheckCategory(scope.row)">编辑</el-button>
            <el-button class="data-btn" @click="setDeleteId(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>确定要删除么?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteCheckCategory(deleteId)">确 定</el-button>
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
    name: 'checkCategory',
    data () {
      return {
        title: '',
        dto: {id: '', name: ''},
        rules: {name: [{required: true, message: '请输入检查类目', trigger: 'blur'}]},
        editdata: false,
        isDelete: false,
        deleteId: '',
        checkCategorys: [],
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
      this.checkCategoryList(0)
    },
    methods: {
      checkCategoryList (page) {
        this.$http.get(`${this.$global.api}inspect/getInspectType?size=20&page=${page}?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.checkCategorys = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              this.checkCategorys = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      editCheckCategory (res) {
        this.editdata = true
        if (res.id > 0) {
          this.title = '编辑检查类目'
          this.dto = res
        } else {
          this.title = '新增检查类目'
          this.dto = {id: '', name: ''}
        }
      },
      saveCheckCategory (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post(`${this.$global.api}inspect/saveInspectType`, this.dto).then(res => {
              if (res.data && res.data.code === 0) {
                this.editdata = false
                this.checkCategoryList(this.currentPage - 1)
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
      deleteCheckCategory (id) {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}inspect/deleteInspectType?id=${id}`).then(res => {
          if (res.data && res.data.code === 0) {
            this.checkCategoryList(this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = '删除失败！'
          }
        })
      },
      handleCurrentChange () {
        this.checkCategoryList(this.currentPage - 1)
      }
    }
  }
</script>
<style lang='scss'>
  @import './metadata';
</style>
