<template>
  <div id="filtrate">
    <div class="filtrate-content">
      <div class="filtrate-header clear">
        <h3 class="filtrate-header-data"><i>1</i>数据选择</h3>
        <p></p>
        <h3 class="filtrate-header-result"><i>2</i>筛选结果</h3>
      </div>
      <div class="filtrate-title">
        <h1>标签筛选</h1>
      </div>
      <div class="filtrate">
        <div class="filtrate-list clear">
          <tr>
            <td class="filtrate-list-left" valign="top">
                基本资料
            </td>
            <td>
              <div class="filtrate-list-name clear">
              <tr>
                <td valign="top" class="all">
                  <el-checkbox-button :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全部</el-checkbox-button>
                </td>
                <td>
                  <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
                    <el-checkbox-button v-for="city in basic" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </td>
              </tr>   
              </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                入院诊断
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <tr>
                  <td valign="top" class="all">
                    <el-checkbox-button :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全部</el-checkbox-button>
                  </td>
                  <td>
                    <el-checkbox-group class="clear" v-model="checkedCities2" @change="handleCheckedCitiesChange2">
                      <el-checkbox-button v-for="city in admittingDiagnosis" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </td>
                </tr> 
                </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                出院诊断
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <tr>
                  <td valign="top" class="all">
                    <el-checkbox-button :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">全部</el-checkbox-button>
                  </td>
                  <td>
                    <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
                      <el-checkbox-button v-for="city in data" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </td>
                </tr>  
              </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                入院简史
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <tr>
                  <td valign="top" class="all">
                    <el-checkbox-button :indeterminate="isIndeterminate4" v-model="checkAll4" @change="handleCheckAllChange4">全部</el-checkbox-button>
                  </td>
                  <td>
                    <el-checkbox-group v-model="checkedCities4" @change="handleCheckedCitiesChange4">
                      <el-checkbox-button v-for="city in notice" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </td>
                </tr>
              </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                手术记录
            </td>
            <td>
              <div class="filtrate-list-name clear">
                  <div class="clear">
                    <tr>
                      <td class="all">
                        <el-checkbox-button :indeterminate="isIndeterminate5" v-model="checkAll5" @change="handleCheckAllChange5">全部</el-checkbox-button>
                      </td>
                      <td>
                        <el-checkbox-group v-model="checkedCities5" @change="handleCheckedCitiesChange5">
                          <el-checkbox-button v-for="city in navigation" :label="city" :key="city">{{city}}</el-checkbox-button>
                        </el-checkbox-group>
                      </td>
                    </tr>
                  </div>
                  <div class="operation-note clear">
                    <div class="operation-note-left all">
                      <span>左冠造影</span>
                      <el-checkbox-button :indeterminate="isIndeterminate6" v-model="checkAll6" @change="handleCheckAllChange6">全部</el-checkbox-button>
                    </div>
                    <el-checkbox-group v-model="checkedCities6" @change="handleCheckedCitiesChange6">
                      <el-checkbox-button v-for="city in zuoguan" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                  <div class="operation-note clear">
                    <div class="operation-note-left all">
                      <span>右冠造影</span>
                      <el-checkbox-button :indeterminate="isIndeterminate7" v-model="checkAll7" @change="handleCheckAllChange7">全部</el-checkbox-button>
                    </div>
                    <el-checkbox-group v-model="checkedCities7" @change="handleCheckedCitiesChange7">
                      <el-checkbox-button v-for="city in youguan" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                  <div class="operation-note clear">
                    <div class="operation-note-left all">
                      <span>桥血管评估</span>
                      <el-checkbox-button :indeterminate="isIndeterminate16" v-model="checkAll16" @change="handleCheckAllChange16">全部</el-checkbox-button>
                    </div>
                    <el-checkbox-group v-model="checkedCities16" @change="handleCheckedCitiesChange16">
                      <el-checkbox-button v-for="city in qiaoxueguan" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                </div>
            </td>
          </tr>
          <tr v-if="assay">
            <td class="filtrate-list-left" valign="top">
                化验指标
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <div class="clear all">
                  <el-checkbox-button :indeterminate="isIndeterminate8" v-model="checkAll8" @change="handleCheckAllChange8">全部</el-checkbox-button>
                </div>
                <div class="operation-note clear" v-for="(entity, index) in abc">
                  <div class="operation-note-left all">
                    <span>{{entity.name}}</span>
                    <label class="el-checkbox-button">
                      <span class="el-checkbox-button__inner" @click.stop="handleTitAll(index, entity.name)">全部</span>
                    </label>
                  </div>
                  <div class="el-checkbox-group">
                    <label class="el-checkbox-button" v-for="(list, listIndex) in entity.subItems"><span class="el-checkbox-button__inner"  @click="childHandle(listIndex, index, entity.name, list.name)" :class="{'checked':childState[index][listIndex]}">{{list.name}}</span></label>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                围手术事件评估
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <tr>
                  <td valign="top" class="all">
                    <el-checkbox-button :indeterminate="isIndeterminate17" v-model="checkAll17" @change="handleCheckAllChange17">全部</el-checkbox-button>
                  </td>
                  <td>
                    <el-checkbox-group class="clear" v-model="checkedCities17" @change="handleCheckedCitiesChange17">
                      <el-checkbox-button v-for="city in weishoushu" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </td>
                </tr> 
              </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                出院转归
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <tr>
                  <td class="all">
                    <el-checkbox-button :indeterminate="isIndeterminate18" v-model="checkAll18" @change="handleCheckAllChange18">全部</el-checkbox-button>
                  </td>
                  <td>
                    <el-checkbox-group class="clear" v-model="checkedCities18" @change="handleCheckedCitiesChange18">
                      <el-checkbox-button v-for="city in chuyuanzhuangui" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </td>
                </tr>
              </div>
            </td>
          </tr>
          <tr>
            <td class="filtrate-list-left" valign="top">
                出院带药
            </td>
            <td>
              <div class="filtrate-list-name clear">
                <tr>
                  <td class="all">
                    <el-checkbox-button :indeterminate="isIndeterminate19" v-model="checkAll19" @change="handleCheckAllChange19">全部</el-checkbox-button>
                  </td>
                  <td>
                    <el-checkbox-group class="clear" v-model="checkedCities19" @change="handleCheckedCitiesChange19">
                      <el-checkbox-button v-for="city in chuyuandaiyao" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                  </td>
                </tr>
              </div>
            </td>
          </tr>
        </div>
      </div>
      <div class="filtrate-button">
        <el-button type="primary" @click="getValue">保存</el-button>
        <el-button @click="getCancel">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filtrate',
    data () {
      return {
        basic: [],
        checkAll1: false,
        checkedCities1: [],
        key1: {},
        isIndeterminate1: true,
        admittingDiagnosis: [],
        checkAll2: false,
        checkedCities2: [],
        key2: {},
        isIndeterminate2: false,
        data: [],
        checkAll3: false,
        checkedCities3: [],
        key3: {},
        isIndeterminate3: true,
        notice: [],
        checkAll4: false,
        checkedCities4: [],
        key4: {},
        isIndeterminate4: true,
        navigation: [],
        checkAll5: false,
        checkedCities5: [],
        key5: {},
        isIndeterminate5: true,
        zuoguan: [],
        checkAll6: false,
        checkedCities6: [],
        key6: {},
        isIndeterminate6: true,
        youguan: [],
        checkAll7: false,
        checkedCities7: [],
        key7: {},
        isIndeterminate7: true,
        checkAll8: false,
        isIndeterminate8: [],
        childState: [],
        allState: [],
        allData: {},
        dataaa: [],
        items: {},
        listLen: 0,
        isIndeterminate15: true,
        qiaoxueguan: [],
        checkAll16: false,
        checkedCities16: [],
        key16: {},
        isIndeterminate16: true,
        weishoushu: [],
        checkAll17: false,
        checkedCities17: [],
        key17: {},
        isIndeterminate17: true,
        chuyuanzhuangui: [],
        checkAll18: false,
        checkedCities18: [],
        key18: {},
        isIndeterminate18: true,
        chuyuandaiyao: [],
        checkAll19: false,
        checkedCities19: [],
        key19: {},
        isIndeterminate19: true,
        value: {},
        key: {},
        labs: [],
        datas: {},
        options: {},
        huayanzhibiao: [],
        assay: false,
        array: [],
        hospital: '',
        userIds: '',
        abc: []
      }
    },
    created () {
      this.getFiltrate()
      this.getStatus()
    },
    mounted () {
    },
    methods: {
      handleCheckAllChange1 (event) {
        this.checkedCities1 = event.target.checked ? this.basic : []
        this.isIndeterminate1 = false
      },
      handleCheckedCitiesChange1 (value) {
        let checkedCount = value.length
        this.checkAll1 = checkedCount === this.basic.length
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.basic.length
      },
      handleCheckAllChange2 (event) {
        this.checkedCities2 = event.target.checked ? this.admittingDiagnosis : []
        this.isIndeterminate2 = false
      },
      handleCheckedCitiesChange2 (value) {
        let checkedCount = value.length
        this.checkAll2 = checkedCount === this.admittingDiagnosis.length
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.admittingDiagnosis.length
      },
      handleCheckAllChange3 (event) {
        this.checkedCities3 = event.target.checked ? this.data : []
        this.isIndeterminate3 = false
      },
      handleCheckedCitiesChange3 (value) {
        let checkedCount = value.length
        this.checkAll3 = checkedCount === this.data.length
        this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.data.length
      },
      handleCheckAllChange4 (event) {
        this.checkedCities4 = event.target.checked ? this.notice : []
        this.isIndeterminate4 = false
      },
      handleCheckedCitiesChange4 (value) {
        let checkedCount = value.length
        this.checkAll4 = checkedCount === this.notice.length
        this.isIndeterminate4 = checkedCount > 0 && checkedCount < this.notice.length
      },
      handleCheckAllChange5 (event) {
        this.handleCheckAllChange6(event)
        this.handleCheckAllChange7(event)
        this.handleCheckAllChange16(event)
        this.checkedCities5 = event.target.checked ? this.navigation : []
        this.isIndeterminate5 = false
      },
      handleCheckedCitiesChange5 (value) {
        let checkedCount = value.length
        this.checkAll5 = checkedCount === this.navigation.length
        this.isIndeterminate5 = checkedCount > 0 && checkedCount < this.navigation.length
      },
      handleCheckAllChange6 (event) {
        this.checkedCities6 = event.target.checked ? this.zuoguan : []
        this.isIndeterminate6 = false
      },
      handleCheckedCitiesChange6 (value) {
        let checkedCount = value.length
        this.checkAll6 = checkedCount === this.zuoguan.length
        this.isIndeterminate6 = checkedCount > 0 && checkedCount < this.zuoguan.length
      },
      handleCheckAllChange7 (event) {
        this.checkedCities7 = event.target.checked ? this.youguan : []
        this.isIndeterminate7 = false
      },
      handleCheckedCitiesChange7 (value) {
        let checkedCount = value.length
        this.checkAll7 = checkedCount === this.youguan.length
        this.isIndeterminate7 = checkedCount > 0 && checkedCount < this.youguan.length
      },
      handleCheckAllChange16 (event) {
        this.checkedCities16 = event.target.checked ? this.qiaoxueguan : []
        this.isIndeterminate16 = false
      },
      handleCheckedCitiesChange16 (value) {
        let checkedCount = value.length
        this.checkAll16 = checkedCount === this.qiaoxueguan.length
        this.isIndeterminate16 = checkedCount > 0 && checkedCount < this.qiaoxueguan.length
      },
      handleCheckAllChange17 (event) {
        this.checkedCities17 = event.target.checked ? this.weishoushu : []
        this.isIndeterminate17 = false
      },
      handleCheckedCitiesChange17 (value) {
        let checkedCount = value.length
        this.checkAll17 = checkedCount === this.weishoushu.length
        this.isIndeterminate17 = checkedCount > 0 && checkedCount < this.weishoushu.length
      },
      handleCheckAllChange18 (event) {
        this.checkedCities18 = event.target.checked ? this.chuyuanzhuangui : []
        this.isIndeterminate18 = false
      },
      handleCheckedCitiesChange18 (value) {
        let checkedCount = value.length
        this.checkAll18 = checkedCount === this.chuyuanzhuangui.length
        this.isIndeterminate18 = checkedCount > 0 && checkedCount < this.chuyuanzhuangui.length
      },
      handleCheckAllChange19 (event) {
        this.checkedCities19 = event.target.checked ? this.chuyuandaiyao : []
        this.isIndeterminate19 = false
      },
      handleCheckedCitiesChange19 (value) {
        let checkedCount = value.length
        this.checkAll19 = checkedCount === this.chuyuandaiyao.length
        this.isIndeterminate19 = checkedCount > 0 && checkedCount < this.chuyuandaiyao.length
      },
      // 请求数据渲染页面
      getFiltrate () {
        this.$http.get(`${this.$global.api}dynamicSearch/get?time=${new Date().getTime()}`)
          .then(response => {
            let res = response.data
            if (res.code === 0 && res.data.length === 0) {
              console.log('数据为空')
            } else if (res.code === 0 && res.data.length !== 0) {
              this.basic = this.getPush(res.data[0].items)
              this.key1 = this.getKey(res.data[0].items)
              this.admittingDiagnosis = this.getPush(res.data[1].items)
              this.key2 = this.getKey(res.data[1].items)
              this.data = this.getPush(res.data[2].items)
              this.key3 = this.getKey(res.data[2].items)
              this.notice = this.getPush(res.data[3].items)
              this.key4 = this.getKey(res.data[3].items)
              this.weishoushu = this.getPush(res.data[6].items)
              this.key17 = this.getKey(res.data[6].items)
              this.chuyuanzhuangui = this.getPush(res.data[7].items)
              this.key18 = this.getKey(res.data[7].items)
              this.chuyuandaiyao = this.getPush(res.data[8].items)
              this.key19 = this.getKey(res.data[8].items)
              this.getOperation(res.data[4].items)
              this.getLaboratorial(res.data[5].items)
              this.abc = res.data[5].items
            } else {
              console.log('未知错误')
            }
          }, response => {
            console.log(response)
          })
      },
      // 提交保存数据
      getValue () {
        var value = []
        var labs = []
        var data = [...this.checkedCities5, ...this.checkedCities6, ...this.checkedCities7, ...this.checkedCities16]
        if (this.checkedCities1.length !== 0) {
          let basic = {
            value: '基本资料',
            label: '基本资料',
            children: []
          }
          for (let i = 0; i < this.checkedCities1.length; i++) {
            value.push(this.key1[this.checkedCities1[i]])
            basic.children.push({
              label: this.checkedCities1[i],
              value: this.checkedCities1[i] + ',' + this.key1[this.checkedCities1[i]]
            })
          }
          this.options.basic = basic
        }
        if (this.checkedCities2.length !== 0) {
          let ruyuanzhenduan = {
            value: '入院诊断',
            label: '入院诊断',
            children: []
          }
          for (let i = 0; i < this.checkedCities2.length; i++) {
            value.push(this.key2[this.checkedCities2[i]])
            ruyuanzhenduan.children.push({
              label: this.checkedCities2[i],
              value: this.checkedCities2[i] + ',' + this.key2[this.checkedCities2[i]]
            })
          }
          this.options.ruyuanzhenduan = ruyuanzhenduan
        }
        if (this.checkedCities3.length !== 0) {
          let chuyuanzhenduan = {
            value: '出院诊断',
            label: '出院诊断',
            children: []
          }
          for (let i = 0; i < this.checkedCities3.length; i++) {
            value.push(this.key3[this.checkedCities3[i]])
            chuyuanzhenduan.children.push({
              label: this.checkedCities3[i],
              value: this.checkedCities3[i] + ',' + this.key3[this.checkedCities3[i]]
            })
          }
          this.options.chuyuanzhenduan = chuyuanzhenduan
        }
        if (this.checkedCities4.length !== 0) {
          let ruyuanjianshi = {
            value: '入院简史',
            label: '入院简史',
            children: []
          }
          for (let i = 0; i < this.checkedCities4.length; i++) {
            value.push(this.key4[this.checkedCities4[i]])
            ruyuanjianshi.children.push({
              label: this.checkedCities4[i],
              value: this.checkedCities4[i] + ',' + this.key4[this.checkedCities4[i]]
            })
          }
          this.options.ruyuanjianshi = ruyuanjianshi
        }
        if (this.checkedCities5.length !== 0) {
          let shoushushijian = {
            value: this.checkedCities5[0] + ',' + this.value[this.checkedCities5[0]],
            label: this.checkedCities5[0]
          }
          this.options.shoushujilu = {
            value: '手术记录',
            label: '手术记录',
            children: []
          }
          this.options.shoushushijian = shoushushijian
        }
        if (this.checkedCities6.length !== 0) {
          let zuoguan = {
            value: '左冠造影',
            label: '左冠造影',
            children: []
          }
          for (let i = 0; i < this.checkedCities6.length; i++) {
            zuoguan.children.push({
              label: this.checkedCities6[i],
              value: this.checkedCities6[i] + ',' + this.value[this.checkedCities6[i]]
            })
          }
          this.options.shoushujilu = {
            value: '手术记录',
            label: '手术记录',
            children: []
          }
          this.options.zuoguan = zuoguan
        }
        if (this.checkedCities7.length !== 0) {
          let youguan = {
            value: '右冠造影',
            label: '右冠造影',
            children: []
          }
          for (let i = 0; i < this.checkedCities7.length; i++) {
            youguan.children.push({
              label: this.checkedCities7[i],
              value: this.checkedCities7[i] + ',' + this.value[this.checkedCities7[i]]
            })
          }
          this.options.shoushujilu = {
            value: '手术记录',
            label: '手术记录',
            children: []
          }
          this.options.youguan = youguan
        }
        if (this.checkedCities16.length !== 0) {
          let qiaoxueguan = {
            value: '桥血管评估',
            label: '桥血管评估',
            children: []
          }
          for (let i = 0; i < this.checkedCities16.length; i++) {
            qiaoxueguan.children.push({
              label: this.checkedCities16[i],
              value: this.checkedCities16[i] + ',' + this.value[this.checkedCities16[i]]
            })
          }
          this.options.shoushujilu = {
            value: '手术记录',
            label: '手术记录',
            children: []
          }
          this.options.qiaoxueguan = qiaoxueguan
        }
        if (this.checkedCities17.length !== 0) {
          let weishoushu = {
            value: '围手术事件评估',
            label: '围手术事件评估',
            children: []
          }
          for (let i = 0; i < this.checkedCities17.length; i++) {
            value.push(this.key17[this.checkedCities17[i]])
            weishoushu.children.push({
              label: this.checkedCities17[i],
              value: this.checkedCities17[i] + ',' + this.key17[this.checkedCities17[i]]
            })
          }
          this.options.weishoushu = weishoushu
        }
        if (this.checkedCities18.length !== 0) {
          let chuyuanzhuangui = {
            value: '出院转归',
            label: '出院转归',
            children: []
          }
          for (let i = 0; i < this.checkedCities18.length; i++) {
            value.push(this.key18[this.checkedCities18[i]])
            chuyuanzhuangui.children.push({
              label: this.checkedCities18[i],
              value: this.checkedCities18[i] + ',' + this.key18[this.checkedCities18[i]]
            })
          }
          this.options.chuyuanzhuangui = chuyuanzhuangui
        }
        if (this.checkedCities19.length !== 0) {
          let chuyuandaiyao = {
            value: '出院带药',
            label: '出院带药',
            children: []
          }
          for (let i = 0; i < this.checkedCities19.length; i++) {
            value.push(this.key19[this.checkedCities19[i]])
            chuyuandaiyao.children.push({
              label: this.checkedCities19[i],
              value: this.checkedCities19[i] + ',' + this.key19[this.checkedCities19[i]]
            })
          }
          this.options.chuyuandaiyao = chuyuandaiyao
        }
        var options = this.options
        if (data.length !== 0) {
          let val = this.value
          for (var i = 0; i < data.length; i++) {
            value.push(val[data[i]])
          }
          // 创建json对象
          if (options.zuoguan) {
            options.shoushujilu.children.push(options.zuoguan)
            delete options.zuoguan
          }
          if (options.youguan) {
            options.shoushujilu.children.push(options.youguan)
            delete options.youguan
          }
          if (options.qiaoxueguan) {
            options.shoushujilu.children.push(options.qiaoxueguan)
            delete options.qiaoxueguan
          }
          if (options.shoushushijian) {
            options.shoushujilu.children.push(options.shoushushijian)
            delete options.shoushushijian
          }
        }
        if (Object.keys(this.items).length !== 0) {
          this.options.huayanzhibiao = {
            label: '化验指标',
            value: '化验指标',
            children: []
          }
          // 循环参数
          for (let key in this.items) {
            labs.push(this.items[key])
          }
          let huayanzhibiao = this.options.huayanzhibiao
          for (let i = 0; i < this.huayanzhibiao.length; i++) {
            huayanzhibiao.children.push({label: this.huayanzhibiao[i].name, value: this.huayanzhibiao[i].name, children: []})
            for (let j = 0; j < this.huayanzhibiao[i].subItems.length; j++) {
              if (this.items[this.huayanzhibiao[i].name + j]) {
                huayanzhibiao.children[i].children.push({label: this.huayanzhibiao[i].subItems[j].name, value: this.huayanzhibiao[i].subItems[j].name})
              }
            }
          }
          for (let i = 0; i < huayanzhibiao.children.length; i++) {
            if (huayanzhibiao.children[i].children.length === 0) {
              huayanzhibiao.children.splice(i, 1)
              i = i - 1
            }
          }
        }
        if (value.length !== 0 || labs.length !== 0) {
          value = value.join(',')
          let datas = {labs: labs, rows: value, hospital: this.hospital, userIds: this.userIds}
          this.$http.post(`${this.$global.api}dynamicSearch/findDynamicData`, datas, { 'headers': { 'Content-Type': 'application/json; charset=utf-8' } })
          .then(res => {
            let data = res.data
            if (data.code === 0 && data.data.content.length !== 0) {
              this.$router.push({name: 'FiltrateResult', params: {options: this.options, data: data.data, value: datas}})
            }
          }, err => {
            console.log(err)
          })
        }
      },
      // 状态读取
      getStatus () {
        let data = this.$store.state.token
        if (data && data.parameter5 === 'mPBKDswiCyj3ZQbUCSd15Q==') {
          this.hospital = data.parameter4
        } else if (data && data.parameter5 === 'wIBCPhet3fTLaxozZ92wwA==') {
          this.userIds = data.parameter6
        }
      },
      // 重置
      getCancel () {
        this.getLength(this.huayanzhibiao)
        this.items = {}
        this.allState = []
        this.checkedCities1 = []
        this.checkedCities2 = []
        this.checkedCities3 = []
        this.checkedCities4 = []
        this.checkedCities5 = []
        this.checkedCities6 = []
        this.checkedCities7 = []
        this.checkedCities16 = []
        this.checkedCities17 = []
        this.checkedCities18 = []
        this.checkedCities19 = []
      },
      getPush (data) {
        let array = []
        for (let i = 0; i < data.length; i++) {
          array.push(data[i].name)
          this.datas[data[i].alias] = data[i].name
        }
        return array
      },
      getKey (data) {
        let key = {}
        for (let i = 0; i < data.length; i++) {
          key[data[i].name] = data[i].alias
        }
        return key
      },
      // 循环手术记录数据
      getOperation (data) {
        let zuoguan
        let youguan
        let qiaoxueguan
        let shoushushijian
        let key
        for (let i = 0; i < data.length; i++) {
          if (data[i].subItems.length !== 0) {
            zuoguan = data[1].subItems
            youguan = data[2].subItems
            qiaoxueguan = data[3].subItems
          } else {
            shoushushijian = data[0].name
            key = data[0].alias
          }
        }
        this.navigation.push(shoushushijian)
        this.value[shoushushijian] = key
        for (let i = 0; i < zuoguan.length; i++) {
          this.zuoguan.push(zuoguan[i].name)
          this.value[zuoguan[i].name] = zuoguan[i].alias
        }
        for (let i = 0; i < youguan.length; i++) {
          this.youguan.push(youguan[i].name)
          this.value[youguan[i].name] = youguan[i].alias
        }
        for (let i = 0; i < qiaoxueguan.length; i++) {
          this.qiaoxueguan.push(qiaoxueguan[i].name)
          this.value[qiaoxueguan[i].name] = qiaoxueguan[i].alias
        }
      },
      // 循环化验指标数据
      getLaboratorial (data) {
        if (data.length !== 0) {
          this.assay = true
          var value = []
          for (let i = 0; i < data.length; i++) {
            this.huayanzhibiao[i] = {name: data[i].name, subItems: []}
            for (let j = 0; j < data[i].subItems.length; j++) {
              this.huayanzhibiao[i].subItems.push({name: data[i].subItems[j].name, key: data[i].name + ',' + data[i].subItems[j].name})
            }
          }
          value = this.huayanzhibiao
          this.getLength(value)
        } else {
          this.assay = false
        }
      },
      // 将化验指标数据length储存下来
      getLength (value) {
        this.listLen = value.length
        for (let i = 0; i < value.length; i++) {
          this.$set(this.childState, i, [])
          this.$set(this.dataaa, i, value[i].subItems)
        }
      },
      // 单选按钮
      childHandle (i, pi, name, key) {
        let child = this.childState
        if (child[pi][i]) {
          this.allState[pi] = false
        }
        if (this.items[name + i]) {
          delete this.items[name + i]
        } else {
          this.items[name + i] = key
        }
        this.$set(child[pi], i, !child[pi][i])
        if (this.childState[pi][i]) {
          this.checkList(this.childState[pi], pi)
        }
      },
      // 二级全选按钮
      handleTitAll (pi, name) {
        let child = this.childState[pi]
        let allState = this.allState
        for (let i = 0; i < this.huayanzhibiao[pi].subItems.length; i++) {
          this.$set(child, i, !allState[pi])
        }
        for (let i = 0; i < this.dataaa[pi].length; i++) {
          if (this.items[name + i] && this.items[name + (i + 1)]) {
            if (i === this.dataaa[pi].length - 2) {
              for (let j = 0; j < this.dataaa[pi].length; j++) {
                delete this.items[name + j]
              }
              i = i + 2
            }
          } else if (this.items[name + i] && !this.items[name + (i + 1)]) {
            delete this.items[name + i]
          } else {
            this.items[name + i] = this.dataaa[pi][i].name
          }
        }
        this.$set(allState, pi, !allState[pi])
      },
      checkList (child, pi) {
        let allState = this.allState
        let len = this.huayanzhibiao[pi].subItems.length
        for (let i = 0; i < len; i++) {
          if (!child[i]) {
            return
          }
        }
        this.$set(allState, pi, true)
      },
      // 一级全选按钮
      handleCheckAllChange8 () {
        let len = this.huayanzhibiao
        for (let i = 0; i < len.length; i++) {
          if (this.allState[i] === false) {
            this.handleTitAll(i, len[i].name)
          } else if (!this.allState[i]) {
            this.handleTitAll(i, len[i].name)
          } else if (this.allState[i] === this.allState[i + 1]) {
            if (i === this.huayanzhibiao.length - 2) {
              for (let j = 0; j < this.listLen; j++) {
                this.handleTitAll(j, this.huayanzhibiao[j].name)
              }
              i = i + 2
            }
          } else if (len.length === 1) {
            this.handleTitAll(i, len[i].name)
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import './Filtrate';
</style>
