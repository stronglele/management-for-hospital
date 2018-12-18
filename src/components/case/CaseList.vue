<template>
  <div id="case-list">
    <div class="case-container">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="所有病历" name="first">
          <div class="tab-content">
            <div class="clear">
              <div class="tab-search" style="float: left">
                <el-input placeholder="搜索医院名称／患者姓名" icon="search" v-model="searchDataAll"
                          @click="handleSearchClickAll">
                </el-input>
                <el-button class="table-button" @click="resetAll()">全部</el-button>
              </div>
              <div class="tab-search">
                <span class="span">排序:</span>
                <el-select v-model="sortDate" @change="sortDateChange()">
                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="sortBy" @change="sortByChange()">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="tab-table clear">
              <el-table :data="tableDataAll" stripe style="width: 100%">
                <el-table-column label="报告生成时间" width="145" align="center">
                  <template scope="scope">
                    <span>{{scope.row.createdDate | datetime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入院时间" width="145" align="center">
                  <template scope="scope">
                    <span>{{scope.row.hospitalized | datetime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="出院时间" width="145" align="center">
                  <template scope="scope">
                    <span>{{scope.row.discharged | datetime}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="hospitalName" label="医院名称" width="auto" min-width="130"
                                 align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="telephone" label="手机号" width="118" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" width="auto" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="auto" align="center"></el-table-column>
                <el-table-column label="上传图片" width="auto" min-width="130" align="center">
                  <template scope="scope">
                    <div class="table-button__wrapper">
                      <el-button class="table-button" size="small" @click="handleImage(scope.row.id)">查看
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="auto" align="center">
                  <template scope="scope">
                    <span>{{scope.row.status === 0 ? '待录入' : '已生成'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                  <template scope="scope">
                    <div class="table-button__wrapper">
                      <el-button v-if="scope.row.status===1" class="table-button" size="small"
                                 @click="handleDetail(scope.row.id, scope.row.userId)">查看
                      </el-button>
                      <el-button v-if="scope.row.status===0" class="table-button" size="small"
                                 @click="handleEdit(scope.row.id, scope.row.userId)">去录入
                      </el-button>
                      <el-button class="table-button" size="small" @click="handleDelete(scope.row.id)">删除
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-page">
                <el-pagination @current-change="handleSearchClickAll" :current-page.sync="currentPageAll" :page-size="20" layout="prev, pager, next, jumper"
                  :total="totalElementsAll">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待录入病历" name="second">
          <div class="tab-content">
            <div class="clear">
              <div class="tab-search" style="float: left">
                <el-input placeholder="搜索医院名称／患者姓名" icon="search" v-model="searchData"
                          @click="handleSearchClick">
                </el-input>
                <el-button class="table-button" @click="reset()">全部</el-button>
              </div>
            </div>
            <div class="tab-table">
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="上传时间" width="145" align="center">
                  <template scope="scope">
                    <span>{{scope.row.createdDate | datetime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="上传图片" width="auto" min-width="130" align="center">
                  <template scope="scope">
                    <div class="table-button__wrapper">
                      <el-button class="table-button" size="small" @click="handleImage(scope.row.id)">查看
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="auto" align="center"></el-table-column>
                <el-table-column prop="telephone" label="手机号" width="118" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" width="auto" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="auto" align="center"></el-table-column>
                <el-table-column prop="hospitalName" label="医院名称" width="auto" min-width="130"
                                 align="center"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                  <template scope="scope">
                    <div class="table-button__wrapper">
                      <el-button class="table-button" size="small"
                                 @click="handleEdit(scope.row.id, scope.row.userId)">去录入
                      </el-button>
                      <el-button class="table-button" size="small" @click="handleDelete(scope.row.id)">删除
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-page">
                <el-pagination
                  @current-change="handleSearchClick" :current-page.sync="currentPage" :page-size="20" layout="prev, pager, next, jumper"
                  :total="totalElements">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
  import '@/components/_libs/filter'
  import AppDialog from '@/components/_libs/dialog'

  export default {
    name: 'case-list',
    components: {
      'app-dialog': AppDialog
    },
    data () {
      return {
        activeTab: 'first',
        options1: [{
          value: '0',
          label: '报告生成时间'
        }, {
          value: '2',
          label: '入院时间'
        }, {
          value: '1',
          label: '出院时间'
        }],
        options2: [{
          value: '0',
          label: '近到远'
        }, {
          value: '1',
          label: '远到近'
        }],
        sortDate: '',
        sortBy: '',
        searchDataAll: '',
        searchData: '',
        tableDataAll: [],
        tableData: [],
        currentPageAll: 1,
        totalElementsAll: 0,
        currentPage: 1,
        totalElements: 0,
        isPage: false,
        title: '',
        message: '',
        id: '',
        isDelete: false,
        visible: false
      }
    },
    created () {
      this.getDataListAll(0)
      this.getDataListWait(0)
    },
    methods: {
      resetAll () {
        this.searchDataAll = ''
        this.getDataListAll(0)
      },
      reset () {
        this.searchData = ''
        this.getDataListWait(0)
      },
      handleSearchClickAll () {
        this.getDataListAll(this.currentPageAll - 1)
      },
      handleSearchClick () {
        this.getDataListWait(this.currentPage - 1)
      },
      handleImage (id) {
        this.$router.push({name: 'CaseImage', params: {id: id}})
      },
      handleDetail (id, userId) {
        this.$router.push({name: 'CaseDetail', params: {id: id, userId: userId}})
      },
      handleEdit (id, userId) {
        this.$router.push({name: 'CaseEdit', params: {id: id, userId: userId}})
      },
      handleDelete (id) {
        this.isDelete = true
        this.id = id
      },
      confirmDelete () {
        this.isDelete = false
        this.$http.delete(`${this.$global.api}illness/deleteIllness?id=${this.id}`)
          .then(res => {
            if (res.data.code === 0) {
              this.title = '提示信息'
              this.message = '删除成功！'
              this.visible = true
              this.getDataListAll(this.currentPageAll - 1)
              this.getDataListWait(this.currentPage - 1)
            }
          }, err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器出小差了，请重试！'
            this.visible = true
            console.log(err)
          })
      },
      getDataListAll (page) {
        let query = {status: 1, level: encodeURI(this.token.parameter5), page: page, size: 20}
        // 管理员
        if (this.token.parameter5 === 'mPBKDswiCyj3ZQbUCSd15Q==') {
          query.hospital = this.token['parameter4']
        }
        // 普通用户
        if (this.token.parameter5 === 'wIBCPhet3fTLaxozZ92wwA==') {
          query.userIds = this.token['parameter6']
        }
        if (this.sortDate) {
          query.sortDate = this.sortDate
        }
        if (this.sortBy) {
          query.sortBy = this.sortBy
        }
        if (this.searchDataAll) {
          query.keywords = this.searchDataAll
        }
        this.$http.post(`${this.$global.api}illness/getIllness?time=${new Date().getTime()}`, query)
          .then(res => {
            if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
              let content = res.data.data.content
              this.totalElementsAll = res.data.data.totalElements
              if (content.length === 0) {
                console.log('数据为空')
                this.tableDataAll = content
              } else {
                this.tableDataAll = content
              }
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器开小差了，请稍后刷新重试！'
            this.visible = true
            console.log(err)
          })
      },
      getCryptoJS (value) {
        var decrypted = this.$CryptoJS.AES.decrypt(value, this.$key, {iv: this.$iv, padding: this.$CryptoJS.pad.ZeroPadding})
        return decrypted.toString(this.$CryptoJS.enc.Utf8)
      },
      getDataListWait (page) {
        let query = {status: 0, level: encodeURI(this.token.parameter5), page: page, size: 20}
        // 管理员
        if (this.token.parameter5 === 'mPBKDswiCyj3ZQbUCSd15Q==') {
          query.hospital = this.token['parameter4']
        }
        // 普通用户
        if (this.token.parameter5 === 'wIBCPhet3fTLaxozZ92wwA==') {
          query.userIds = this.token['parameter6']
        }
        if (this.sortDate) {
          query.sortDate = this.sortDate
        }
        if (this.sortBy) {
          query.sortBy = this.sortBy
        }
        if (this.searchDataAll) {
          query.keywords = this.searchDataAll
        }
        this.$http.post(`${this.$global.api}illness/getIllness?time=${new Date().getTime()}`, query)
          .then(res => {
            if (res.data && res.data.code === 0 && res.data.data && res.data.data.content) {
              let content = res.data.data.content
              this.totalElements = res.data.data.totalElements
              if (content.length === 0) {
                console.log('数据为空')
              } else {
                this.tableData = content
              }
            }
          })
          .catch(err => {
            this.title = '错误信息'
            this.message = '啊哦～服务器开小差了，请稍后刷新重试！'
            this.visible = true
            console.log(err)
          })
      },
      sortDateChange () {
        this.getDataListAll(0)
//        console.log(this.sortDate)
      },
      sortByChange () {
        this.getDataListAll(0)
//        console.log(this.sortBy)
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
  @import './case';
</style>
