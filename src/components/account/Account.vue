<template>
  <div id="account">
    <div class="account">
      <el-select v-model="hospital" placeholder="请选择医院" @change="getHospital">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
          >
        </el-option>
      </el-select>
      <el-button class="table-button" @click="resetAll()">全部</el-button>
      <el-input placeholder="搜索账号名称" v-model="account">
        <el-button slot="append" @click="getAccount">查询</el-button>
      </el-input>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="table in tables"
            :key="table.value"
            :prop="table.key"
            :label="table.value"
            >
          </el-table-column>
          <el-table-column
            label="编辑"
            >
            <template scope="scope">
              <el-button type="text" size="large" @click="getEdit(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block page clear" v-if="getPage">
        <el-pagination
          :page-size="20"
          :current-page="currentpage"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :top="'30%'"
        :before-close="handleClose">
        <p>是否更改管理员权限</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">否</el-button>
          <el-button type="primary" @click="getValue()">是</el-button>
        </span>
      </el-dialog>
      <app-dialog :title="title" :message="message" :visible.sync="visible"></app-dialog>
    </div>
  </div>
</template>

<script>
  import AppDialog from '@/components/_libs/dialog'
  export default {
    name: 'account',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        options: [],
        tables: [{
          key: 'id',
          value: '编号'
        }, {
          key: 'name',
          value: '账号名称'
        }, {
          key: 'hospital',
          value: '所在医院'
        }, {
          key: 'authority',
          value: '是否为管理员'
        }],
        tableData: [],
        hospital: '',
        account: '',
        dialogVisible: false,
        id: '',
        error: '',
        total: 0,
        status: false,
        currentpage: 1,
        page: 0,
        title: '',
        message: '',
        visible: false
      }
    },
    created () {
      this.getAccountList(0)
      this.getHospitalName()
    },
    computed: {
      // 分页显示隐藏
      getPage () {
        if (this.tableData.length === 0) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      resetAll () {
        this.hospital = ''
        this.getAccountList(0)
      },
      getEdit ($event) {
        this.dialogVisible = true
        this.id = $event.row.id
      },
      // 请求数据渲染页面
      getAccountList (page, value) {
        let data = {hospital: this.hospital, page: page}
        if (value) {
          data.keywords = value
        }
        this.$http.get(`${this.$global.oApi}api/ruijin/getAccount?time=${new Date().getTime()}`, {params: data})
          .then(response => {
            let res = response.data
            if (res.code === 0 && res.data && res.data.content && res.data.content.lenght === 0) {
              console.log('啊哦～你要找的数据为空哦！')
            } else if (res.code === 0 && res.data && res.data.content) {
              this.total = res.data.totalElements
              this.getStatus(res.data.content)
              this.tableData = res.data.content
            } else {
              console.log('呀～发生未知错误，请关闭重试')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 查询所有医院
      getHospitalName () {
        this.$http.get(`${this.$global.oApi}api/ruijin/find/hospitalName?time=${new Date().getTime()}`)
          .then(response => {
            let res = response.data
            if (res.code === 0 && res.data && res.data.name.lenght === 0) {
              console.log('啊哦～你要找的数据为空哦！')
            } else if (res.code === 0 && res.data && res.data.name) {
//              console.log(res)
              this.options = res.data.name
            } else {
              console.log('呀～发生未知错误，请关闭重试')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 状态转换
      getStatus (value) {
        for (var i = 0; i < value.length; i++) {
          if (value[i].authority === 0) {
            value[i].authority = '是'
          } else if (value[i].authority === 1) {
            value[i].authority = '是'
          } else if (value[i].authority === 2) {
            value[i].authority = '否'
          }
        }
      },
      // 按医院搜索
      getHospital () {
        this.currentpage = 1
        this.getAccountList(0)
      },
      // 按账号名称搜索
      getAccount () {
        this.currentpage = 1
        this.getAccountList(0, this.account)
      },
      // 分页
      handleCurrentChange (val) {
        this.page = val - 1
        this.getAccountList(this.page)
      },
      // 关闭模态框
      handleClose (done) {
        done()
      },
      // 提交保存
      getValue () {
        this.dialogVisible = false
        this.$http.get(`${this.$global.oApi}api/ruijin/setAuthority?&time=${new Date().getTime()}`, {params: {id: this.id}})
          .then(res => {
//            console.log(res)
            if (res.data && res.data.code === 0) {
              this.dialogVisible = false
              this.getAccountList()
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器开小差了，请再试一次！'
            this.visible = true
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="scss">
  @import './Account';
</style>
