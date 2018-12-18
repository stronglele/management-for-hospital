<template>
  <div class="project">
    <div class="filtrate-result clear">
      <div class="block left filtrate-result-peoject">
        <h2 class="demonstration">项目选择</h2>
        <span>
          <el-cascader
            size="30"
            expand-trigger="click"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange($event)">
          </el-cascader>
        </span>
        <span v-if="Show">
           <el-cascader
            size="10"
            expand-trigger="click"
            :options="items"
            v-model="selectedOptions2"
            @change="handleChange2($event)">
          </el-cascader>
        </span>
        <span v-if="date">
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            @change="getDate"
            >
          </el-date-picker>
        </span>
        <span v-if="input" class="filtrate-result-input">
          <el-input v-model="input1" placeholder="请输入内容" size="5" @blur="blur"></el-input>
        </span>
        <span v-if="inputScope" class="filtrate-result-input-scope">
          <el-input v-model="input2" type="number" placeholder="数值" size="10"></el-input>
           ~ 
          <el-input v-model="input3" type="number" placeholder="数值" @blur="blurScope"></el-input>
        </span>
      </div>
      <div class="right block project-delete">
        <h2 class="demonstration">&nbsp</h2>
        <el-button @click="delProject()">删除</el-button>
      </div>
      <div v-if="relation" class="block right filtrate-result-relation">
        <h2 class="demonstration">所属关系</h2>
        <el-select v-model="value2" placeholder="请选择" size="10" @change="getRelations($event)">
          <el-option
            v-for="item in relations"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>
      </div>
      <el-dialog title="提示" :visible.sync="isDelete" size="tiny">
        <span>你确定要删除?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
          <el-button @click="isDelete = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {},
    index: ''
  },
  data () {
    return {
      items: [],
      relations: [{
        value: 'and',
        label: 'and'
      }, {
        value: 'not',
        label: 'not'
      }],
      selectedOptions: [],
      selectedOptions2: [],
      Show: false,
      date: false,
      input: false,
      inputScope: false,
      isDelete: false,
      data: {},
      input1: '',
      input2: '',
      input3: '',
      value: '',
      value2: 'and',
      value7: ''
    }
  },
  computed: {
    relation () {
      if (this.input === true || this.date === true || this.inputScope === true) {
        return false
      } else if (this.Show === true) {
        return true
      }
    }
  },
  methods: {
    handleChange (value) {
      let name = value[0]
      let itemName = value[1]
      if (value[2]) {
        let subItemName = value[2].split(',')[0]
        if (name === '化验指标') {
          this.getProject(3, name, itemName, subItemName)
        } else {
          this.getProject(3, '', itemName, subItemName)
        }
      } else {
        itemName = value[1].split(',')[0]
        this.getProject(2, name, itemName)
      }
    },
    handleChange2 (value) {
      let array = value[0].split('$')
      if (array[1] === 'INTERVAL_INPUT') {
        this.inputScope = true
        this.data = {row: array[2], index: this.index}
      }
      if (array[1] === 'INPUT') {
        this.input = true
        this.data = {row: array[2], index: this.index}
      }
      if (array[1] === 'OPTION') {
        this.relations[0].value = 'and,' + array[2]
        this.relations[1].value = 'not,' + array[2]
        this.$emit('increment', {value: array[0], row: array[2], index: this.index})
      }
    },
    delProject () {
      this.isDelete = true
    },
    // 删除项目
    confirmDelete () {
      this.$emit('deleteEmit', this.index, this.selectedOptions, this.selectedOptions2)
      this.isDelete = false
    },
    // 项目搜索
    getProject (floor, name, itemName, subItemName) {
      this.$http.get(`${this.$global.api}dynamicSearch/getKeywords?time=${new Date().getTime()}`, {params: {floor: floor, name: name, itemName: itemName, subItemName: subItemName}})
        .then(response => {
          let res = response.data
          if (res.code === 0) {
            let data = res.data
            if (data.inputType === 'INPUT') {
              this.data = {row: data.alias, index: this.index}
              this.input = true
              this.date = false
              this.inputScope = false
              this.Show = false
            }
            if (data.inputType === 'TIME_INPUT') {
              this.data = {row: data.alias, index: this.index}
              this.date = true
              this.Show = false
              this.input = false
              this.inputScope = false
            }
            if (data.inputType === 'INTERVAL_INPUT') {
              this.data = {row: data.alias, index: this.index, name: name}
              this.inputScope = true
              this.date = false
              this.Show = false
              this.input = false
            }
            if (data.inputType === 'OPTION') {
              if (data.subItems && data.subItems.length !== 0) {
                let subItems = data.subItems
                let items = []
                for (let i = 0; i < subItems.length; i++) {
                  items.push({value: subItems[i].name + '$' + subItems[i].inputType + '$' + subItems[i].alias, label: subItems[i].name})
                }
                this.items = items
                this.Show = true
              }
              if (data.subSubItems && data.subSubItems.length !== 0) {
                let subSubItems = data.subSubItems
                let items = []
                for (let i = 0; i < subSubItems.length; i++) {
                  items.push({value: subSubItems[i].name + '$' + subSubItems[i].inputType + '$' + subSubItems[i].alias, label: subSubItems[i].name})
                }
                this.items = items
                this.Show = true
              }
              this.input = false
              this.date = false
              this.inputScope = false
            }
          } else {
            console.log('未知错误')
          }
        }, response => {
          console.log(response)
        })
    },
    blurScope () {
      this.$emit('input', {minInput: this.input2, maxInput: this.input3, data: this.data, index: this.index})
    },
    blur () {
      this.$emit('input', {input: this.input1, data: this.data, index: this.index})
    },
    getDate (value) {
      let array = value.split(' - ')
      let time1 = Date.parse(new Date(array[0]))
      let time2 = Date.parse(new Date(array[1]))
      this.$emit('input', {minInput: time1, maxInput: time2, data: this.data, index: this.index})
    },
    getRelations (value) {
      console.log(this.selectedOptions2)
      this.$emit('relation', {value: value, index: this.index, data: this.selectedOptions2})
    }
  }
}
</script>