<template>
  <div id="filtrate-result">
    <div class="filtrate-content">
      <div class="filtrate-header clear">
         <h3 class="filtrate-header-data"><i>1</i>数据选择</h3>
        <p></p>
        <h3 class="filtrate-header-data"><i>2</i>筛选结果</h3>
      </div>
      <div class="filtrate-title">
        <h1>
          项目筛选
        </h1>
      </div>
      <div class="project-filtrate">
        <div v-for="(project, index) in projects" :key="index" :id="index" v-if="show[index]">
          <Project :options="options" :index="index" @increment="parentLisen" @deleteEmit="deleteEmit" @input="input" @relation="relation"></Project>
        </div>
        <div class="add-button">
          <el-button @click="addProject"><span class="add-button-plus"> + </span>增加一个项目</el-button>
        </div>
        <div class="filtrate-result-button">
          <el-button type="primary" @click="getValue">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </div>
    <div class="filtrate-content filter">
      <div class="filtrate-title">
        <h1>
          筛选结果
        </h1>
      </div>
      <div class="filtrate-table">
        <div class="filter-table-button clear">
          <el-button @click="exportData">导出数据</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="table in tables"
            :key="table.value"
            :prop="table.key"
            :label="table.value"
            min-width="150"
            >
          </el-table-column>
        </el-table>
        <div class="block page clear" v-if="ifPage">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/components/_libs/filter'
  import Project from './project-components.vue'
  import moment from 'moment'
  export default {
    name: 'filtrate-result',
    data () {
      return {
        options: [],
        tableData: [],
        projects: [{
          options: []
        }],
        tables: [],
        data: {
          filters: [],
          list: [],
          rows: '',
          labs: '',
          hospital: '',
          userIds: ''
        },
        select: [],
        list: [],
        currentPage: 1,
        id: 0,
        total: 0,
        ifPage: true,
        page: 0,
        show: [true],
        value1: {},
        value2: {},
        hospital: '',
        userIds: []
      }
    },
    created () {
      this.getData()
      this.getStatus()
    },
    methods: {
      // 获取数据渲染页面
      getData () {
        if (this.$route.params.options && this.$route.params.data && this.$route.params.value) {
          let options = this.$route.params.options
          let title = this.$route.params.data
          this.total = title.totalElements
          this.tableData = this.$route.params.data.content
          this.data.rows = this.$route.params.value.rows
          this.data.labs = this.$route.params.value.labs
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].手术时间) {
              this.tableData[i].手术时间 = this.getTime(this.tableData[i].手术时间)
            }
            this.tableData[i].序号 = i + 1
          }
          for (let key in options) {
            this.options.push(options[key])
          }
          for (let key in title.content[0]) {
            this.tables.push({value: key, key: key})
          }
        } else {
          this.$router.push({name: 'Filtrate'})
        }
      },
      // 增加项目
      addProject () {
        this.id++
        let options = this.options
        this.projects.push({options})
        this.$set(this.show, this.id, true)
      },
      // 接收子组件下拉框传过来的数据
      parentLisen (value) {
        if (this.select[value.index] && this.select[value.index].relation) {
          this.select[value.index].row = value.row
          this.select[value.index].value = "'" + value.value + "'"
        } else {
          this.select[value.index] = {
            relation: '=',
            row: value.row,
            value: "'" + value.value + "'"
          }
        }
      },
      // 接收子组件input框传过来的数据
      input (value) {
        if (value.data.name && value.data.name === '化验指标') {
          this.list[value.index] = [{
            relation: '>=',
            row: value.data.row,
            value: "'" + value.minInput + "'"
          }, {
            relation: '<=',
            row: value.data.row,
            value: "'" + value.maxInput + "'"
          }]
        } else {
          this.select[value.index] = [{
            relation: '>=',
            row: value.data.row,
            value: "'" + value.minInput + "'"
          }, {
            relation: '<=',
            row: value.data.row,
            value: "'" + value.maxInput + "'"
          }]
        }
      },
      // 接收子组件所属关系传过来的数据
      relation (value) {
        let relation = value.value.split(',')
        let name = value.data[0].split('$')
        if (this.select.length !== 0) {
          if (relation[0] === 'and') {
            for (let i = 0; i < this.select.length; i++) {
              if (this.select[i] && this.select[i].row && this.select[i].row === relation[1] && this.select[i].value === `'${name[0]}'`) {
                this.select[i].relation = '='
              }
            }
          } else {
            for (let i = 0; i < this.select.length; i++) {
              if (this.select[i] && this.select[i].row && this.select[i].row === relation[1] && this.select[i].value === `'${name[0]}'`) {
                this.select[i].relation = '!='
              }
            }
          }
        }
      },
      // 删除一个项目
      deleteEmit (index, value, value1) {
        if (index < this.projects.length) {
          this.$set(this.show, index, false)
        }
        if (value1.length !== 0) {
          let array = value1[0].split('$')
          for (let i = 0; i < this.select.length; i++) {
            if (this.select[i] && this.select[i].row === array[2] && this.select[i].value === array[0]) {
              this.select.splice(i, 1)
            } else if (this.select[i] && this.select[i][0] && this.select[i][0].row === array[2]) {
              this.select.splice(i, 1)
            } else if (this.select[i] && this.select[i].row === array[2] && this.select[i].value === `'${array[0]}'`) {
              this.select.splice(i, 1)
            }
          }
        } else {
          if (value[0] && value[0] === '化验指标') {
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i] && this.list[i][0] && this.list[i][0].row === value[2]) {
                this.list.splice(i, 1)
              }
            }
          } else {
            let name
            if (value[2]) {
              name = value[2].split(',')[1].split(' as')[0]
            } else if (value[1]) {
              name = value[1].split(',')[1].split(' as')[0]
            }
            for (let i = 0; i < this.select.length; i++) {
              if (this.select[i] && this.select[i][0] && this.select[i][0].row === name) {
                this.select.splice(i, 1)
              }
            }
          }
        }
      },
      // 确定筛选结果
      getValue () {
        let select = []
        let list = []
        for (let i = 0; i < this.select.length; i++) {
          if (this.select[i]) {
            if (this.select[i].relation) {
              select.push(this.select[i])
            } else {
              select.push(this.select[i][0])
              select.push(this.select[i][1])
            }
          }
        }
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i]) {
            list.push(this.list[i][0])
            list.push(this.list[i][1])
          }
        }
        this.data.filters = select
        this.data.list = list
        this.$http.post(`${this.$global.api}dynamicSearch/findDynamicData?size=20&page=${this.page}`, this.data, { 'headers': { 'Content-Type': 'application/json; charset=utf-8' } })
          .then(res => {
            let data = res.data
            if (data.code === 0 && data.data.content.length !== 0) {
              for (let i = 0; i < data.data.content.length; i++) {
                data.data.content[i].序号 = i + 1
              }
              this.tableData = data.data.content
              this.total = data.data.totalElements
            }
            if (data.code === 0 && data.data.content.length === 0) {
              this.tableData = data.data.content
              this.ifPage = false
            }
          }, err => {
            console.log(err)
          })
      },
      // 导出数据
      exportData () {
        this.$http.post(`${this.$global.api}/dynamicSearch/getExcel`, this.data, { 'headers': { 'Content-Type': 'application/json; charset=utf-8' } })
          .then(res => {
            let data = res.data
            if (data.code === 0 && data.data) {
              window.location.href = data.data
            }
          }, err => {
            console.log(err)
          })
      },
      // 分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      // 获取vuex存储的数据
      getStatus () {
        let data = this.$store.state.token
        if (data && data.parameter5 === 'mPBKDswiCyj3ZQbUCSd15Q==') {
          this.data.hospital = data.parameter4
        } else if (data && data.parameter5 === 'wIBCPhet3fTLaxozZ92wwA==') {
          this.data.userIds = data.parameter6
        }
      },
      // 时间状态转换
      getTime (date) {
        return moment(new Date(date)).format('YYYY-MM-DD')
      }
    },
    components: {
      Project
    }
  }
</script>
<style lang="scss">
  @import './FiltrateResult';
</style>
