<template>
  <div id="secondCategory" class="metadata">
    <div class="drug-top">
      <div class="drug-select"><a class="back" @click="backFirstCategory" style="cursor:pointer">返回</a><span
        class="title-first">一级类目: {{this.$route.params.name}}</span></div>
      <el-button @click="editSecondCategory" class="data-btn-add" style="float: right;margin-top: 15px">
        <span class="data-plus">+</span> 新增二级类目
      </el-button>
    </div>
    <el-dialog :title="title" :visible.sync="editdata">
      <el-form :model="classifyDto">
        <el-form-item label="类目名称">
          <el-input v-model.trim="classifyDto.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="classifyDto.usingStatus" placeholder="">
            <el-option label="启用" value="true"></el-option>
            <el-option label="禁用" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSecondCategory">保存</el-button>
        <el-button @click="editdata = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="data-table">
      <el-table stripe :data="secondCategorys">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column align="center" hidden width="10">
          <template scope="scope" hidden>
            <span hidden>{{scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称">
          <template scope="scope">
            <span>{{scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="usingStatus" label="状态"></el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button class="data-btn" @click="editSecondCategory(scope.row)">编辑</el-button>
            <el-button class="data-btn" @click="setDeleteId(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>确定删除?</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="isDelete = false">取 消</el-button>
    <el-button type="primary" @click="deleteSecondCategory(deleteId)">确 定</el-button>
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
    name: 'secondCategory',
    props: ['id'],
    data () {
      return {
        title: '',
        classifyDto: {id: '', name: '', usingStatus: ''},
        editdata: false,
        isDelete: false,
        deleteId: '',
        secondCategorys: [],
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
      this.secondCategoryList(0)
    },
    methods: {
      backFirstCategory () {
        this.$router.push({name: 'DrugCategory'})
      },
      secondCategoryList (page) {
        this.$http.get(`${this.$global.api}medicineClassify/second/find/${this.$route.params.id}?page=${page}&size=20`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.secondCategorys = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              this.secondCategorys = content
              for (let i = 0; i < res.data.data.content.length; i++) {
                res.data.data.content[i].usingStatus = this.formatStatus(res.data.data.content[i].usingStatus)
              }
            }
          }
        }).catch(err => {
          console.log(err)
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
      editSecondCategory (res) {
        this.editdata = true
        if (res.id > 0) {
          this.title = '编辑二级药品类目'
          this.classifyDto = res
        } else {
          this.title = '新增二级药品类目'
          this.classifyDto = {id: '', name: '', usingStatus: ''}
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
      saveSecondCategory () {
        delete this.classifyDto.createdDate
        delete this.classifyDto.lastModifiedDate
        delete this.classifyDto.secondClassifies
        this.classifyDto.usingStatus = this.setStatu(this.classifyDto.usingStatus)
        this.$http.post(`${this.$global.api}medicineClassify/second/save/${this.$route.params.id}`, this.classifyDto).then(res => {
          if (res.data && res.data.code === 0) {
            this.editdata = false
            this.secondCategoryList(this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = res.data.msg
          }
        })
      },
      setDeleteId (id) {
        this.isDelete = true
        this.deleteId = id
      },
      deleteSecondCategory (id) {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}medicineClassify/second/delete?secondClassifyId=${id}`).then(res => {
          if (res.data && res.data.code === 0) {
            this.secondCategoryList(this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = '删除失败！'
          }
        })
      },
      handleCurrentChange () {
        this.secondCategoryList(this.currentPage - 1)
      }
    }
  }
</script>
<style lang='scss'>
  @import './metadata';
</style>
