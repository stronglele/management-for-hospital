<template>
  <div id="case-edit">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="0">
        <div class="edit-container">
          <user-info :title="'基本信息'"></user-info>
          <tab00 @next="next()"></tab00>
        </div>
      </el-tab-pane>
      <el-tab-pane label="入院诊断" name="1">
        <div class="edit-container">
          <user-info :title="'入院诊断'"></user-info>
          <tab01 @next="next()" @previous="previous()"></tab01>
        </div>
      </el-tab-pane>
      <el-tab-pane label="出院诊断" name="2">
        <div class="edit-container">
          <user-info :title="'出院诊断'"></user-info>
          <tab02 @next="next()" @previous="previous()"></tab02>
        </div>
      </el-tab-pane>
      <el-tab-pane label="入院简史" name="3">
        <div class="edit-container">
          <user-info :title="'入院简史'"></user-info>
          <tab03 @next="next()" @previous="previous()"></tab03>
        </div>
      </el-tab-pane>
      <el-tab-pane label="CAG/PCI手术记录" name="4">
        <div class="edit-container">
          <user-info :title="'CAG/PCI手术记录'"></user-info>
          <tab04 @next="next()" @previous="previous()"></tab04>
        </div>
      </el-tab-pane>
      <el-tab-pane label="主要化验/特殊检查结果" name="5">
        <div class="edit-container">
          <user-info :title="'住院期间主要检验及特殊检查结果（化验，X光/CT/MRI、病理等）'"></user-info>
          <tab05 @next="next()" @previous="previous()"></tab05>
        </div>
      </el-tab-pane>
      <el-tab-pane label="辅助检查" name="6">
        <div class="edit-container">
          <user-info :title="'辅助检查'"></user-info>
          <tab06 @next="next()" @previous="previous()"></tab06>
        </div>
      </el-tab-pane>
      <el-tab-pane label="围手术期评估" name="7">
        <div class="edit-container">
          <user-info :title="'围手术期评估'"></user-info>
          <tab07 @next="next()" @previous="previous()"></tab07>
        </div>
      </el-tab-pane>
      <el-tab-pane label="出院转归" name="8">
        <div class="edit-container">
          <user-info :title="'出院转归'"></user-info>
          <tab08 @next="next()" @previous="previous()"></tab08>
        </div>
      </el-tab-pane>
      <el-tab-pane label="出院带药" name="9">
        <div class="edit-container">
          <user-info :title="'出院带药'"></user-info>
          <tab09 @next="next()" @previous="previous()"></tab09>
        </div>
      </el-tab-pane>
      <el-tab-pane label="随访记录" name="10">
        <div class="edit-container">
          <user-info :title="'随访记录'"></user-info>
          <tab10 @previous="previous()"></tab10>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import UserInfo from './child/userinfo'
  import Tab00 from './child/tab00'
  import Tab01 from './child/tab01'
  import Tab02 from './child/tab02'
  import Tab03 from './child/tab03'
  import Tab04 from './child/tab04'
  import Tab05 from './child/tab05'
  import Tab06 from './child/tab06'
  import Tab07 from './child/tab07'
  import Tab08 from './child/tab08'
  import Tab09 from './child/tab09'
  import Tab10 from './child/tab10'

  export default {
    name: 'case-edit',
    components: {
      'user-info': UserInfo,
      'tab00': Tab00,
      'tab01': Tab01,
      'tab02': Tab02,
      'tab03': Tab03,
      'tab04': Tab04,
      'tab05': Tab05,
      'tab06': Tab06,
      'tab07': Tab07,
      'tab08': Tab08,
      'tab09': Tab09,
      'tab10': Tab10
    },
    data () {
      return {
        activeName: '0'
      }
    },
    created () {
      if (this.$route.query.tab) {
        this.activeName = this.$route.query.tab
      }
    },
    methods: {
      next () {
        this.activeName = `${Number(this.activeName) + 1}`
      },
      previous () {
        this.activeName = `${Number(this.activeName) - 1}`
      }
    }
  }
</script>

<style lang="scss">
  @import './child/tab';

  .edit-container {
    padding: 0 20px 30px 20px;
  }
</style>
