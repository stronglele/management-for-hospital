<template>
  <div id="checkSubCategory" class="metadata">
    <div class="check-sub">
      <el-select v-model="fatherId" placeholder="全部" @change="getcheckSubCategory(fatherId, 0)">
        <el-option label="全部" value="0">全部</el-option>
        <el-option v-for="item in fatherNameList" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
      <el-button @click="editCheckSubCategory" class="data-btn-add"><span class="data-plus">+</span> 新增检查子类目
      </el-button>
    </div>
    <el-dialog :title="title" :visible.sync="editData" @open="checkCategoryList">
      <el-form :model="dto" :rules="rules" ref="dto">
        <el-form-item label="所属大类" prop="inspectTypeId">
          <el-select v-model="dto.inspectTypeId" placeholder="请选择所属大类">
            <el-option v-for="item in fatherNameList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="dto.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="dto.alias" auto-complete="off" placeholder="多个别名用空格隔开"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="dto.type" placeholder="" @change="setShow(dto.type)">
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div class="arrange" v-show="isShow && (dto.type == '1' || isArrange)">
          <el-form-item label="上限值">
            <el-input class="upper" v-model.number="dto.toplimit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="lower" label="下限值">
            <el-input v-model.number="dto.lowerlimit" auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="参考值" v-show="isShow && (dto.type != '') && (dto.type == '0' || isReference)">
          <el-input v-model.number="dto.reference" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model.trim="dto.unit" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveCheckSubCategory('dto')">保存</el-button>
        <el-button @click="editData = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="data-table">
      <el-table stripe :data="checkSubCategorys">
        <el-table-column align="center" prop="id" label="序号" class="tableId">
        </el-table-column>
        <el-table-column class="dc-column" align="center" prop="inspectTypeName" label="所属类目"></el-table-column>
        <el-table-column class="dc-column" align="center" prop="name" label="项目名称"></el-table-column>
        <el-table-column class="dc-column" align="center" prop="alias" label="别名"></el-table-column>
        <el-table-column class="dc-column" align="center" label="类型">
          <template scope="scope">
            <span>{{scope.row.type == '0' ? '无' : '范围'}}</span>
          </template>
        </el-table-column>
        <el-table-column class="dc-column" align="center" prop="unit" label="单位"></el-table-column>
        <el-table-column align="center" label="编辑">
          <template scope="scope">
            <el-button class="data-btn" @click="editCheckSubCategory(scope.row)">编辑</el-button>
            <el-button class="data-btn" @click="setDeleteId(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>确定要删除么?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteCheckSubCategory(deleteId)">确 定</el-button>
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
    name: 'checkSubCategory',
    data () {
      var pattern = '^\\d\\d*$'
      var validName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入项目名称'))
        }
        setTimeout(() => {
          if (value.match(pattern)) {
            callback(new Error('项目名称不能为纯数字'))
          } else {
            callback()
          }
        }, 1000)
      }
      return {
        fatherId: '',
        title: '',
        isShow: false,
        isArrange: false,
        isReference: false,
        isDelete: false,
        deleteId: '',
        dto: {
          id: '',
          alias: '',
          inspectTypeId: '',
          lowerlimit: '',
          name: '',
          reference: '',
          toplimit: '',
          type: '',
          unit: ''
        },
        rules: {
          inspectTypeId: [{required: true, message: '请选择所属大类', trigger: 'change'}],
          name: [{required: true, validator: validName, trigger: 'blur'}],
          type: [{required: true, message: '请输入类型', trigger: 'change'}]
        },
        options: [{
          id: '0',
          label: '无'
        }, {
          id: '1',
          label: '范围'
        }],
        fatherNameList: [],
        checkSubCategorys: [],
        editData: false,
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
      this.checkCategoryList()
      this.getcheckSubCategory(0, 0)
    },
    methods: {
      checkCategoryList () {
        this.$http.get(`${this.$global.api}inspect/getInspectTypes?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              this.fatherNameList = []
            } else {
              content.forEach(obj => {
                obj.id = `${obj.id}`
              })
              this.fatherNameList = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getcheckSubCategory (inspectTypeId, page) {
        this.$http.get(`${this.$global.api}inspect/getInspectItemByParentId?inspectTypeId=${inspectTypeId}&page=${page}&size=20&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
            this.totalElements = res.data.data.totalElements
            let content = res.data.data.content
            if (content.length === 0) {
              this.checkSubCategorys = []
            } else {
              if (this.totalElements > 20) {
                this.isPage = true
              } else {
                this.isPage = false
              }
              content.forEach(obj => {
                obj.inspectTypeId = `${obj.inspectTypeId}`
                obj.type = `${obj.type}`
              })
              this.checkSubCategorys = content
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      editCheckSubCategory (res) {
        this.editData = true
        if (res.id > 0) {
          this.title = '编辑检查子类目'
          this.dto = res
          this.setShow(res.type)
        } else {
          this.title = '新增检查子类目'
          this.isShow = false
          this.isArrange = false
          this.isReference = false
          this.dto = {
            alias: '',
            inspectTypeId: '',
            lowerlimit: '',
            name: '',
            reference: '',
            toplimit: '',
            type: '',
            unit: ''
          }
        }
      },
      setShow (type) {
        this.isShow = true
        if (type === '范围' || type === '1') {
          this.isArrange = true
          this.isReference = false
        }
        if (type === '无' || type === '0') {
          this.isArrange = false
          this.isReference = true
        }
      },
      saveCheckSubCategory (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post(`${this.$global.api}inspect/saveInspectItem`, this.dto).then(res => {
              if (res.data && res.data.code === 0) {
                this.editData = false
                this.getcheckSubCategory(0, this.currentPage - 1)
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
      deleteCheckSubCategory (id) {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}inspect/deleteInspectItem?id=${id}`).then(res => {
          if (res.data && res.data.code === 0) {
            this.getcheckSubCategory(0, this.currentPage - 1)
          } else {
            this.isErrorMsg = true
            this.errorMsg = '删除失败！'
          }
        })
      },
      handleCurrentChange () {
        this.getcheckSubCategory(0, this.currentPage - 1)
      }
    }
  }
</script>
<style lang='scss'>
  @import './metadata';
</style>
