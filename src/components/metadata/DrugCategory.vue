<template>
  <div id="drugCategory" class="metadata">
    <el-button @click="editDrugCategory" class="data-btn-add"><span class="data-plus">+</span> 新增药品分类
    </el-button>
    <el-dialog :title="title" :visible.sync="editdata">
      <el-form :model="classifyDto" :rules="rules" ref="classifyDto">
        <el-form-item label="序号" hidden>
          <el-input v-model="classifyDto.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model.trim="classifyDto.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="usingStatus">
          <el-select v-model="classifyDto.usingStatus" placeholder="启用">
            <el-option label="启用" value="true"></el-option>
            <el-option label="禁用" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDrugCategory('classifyDto')">保存</el-button>
        <el-button @click="editdata = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="data-table">
      <el-table stripe :data="drugCategorys" width="100%">
        <el-table-column align="center" prop="id" label="序号" class="tableId" width="auto"
                         min-width="50"></el-table-column>
        <el-table-column align="center" label="分类" width="auto" min-width="150">
          <template scope="scope">
            <span>{{scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="usingStatus" label="状态" width="auto" min-width="150"></el-table-column>
        <el-table-column align="center" label="编辑">
          <template scope="scope">
            <el-button class="data-btn" @click="editDrugCategory(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    name: 'drugCategory',
    data () {
      var pattern = '^\\d\\d*$'
      var validName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入药品类目'))
        }
        setTimeout(() => {
          if (value.match(pattern)) {
            callback(new Error('药品类目不能为纯数字'))
          } else {
            callback()
          }
        }, 1000)
      }
      return {
        title: '',
        classifyDto: {
          id: '',
          name: '',
          usingStatus: ''
        },
        rules: {
          name: [
            {required: true, validator: validName, trigger: 'blur'}
          ],
          usingStatus: [{required: true, message: '请选择状态', trigger: 'change'}]
        },
        drugCategorys: [],
        editdata: false,
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
      this.drugCategoryList(0)
    },
    methods: {
      drugCategoryList (page) {
        this.$http.get(`${this.$global.api}medicineClassify/find?page=${page}&size=20&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.drugCategorys = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              this.drugCategorys = content
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
      editDrugCategory (res) {
        this.editdata = true
        if (res.id > 0) {
          this.title = '编辑药品分类'
          this.classifyDto = res
        } else {
          this.title = '新增药品分类'
          this.classifyDto = {name: '', usingStatus: ''}
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
      saveDrugCategory (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
//            if (this.classifyDto.usingStatus === '') {
//              this.classifyDto.usingStatus = 'true'
//            }
            delete this.classifyDto.createdDate
            delete this.classifyDto.lastModifiedDate
            this.classifyDto.usingStatus = this.setStatu(this.classifyDto.usingStatus)
            this.$http.post(`${this.$global.api}medicineClassify/save`, this.classifyDto, {'headers': {'Content-Type': 'application/json; charset=utf-8'}}).then(res => {
              if (res.data && res.data.code === 0) {
                this.editdata = false
                this.drugCategoryList(this.currentPage - 1)
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
      handleCurrentChange () {
        this.drugCategoryList(this.currentPage - 1)
      }
    }
  }

</script>
<style lang='scss'>
  @import './metadata';
</style>
