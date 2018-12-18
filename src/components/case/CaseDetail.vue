<template xmlns="http://www.w3.org/1999/html">
  <div id="case-detail">
    <div class="result tab-table">
      <div class="detail-top">
        <a class="back isHidden" @click="getBack" style="cursor:pointer;">< 返回</a>
        <span class="top-title">{{userName}}的出院小结</span>
        <el-button @click="getPrint" class="btn-print isHidden">打印</el-button>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>基本信息</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleBaseInfo">编辑</el-button>
        </div>
        <div class="result-info clearfix" style="width: 100%" v-if="isBaseinfo">
          <div class="left" style="width: 33.33%">
            <ul>
              <li>患者姓名: <span>{{userName}}</span></li>
              <li>医院名称: <span>{{hospitalName}}</span></li>
              <li>入院日期: <span>{{hospitalizeDate | date}}</span></li>
            </ul>
          </div>
          <div class="left" style="width: 33.33%">
            <ul>
              <li>年龄: <span>{{age}}</span></li>
            </ul>
          </div>
          <div class="right" style="width: 33.33%">
            <ul>
              <li>性别: <span>{{sex}}</span></li>
              <li>住院号: <span>{{num}}</span></li>
              <li>出院日期: <span>{{discharged | date}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>入院诊断</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleInhospital">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isInhospital">
          <p><span>{{chd}}{{chditem}}{{pci}}{{cabg}}{{hd}}{{hditem}}{{sd}}{{sditem}}{{hyp}}{{hcm}}{{hcmitem}}{{ci}}{{ciitem}}{{cisubitem}}{{arm}}{{armitem}}{{armtext}}{{crf}}{{pi}}{{osas}}{{cas}}{{ca}}{{caitem}}{{othertext}}</span>
          </p>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>出院诊断</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleOutHospital">编辑</el-button>
        </div>
        <div class="clearfix result-info">
          <p>{{chd2}}{{chditem2}}{{pci2}}{{cabg2}}{{hd2}}{{hditem2}}{{sd2}}{{sditem2}}{{hyp2}}{{hcm2}}{{hcmitem2}}{{ci2}}{{ciitem2}}{{cisubitem2}}{{arm2}}{{armitem2}}{{armtext2}}{{crf2}}{{pi2}}{{osas2}}{{cas2}}{{ca2}}{{caitem2}}{{ias2}}{{isr2}}{{othertext2}}</p>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>入院简史</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleIntoinfo">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isIntoinfo">
          <p>患者发病时间：{{diseaseTime | date}}</p>
          <p>诱因：{{incentive}}</p>
          <p>出现症状：{{symptom}}</p>
          <p>诊疗经过：{{treatmentPass}}</p>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>CAG/PCI手术记录</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handlePci">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isPci">
          <p>手术日期：{{cagdate | date}}</p>
          <p class="ssjl">造影记录</p>
          <div v-if="isZGZY" class="ssjl-info">左冠造影：
            <p v-if="isLM">LM： {{lmvalue}}%狭窄  </p>
            <p v-if="isLAD">LAD： <span v-if="isJD">近段{{ladnearvalue}}%狭窄 </span>
              <span v-if="isZD">中段{{ladmiddlevalue}}%狭窄 </span><span v-if="isYD">远段{{ladfarvalue}}%狭窄 </span>
              <span v-if="isDYDZJ">第一对角支{{ladfirstvalue}}%狭窄 </span><span
                v-if="isDYDZJa">第一对角支a{{ladfirstavalue}}%狭窄 </span>
              <span
                v-if="isDRDZJ">第二对角支{{ladsecondvalue}}%狭窄 </span><span
                v-if="isDRDZJa">第二对角支a{{ladsecondavalue}}%狭窄</span>
            </p>
            <p v-if="isLCX">LCX：<span v-if="isJDlcx">近段{{lcxnearvalue}}%狭窄 </span><span v-if="isZDlcx">中段{{lcxmiddlevalue}}%狭窄 </span>
              <span v-if="isYDlcx">远段{{lcxfarvalue}}%狭窄 </span><span v-if="isZJZ">中间支{{lcxcentervalue}}%狭窄 </span>
              <span v-if="isDYDYZ">第一钝缘支{{lcxfirstvalue}}%狭窄 </span><span
                v-if="isDEDYZ">第二钝缘支{{lcxsecondvalue}}%狭窄 </span>
              <span v-if="isZHCZ">左后侧支{{lcxleftvalue}}%狭窄 </span><span v-if="isZHCZa">左后侧支a{{lcxleftavalue}}%狭窄 </span>
              <span v-if="isZHCZb">左后侧支b{{lcxleftbvalue}}%狭窄 </span><span
                v-if="isZHJZ">左后降支{{lcxleftdropvalue}}%狭窄 </span></p></div>
          <div v-if="isYGZY" class="ssjl-info">右冠造影：
            <p v-if="isRCA">RCA： <span v-if="isJDrca">近段{{rcanearvalue}}%狭窄 </span><span v-if="isZDrca">中段{{rcamiddlevalue}}%狭窄 </span>
              <span v-if="isYDrca">远段{{rcafarvalue}}%狭窄 </span><span
                v-if="isYHJZrca">右后降支{{rcarightdropvalue}}%狭窄 </span>
              <span v-if="isYHCZrca">右后侧支{{rcarightvalue}}%狭窄 </span><span v-if="isYHCZDYFZrca">右后侧支第一分支{{rcarightfirstvalue}}%狭窄 </span>
              <span v-if="isYHCZDEFZrca">右后侧支第二分支{{rcarightsecondvalue}}%狭窄 </span><span v-if="isYHCZDSFZrca">右后侧支第三分支{{rcarightthirdvalue}}%狭窄 </span>
            </p></div>
          <div v-if="isQXGPG" class="ssjl-info">桥血管评估：
            <p v-if="isBBWZ">病变位置：{{lesionvalue}} </p>
            <p v-if="isQXG">桥血管：
              <span v-if="isJDqxg">近段{{svbgnearvalue}}%狭窄 </span><span v-if="isZDqxg">中段{{svbgmiddlevalue}}%狭窄 </span>
              <span v-if="isYDqxg">远段{{svbgfarvalue}}%狭窄</span></p></div>
          <p><span v-if="isZSZDM">左室-主动脉根部压力阶差：{{larpg}}mmHg</span></p>
          <p v-if="isSSDM">双肾动脉造影：{{dra}}</p>
          <p v-if="isQTZY">其他造影发现：<span v-if="isCZXH">侧支循环{{ccvalue}} </span><span v-if="isJQ">肌桥{{mbvalue}} </span>
            <span v-if="isXGJX">血管畸形{{vmvalue}} </span><span v-if="isDJML">动静脉瘘{{afvalue}} </span><span v-if="isGMJL">冠脉痉挛{{csvalue}} </span>
            <span v-if="isQT">其他{{ovalue}} </span></p>
          <p class="ssjl">PCI手术记录</p>
          <p>PCI手术日期：{{pcidate | date}}</p>
          <p>PCI状态：{{pcistatus}}</p>
          <p v-if="isZJZR">支架植入部位：<span v-for="sis in sisDto">{{sis}}  </span></p>
          <div v-if="isZJZR"><p class="ssjl">靶病变特性</p>
            <p v-for="sisb in sisBDto">{{sisb}}</p></div>
          <div v-if="isZJZR"><p class="ssjl">耗材</p>
            <div v-if="isHC"><p v-for="sish in sisHDto"> {{sish}} </p></div>
          </div>
          <div v-if="isZJZR"><p class="ssjl">术后残余狭窄</p>
            <p v-for="sissh in sishDto">{{sissh}}</p>
          </div>
          <div v-if="isZJZR"><p class="ssjl">术后TIMI血流</p>
            <p v-for="sisti in sistiDto">{{sisti}}</p></div>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>主要化验/特殊检验结果</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleResult">编辑</el-button>
        </div>
        <div class="result-info" v-if="isResult">
          <div v-for="record in recordDtos" style="margin-top: 20px">
            <p><strong>{{record.inspectType}}</strong></p>
            <p>检查时间：{{record.reportDate | date}}</p>
            <el-table :data="record.items" stripe style="width: 100%;margin-top: 5px;">
              <el-table-column prop="inspection" label="检查指标" width="auto"></el-table-column>
              <el-table-column prop="arrange" label="标准区间" width="auto"></el-table-column>
              <el-table-column prop="result" label="数值" width="auto"></el-table-column>
            </el-table>
          </div>
          <div v-for="imagingReport in imagingReportDtos">
            <p><strong>{{imagingReport.name}}</strong></p>
            <p>报告日期：{{imagingReport.createdDate | date}}</p>
            <p>报告单号：{{imagingReport.num}}</p>
            <p>临床诊断：{{imagingReport.diagnosis}}</p>
            <p>检查技术：{{imagingReport.technique ? '常规' : '无'}}</p>
            <p>影像描述：{{imagingReport.description}}</p>
            <p>诊断描述：{{imagingReport.opinion}}</p>
          </div>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>辅助检查</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleCheck">编辑</el-button>
        </div>
        <div class="report-result clearfix" v-if="isCheck">
          <div v-if="isXC">
            <p><strong>心超</strong></p>
            <p v-if="checkedDate">检查日期: {{checkedDate | date}}</p>
            <p v-if="hospitalName2">检查医院名称: {{hospitalName2}}</p>
            <div v-if="ismMain" style="margin-top: 10px">
              <p><strong>M型主要测值</strong></p>
              <el-table :data="mMainresult" stripe style="width: 100%">
                <el-table-column prop="label" label="名称" width="auto"></el-table-column>
                <el-table-column prop="key" label="测量值" width="auto"></el-table-column>
                <el-table-column prop="subKey" label="正常参考值" width="auto"></el-table-column>
              </el-table>
            </div>
            <div v-if="isEWCS" style="margin-top: 10px">
              <p><strong>二维超声主要描述</strong></p>
              <p v-if="isSim">Simpson法测量LVEF: {{simpsonItem}}</p>
              <p v-if="isFDM">肺动脉压力: {{papitem}}</p>
            </div>
            <div v-if="isZXS" style="margin-top: 10px">
              <p><strong>左心室功能测定</strong></p>
              <el-table :data="zXSDto" stripe style="width: 100%;">
                <el-table-column prop="label" label="名称" width="auto"></el-table-column>
                <el-table-column prop="key" label="测量值" width="auto"></el-table-column>
                <el-table-column prop="subKey" label="正常参考值" width="auto"></el-table-column>
              </el-table>
            </div>
            <div>
              <p><strong>诊断意见</strong></p>
              <p>左室壁活动：{{lvwmZC}}{{lfwvalue}}{{llwvalue}}{{latwvalue}}{{lapexvalue}}{{lisvalue}}{{lrvvalue}}</p>
              <p>右室壁活动：{{rvwmZC}}{{rfwvalue}}{{rlwvalue}}{{ratwvalue}}{{rapexvalue}}{{risvalue}}{{rrvvalue}}</p>
              <p>瓣膜关闭不全： {{viflag}}；<span v-for="vic in vicDto">{{vic}} </span></p>
              <p>瓣膜口狭窄：{{vs}}；<span v-for="vsc in vscDto">{{vsc}} </span></p>
              <p v-if="isOtherItem">其他：{{otherItem}}</p>
            </div>
          </div>
          <div v-if="isXDT">
            <p><strong>心电图：</strong>{{cardiogramItem}}</p>
          </div>
          <div v-if="isDTXDT">
            <p><strong>动态心电图：</strong>{{dcgitem}}</p>
          </div>
          <div v-if="isJBXG">
            <p><strong>颈部血管超声：</strong>{{cvusitem}}</p>
          </div>
          <div v-if="isXZXG">
            <p><strong>下肢血管超声：</strong>{{levuitem}}</p>
          </div>
          <div v-if="isMGCTA">
            <p><strong>冠脉CTA：</strong>{{ctaitem}}</p>
          </div>
        </div>
      </div>
      <div class="cyxj" name="perioperativeEvents">
        <div slot="header" class="clearfix result-edit">
          <span>围手术期评估</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleOperate">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isOperate">
          <p>{{mi}}{{cs}}{{hf}}{{cat}}{{ha}}{{pt}}{{cn}}{{ndd}}{{ovc}}{{cr}}{{seventytwoh}}{{bo}}{{hs}}{{rh}}{{dtb}}{{uh}}{{ob}}{{pi3}}{{sa}}{{satext}}</p>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>出院转归</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleOutcome">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isOutcome">
          <p>{{outcomeName}}</p>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>出院带药</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleDischarge">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isDischarge" v-for="discharge in dischargeDto" :key="discharge.id">
          <p>药物名称：{{discharge.medicineName}}</p>
          <p>剂量用法：{{discharge.dosage}}</p>
          <p>注意事项：{{discharge.notes}}</p>
          <p>带药情况：{{discharge.takeMedicine}}</p>
        </div>
      </div>
      <div class="cyxj">
        <div slot="header" class="clearfix result-edit">
          <span>随访记录</span>
          <el-button style="float: right;" type="primary" class="isHidden" @click="handleFlup">编辑</el-button>
        </div>
        <div class="result-info clearfix" v-if="isFlup">
          <p>制定医生：{{doctorName}}</p>
          <p>随访时间：{{planDate | date}}</p>
          <hr style="border:1px dashed  #999"/>
          <div v-for="flupItemDto in flupItemDtoList" :key="flupItemDto.id" style="width: 80%">
            <p><span v-if="flupItemDto.flupTime == 0">一个月后</span><span v-if="flupItemDto.flupTime == 1">三个月后</span>
              <span v-if="flupItemDto.flupTime == 2">六个月后</span><span v-if="flupItemDto.flupTime == 3">九个月后</span>
              <span v-if="flupItemDto.flupTime == 4">十二个月后</span><span v-if="flupItemDto.flupTime == 5">其他时间</span>
              {{flupItemDto.planDate | date}}</p>
            <span v-for="plan in flupItemDto.plan">{{plan}} </span>
            <hr style="border:1px dashed  #999;"/>
          </div>
        </div>
        <div class="result-info clearfix" v-if="isOtherFlup" v-for="otherFlup in otherFlupList">
          <p>制定医生：{{otherFlup.doctorName}}</p>
          <p>随访时间：{{otherFlup.planDate | date}}</p>
          <hr style="border:1px dashed  #999"/>
          <div v-for="flupItemDto in otherFlup.flupItems" :key="flupItemDto.id" style="width: 80%">
            <p><span v-if="flupItemDto.flupTime == 0">一个月后</span><span v-if="flupItemDto.flupTime == 1">三个月后</span>
              <span v-if="flupItemDto.flupTime == 2">六个月后</span><span v-if="flupItemDto.flupTime == 3">九个月后</span>
              <span v-if="flupItemDto.flupTime == 4">十二个月后</span><span v-if="flupItemDto.flupTime == 5">其他时间</span>
              {{flupItemDto.planDate | date}}</p>
            <span v-for="plan in flupItemDto.plan">{{plan}} </span>
            <hr style="border:1px dashed  #999;"/>
          </div>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="isErrorMsg" size="tiny">
        <span>{{errorMsg}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="isErrorMsg = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'case-detail',
    data () {
      return {
//          基础信息
        isBaseinfo: true,
        userName: '',
        hospitalName: '',
        hospitalizeDate: '',
        age: '',
        sex: '',
        num: '',
        discharged: '',
//        入院诊断
        isInhospital: true,
        chd: '',
        chditem: '',
        pci: '',
        cabg: '',
        hd: '',
        hditem: '',
        sd: '',
        sditem: '',
        hyp: '',
        hcm: '',
        hcmitem: '',
        ci: '',
        ciitem: '',
        cisubitem: '',
        arm: '',
        armitem: '',
        armtext: '',
        crf: '',
        pi: '',
        osas: '',
        cas: '',
        ca: '',
        caitem: '',
        othertext: '',
//        出院诊断
        chd2: '',
        chditem2: '',
        pci2: '',
        cabg2: '',
        hd2: '',
        hditem2: '',
        sd2: '',
        sditem2: '',
        hyp2: '',
        hcm2: '',
        hcmitem2: '',
        ci2: '',
        ciitem2: '',
        cisubitem2: '',
        arm2: '',
        armitem2: '',
        armtext2: '',
        crf2: '',
        pi2: '',
        osas2: '',
        cas2: '',
        ca2: '',
        caitem2: '',
        ias2: '',
        isr2: '',
        othertext2: '',
//        入院简史
        isIntoinfo: true,
        diseaseTime: '',
        symptom: '',
        incentive: '',
        treatmentPass: '',
//        手术记录
        isPci: true,
        cagdate: '',
        isLM: false,
        isZGZY: false,
        isLAD: false,
        isLCX: false,
        isJD: false,
        isZD: false,
        isYD: false,
        isDYDZJ: false,
        isDYDZJa: false,
        isDRDZJ: false,
        isDRDZJa: false,
        isJDlcx: false,
        isZDlcx: false,
        isYDlcx: false,
        isZJZ: false,
        isDYDYZ: false,
        isDEDYZ: false,
        isZHCZ: false,
        isZHCZa: false,
        isZHCZb: false,
        isZHJZ: false,
        lmvalue: '',
        ladnearvalue: '',
        ladmiddlevalue: '',
        ladfarvalue: '',
        ladfirstvalue: '',
        ladsecondvalue: '',
        ladfirstavalue: '',
        ladsecondavalue: '',
        lcxnearvalue: '',
        lcxmiddlevalue: '',
        lcxfarvalue: '',
        lcxcentervalue: '',
        lcxfirstvalue: '',
        lcxsecondvalue: '',
        lcxleftvalue: '',
        lcxleftavalue: '',
        lcxleftbvalue: '',
        lcxleftdropvalue: '',
        isYGZY: false,
        isRCA: false,
        isJDrca: false,
        isZDrca: false,
        isYDrca: false,
        isYHJZrca: false,
        isYHCZrca: false,
        isYHCZDYFZrca: false,
        isYHCZDEFZrca: false,
        isYHCZDSFZrca: false,
        rcanearvalue: '',
        rcamiddlevalue: '',
        rcafarvalue: '',
        rcarightdropvalue: '',
        rcarightvalue: '',
        rcarightfirstvalue: '',
        rcarightsecondvalue: '',
        rcarightthirdvalue: '',
        lesionvalue: '',
        isQXGPG: false,
        isBBWZ: false,
        isQXG: false,
        isJDqxg: false,
        isZDqxg: false,
        isYDqxg: false,
        svbgnearvalue: '',
        svbgmiddlevalue: '',
        svbgfarvalue: '',
        isZSZDM: false,
        larpg: '',
        dra: '',
        isQTZY: false,
        isSSDM: false,
        ccvalue: '',
        mbvalue: '',
        vmvalue: '',
        afvalue: '',
        csvalue: '',
        ovalue: '',
        pcidate: '',
        pcistatus: '',
        sis: '',
        sisb: '',
        sisDto: [],
        sisBDto: [],
        sisHDto: [],
        sisGDto: [],
        sishDto: [],
        sistiDto: [],
        isCZXH: false,
        isJQ: false,
        isXGJX: false,
        isDJML: false,
        isGMJL: false,
        isQT: false,
        isZJZR: false,
        isZJZRdh: false,
        isHC: false,
        goodName: '',
        company: '',
        width: '',
        height: '',
        lm_tlcs: '',
        ladn_tlcs: '',
        ladm_tlcs: '',
        ladf_tlcs: '',
        ladfv_tlcs: '',
        ladsv_tlcs: '',
        ladfav_tlcs: '',
        ladsav_tlcs: '',
        lcxn_tlcs: '',
        lcxm_tlcs: '',
        lcxf_tlcs: '',
        lcxc_tlcs: '',
        lcxfv_tlcs: '',
        lcxsv_tlcs: '',
        lcxl_tlcs: '',
        lcxla_tlcs: '',
        lm_cm: {},
        ladn_cm: {},
        ladm_cm: {},
        ladf_cm: {},
        ladfv_cm: {},
        ladsv_cm: {},
        ladfav_cm: {},
        ladsav_cm: {},
        lcxn_cm: {},
        lcxm_cm: {},
        lcxf_cm: {},
        lcxc_cm: {},
        lcxfv_cm: {},
        lcxsv_cm: {},
        lcxl_cm: {},
        lcxla_cm: {},
        lcxlb_cm: {},
        lcxld_cm: {},
        rcan_cm: {},
        rcam_cm: {},
        rcaf_cm: {},
        rcard_cm: {},
        rcar_cm: {},
        rcarf_cm: {},
        rcars_cm: {},
        rcart_cm: {},
        svbgn_cm: {},
        svbgm_cm: {},
        svbgf_cm: null,
        lm_prs: '',
        ladn_prs: '',
        ladf_prs: '',
        ladfv_prs: '',
        ladsv_prs: '',
        ladfav_prs: '',
        ladsav_prs: '',
        lcxn_prs: '',
        lcxf_prs: '',
        lcxc_prs: '',
        lcxfv_prs: '',
        lcxsv_prs: '',
        lcxl_prs: '',
        lcxla_prs: '',
        lcxlb_prs: '',
        lcxld_prs: '',
        rcan_prs: '',
        rcam_prs: '',
        rcaf_prs: '',
        rcard_prs: '',
        rcar_prs: '',
        rcarf_prs: '',
        rcars_prs: '',
        rcart_prs: '',
        svbgn_prs: '',
        svbgm_prs: '',
        svbgf_prs: '',
        lm_timi: '',
        ladn_timi: '',
        ladm_timi: '',
        ladf_timi: '',
        ladfv_timi: '',
        ladsv_timi: '',
        ladfav_timi: '',
        ladsav_timi: '',
        lcxn_timi: '',
        lcxm_timi: '',
        lcxf_timi: '',
        lcxc_timi: '',
        lcxfv_timi: '',
        lcxsv_timi: '',
        lcxl_timi: '',
        lcxla_timi: '',
        lcxlb_timi: '',
        lcxld_timi: '',
        rcan_timi: '',
        rcam_timi: '',
        rcaf_timi: '',
        rcard_timi: '',
        rcar_timi: '',
        rcarf_timi: '',
        rcars_timi: '',
        rcart_timi: '',
        svbgn_timi: '',
        svbgm_timi: '',
        svbgf_timi: '',
//        血常规
        recordDtos: [],
        arrange: '',
        isResult: true,
//        胸片正位片
        isImage: true,
        imagingReportDtos: [],
//        辅助检查
        isCheck: true,
        ae: [],
        isXC: false,
        isXDT: false,
        isDTXDT: false,
        isJBXG: false,
        isXZXG: false,
        isMGCTA: false,
        ismMain: false,
        mMainresult: [],
        simpsonItem: '',
        papitem: '',
        isEWCS: false,
        isSim: false,
        isFDM: false,
        isZXS: false,
        zXSDto: [],
        lvwmZC: '',
        rvwmZC: '',
        viflag: '',
        rapexvalue: '',
        vs: '',
        rrvvalue: '',
        isOtherItem: false,
        latwvalue: '',
        ratwvalue: '',
        lapexvalue: '',
        lisvalue: '',
        lrvvalue: '',
        risvalue: '',
        ardmetervalue: '',
        ardnormalvalue: '',
        cardiogramItem: '',
        checkedDate: '',
        ctaitem: '',
        cvusitem: '',
        dcgitem: '',
        hospitalName2: '',
        ladmetervalue: '',
        ladnormalvalue: '',
        levuitem: '',
        lfwvalue: '',
        llwvalue: '',
        lveddmetervalue: '',
        lveddnormalvalue: '',
        lvedvmetervalue: '',
        lvedvnormalvalue: '',
        lvefmetervalue: '',
        lvefnormalvalue: '',
        lvesdmetervalue: '',
        lvesdnormalvalue: '',
        lvesvmetervalue: '',
        lvesvnormalvalue: '',
        lvstmetervalue: '',
        lvstnormalvalue: '',
        lvtmetervalue: '',
        lvtnormalvalue: '',
        lvwmitem: [],
        lvwmstatus: '',
        modifier: '',
        otherItem: '',
        pap: '',
        rfwvalue: '',
        rlwvalue: '',
        rvwmitem: [],
        rvwmstatus: '',
        simpson: '',
        slightlyitem: [],
        vicDto: [],
        vscDto: [],
        vid: [],
        vsc: [],
        vsd: [],
        vicmv: '',
        victv: '',
        vicav: '',
        vicpv: '',
//        围手术期评估
        isOperate: true,
        mi: '',
        cs: '',
        hf: '',
        cat: '',
        ha: '',
        pt: '',
        cn: '',
        ndd: '',
        ovc: '',
        cr: '',
        seventytwoh: '',
        bo: '',
        hs: '',
        rh: '',
        dtb: '',
        uh: '',
        ob: '',
        pi3: '',
        sa: '',
        satext: '',
//        出院转归
        isOutcome: true,
        outcomeName: '',
//        出院带药
        isDischarge: true,
        dischargeDto: [],
//        随访记录
        isFlup: true,
        isOtherFlup: true,
        otherFlupList: [],
        doctorName: '',
        planDate: '',
        flupItemDtoList: [],
        planDto: [],
        otherPlanDto: [],
        isErrorMsg: false,
        errorMsg: ''
      }
    },
    created () {
//      基本信息
      this.getBasicInformation()
//      入院诊断
      this.getAdmissionDiagnosis()
//      出院诊断
      this.getDischargeDiagnosis()
//      入院简史
      this.getAdmissionHistory()
//      CAG/PCI手术记录
      this.getOperationRecord()
//      主要化验/特殊检验结果
      this.getLabReportRecord()
//      辅助检查
      this.getAuxiliaryExamination()
//      围手术期评估
      this.getPerioperativeEvents()
//      出院转归
      this.getHospitalOutcome()
//      出院带药
      this.getDischargeMedication()
//      随访记录
      this.getFlupController()
//      其他随访记录
      this.getOtherFlupController()
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      getPrint () {
        window.print()
      },
      handleBaseInfo () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '0'}
        })
      },
      handleInhospital () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '1'}
        })
      },
      handleOutHospital () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '2'}
        })
      },
      handleIntoinfo () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '3'}
        })
      },
      handlePci () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '4'}
        })
      },
      handleResult () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '5'}
        })
      },
      handleCheck () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '6'}
        })
      },
      handleOperate () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '7'}
        })
      },
      handleOutcome () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '8'}
        })
      },
      handleDischarge () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '9'}
        })
      },
      handleFlup () {
        this.$router.push({
          name: 'CaseEdit',
          params: {id: this.$route.params.id, userId: this.$route.params.userId},
          query: {tab: '10'}
        })
      },
      getBasicInformation () {
        this.$http.get(`${this.$global.api}basicInformation/get?id=${this.$route.params.id}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.userName = content.name
              this.hospitalName = content.hospitalName
              this.hospitalizeDate = content.hospitalized
              this.age = content.age
              this.sex = content.sex
              this.num = content.num
              this.discharged = content.discharged
            }
          } else {
            this.isBaseinfo = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getAdmissionDiagnosis () {
        this.$http.get(`${this.$global.api}admissionDiagnosis/get?illnessId=${this.$route.params.id}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              if (content.chd && content.chd !== '无') {
                this.chd = '冠心病'
              }
              if (content.chditem && content.chditem !== '') {
                this.chditem = '（' + content.chditem + '），'
              }
              if (content.pci && content.pci !== '无') {
                this.pci = 'PCI术后，'
              }
              if (content.cabg && content.cabg !== '无') {
                this.cabg = 'CABG术后，'
              }
              if (content.hd && content.hd !== '无') {
                this.hd = '高血压病'
                if (content.hditem && content.hditem !== '') {
                  this.hditem = '（' + content.hditem + '），'
                }
              }
              if (content.sd && content.sd !== '无') {
                this.sd = '糖尿病'
                if (content.sditem && content.sditem !== '') {
                  this.sditem = '（' + content.sditem + '），'
                }
              }
              if (content.hyp && content.hyp !== '无') {
                this.hyp = '高血脂症，'
              }
              if (content.hcm && content.hcm !== '无') {
                this.hcm = '肥厚性心肌病'
              }
              if (content.hcmitem && content.hcmitem !== '') {
                this.hcmitem = '（' + content.hcmitem + '），'
              }
              if (content.ci && content.ci !== '无') {
                this.ci = '心功能不全'
                if (content.ciitem && content.ciitem !== '') {
                  this.ciitem = '（' + content.ciitem + '：'
                  if (content.cisubitem && content.cisubitem !== '') {
                    this.cisubitem = content.cisubitem + '），'
                  }
                }
              }
              if (content.arm && content.arm !== '无') {
                this.arm = '心律失常'
                if (content.armitem && content.armitem !== '') {
                  this.armitem = '（' + content.armitem + '）'
                }
                if (content.armtext && content.armtext !== '') {
                  this.armtext = content.armtext + '，'
                }
              }
              if (content.crf && content.crf !== '无') {
                this.crf = '慢性肾功能不全，'
              }
              if (content.pi && content.pi !== '无') {
                this.pi = '肺部感染，'
              }
              if (content.osas && content.osas !== '无') {
                this.osas = '呼吸暂停综合症，'
              }
              if (content.cas && content.cas !== '无') {
                this.cas = '颈动脉狭窄，'
              }
              if (content.ca && content.ca !== '无') {
                this.ca = '脑卒中'
              }
              if (content.caitem && content.caitem !== '') {
                this.caitem = '（' + content.caitem + '），'
              }
              if (content.othertext && content.othertext !== '') {
                this.othertext = content.othertext
              }
            }
          } else {
            this.isInhospital = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = '啊哦，服务器接口出错了'
          console.log(err)
        })
      },
      getDischargeDiagnosis () {
        this.$http.get(`${this.$global.api}dischargeDiagnosis/get?illnessId=${this.$route.params.id}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              if (content.chd && content.chd !== '无') {
                this.chd2 = '冠心病'
              }
              if (content.chditem && content.chditem !== '') {
                this.chditem2 = '（' + content.chditem + '），'
              }
              if (content.pci && content.pci !== '无') {
                this.pci2 = 'PCI术后，'
              }
              if (content.cabg && content.cabg !== '无') {
                this.cabg2 = 'CABG术后，'
              }
              if (content.hd && content.hd !== '无') {
                this.hd2 = '高血压病'
                if (content.hditem && content.hditem !== '') {
                  this.hditem2 = '（' + content.hditem + '），'
                }
              }
              if (content.sd && content.sd !== '无') {
                this.sd2 = '糖尿病'
                if (content.sditem && content.sditem !== '') {
                  this.sditem2 = '（' + content.sditem + '），'
                }
              }
              if (content.hyp && content.hyp !== '无') {
                this.hyp2 = '高血脂症，'
              }
              if (content.hcm && content.hcm !== '无') {
                this.hcm2 = '肥厚性心肌病'
              }
              if (content.hcmitem && content.hcmitem !== '') {
                this.hcmitem2 = '（' + content.hcmitem + '），'
              }
              if (content.ci && content.ci !== '无') {
                this.ci2 = '心功能不全'
                if (content.ciitem && content.ciitem !== '') {
                  this.ciitem2 = '（' + content.ciitem + '：'
                  if (content.cisubitem && content.cisubitem !== '') {
                    this.cisubitem2 = content.cisubitem + '），'
                  }
                }
              }
              if (content.arm && content.arm !== '无') {
                this.arm2 = '心律失常'
                if (content.armitem && content.armitem !== '') {
                  this.armitem2 = '（' + content.armitem + '）'
                }
                if (content.armtext && content.armtext !== '') {
                  this.armtext2 = content.armtext + '，'
                }
              }
              if (content.crf && content.crf !== '无') {
                this.crf2 = '慢性肾功能不全，'
              }
              if (content.pi && content.pi !== '无') {
                this.pi2 = '肺部感染，'
              }
              if (content.osas && content.osas !== '无') {
                this.osas2 = '呼吸暂停综合症，'
              }
              if (content.cas && content.cas !== '无') {
                this.cas2 = '颈动脉狭窄，'
              }
              if (content.ca && content.ca !== '无') {
                this.ca2 = '脑卒中'
              }
              if (content.caitem && content.caitem !== '') {
                this.caitem2 = '（' + content.caitem + '），'
              }
              if (content.ias && content.ias !== '无') {
                this.ias2 = '惯性动脉粥样硬化，'
              }
              if (content.isr && content.isr !== '无') {
                this.isr2 = '支架内再狭窄，'
              }
              if (content.othertext && content.othertext !== '') {
                this.othertext2 = content.othertext
              }
            }
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getAdmissionHistory () {
        this.$http.get(`${this.$global.api}admissionHistory/find/${this.$route.params.id}?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.diseaseTime = content.diseaseTime
              this.incentive = content.incentive
              this.symptom = content.symptom
              this.treatmentPass = content.treatmentPass
            }
          } else {
            this.isIntoinfo = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getOperationRecord () {
        this.$http.get(`${this.$global.api}operationRecord/get?illnessId=${this.$route.params.id}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.cagdate = content.cagdate
              if (content.leftca.length > 0) {
                this.isZGZY = true
                for (let i = 0; i < content.leftca.length; i++) {
                  if (content.leftca[i] === 'LM') {
                    this.isLM = true
                    this.lmvalue = content.lmvalue
                  }
                  if (content.leftca[i] === 'LAD') {
                    if (content.lad.length > 0) {
                      this.isLAD = true
                      for (let i = 0; i < content.lad.length; i++) {
                        if (content.lad[i] === '近段') {
                          this.isJD = true
                          this.ladnearvalue = content.ladnearvalue
                        }
                        if (content.lad[i] === '中段') {
                          this.isZD = true
                          this.ladmiddlevalue = content.ladmiddlevalue
                        }
                        if (content.lad[i] === '远段') {
                          this.isYD = true
                          this.ladfarvalue = content.ladfarvalue
                        }
                        if (content.lad[i] === '第一对角支') {
                          this.isDYDZJ = true
                          this.ladfirstvalue = content.ladfirstvalue
                        }
                        if (content.lad[i] === '第一对角支a') {
                          this.isDYDZJa = true
                          this.ladfirstavalue = content.ladfirstavalue
                        }
                        if (content.lad[i] === '第二对角支') {
                          this.isDRDZJ = true
                          this.ladsecondvalue = content.ladsecondvalue
                        }
                        if (content.lad[i] === '第二对角支a') {
                          this.isDRDZJa = true
                          this.ladsecondavalue = content.ladsecondavalue
                        }
                      }
                    }
                  }
                  if (content.leftca[i] === 'LCX') {
                    if (content.lcx.length > 0) {
                      this.isLCX = true
                      for (let i = 0; i < content.lcx.length; i++) {
                        if (content.lcx[i] === '近段') {
                          this.isJDlcx = true
                          this.lcxnearvalue = content.lcxnearvalue
                        }
                        if (content.lcx[i] === '中段') {
                          this.isZDlcx = true
                          this.lcxmiddlevalue = content.lcxmiddlevalue
                        }
                        if (content.lcx[i] === '远段') {
                          this.isYDlcx = true
                          this.lcxfarvalue = content.lcxfarvalue
                        }
                        if (content.lcx[i] === '中间支') {
                          this.isZJZ = true
                          this.lcxcentervalue = content.lcxcentervalue
                        }
                        if (content.lcx[i] === '第一钝缘支') {
                          this.isDYDYZ = true
                          this.lcxfirstvalue = content.lcxfirstvalue
                        }
                        if (content.lcx[i] === '第二钝缘支') {
                          this.isDEDYZ = true
                          this.lcxsecondvalue = content.lcxsecondvalue
                        }
                        if (content.lcx[i] === '左后侧支') {
                          this.isZHCZ = true
                          this.lcxleftvalue = content.lcxleftvalue
                        }
                        if (content.lcx[i] === '左后侧支a') {
                          this.isZHCZa = true
                          this.lcxleftavalue = content.lcxleftavalue
                        }
                        if (content.lcx[i] === '左后侧支b') {
                          this.isZHCZb = true
                          this.lcxleftbvalue = content.lcxleftbvalue
                        }
                        if (content.lcx[i] === '左后降支') {
                          this.isZHJZ = true
                          this.lcxleftdropvalue = content.lcxleftdropvalue
                        }
                      }
                    }
                  }
                }
              }
              if (content.rightca.length > 0) {
                this.isYGZY = true
                for (let i = 0; i < content.rightca.length; i++) {
                  if (content.rightca[i] === 'RCA') {
                    if (content.rca.length > 0) {
                      this.isRCA = true
                      for (let i = 0; i < content.rca.length; i++) {
                        if (content.rca[i] === '近段') {
                          this.isJDrca = true
                          this.rcanearvalue = content.rcanearvalue
                        }
                        if (content.rca[i] === '中段') {
                          this.isZDrca = true
                          this.rcamiddlevalue = content.rcamiddlevalue
                        }
                        if (content.rca[i] === '远段') {
                          this.isYDrca = true
                          this.rcafarvalue = content.rcafarvalue
                        }
                        if (content.rca[i] === '右后降支') {
                          this.isYHJZrca = true
                          this.rcarightdropvalue = content.rcarightdropvalue
                        }
                        if (content.rca[i] === '右后侧支') {
                          this.isYHCZrca = true
                          this.rcarightvalue = content.rcarightvalue
                        }
                        if (content.rca[i] === '右后侧支第一分支') {
                          this.isYHCZDYFZrca = true
                          this.rcarightfirstvalue = content.rcarightfirstvalue
                        }
                        if (content.rca[i] === '右后侧支第二分支') {
                          this.isYHCZDEFZrca = true
                          this.rcarightsecondvalue = content.rcarightsecondvalue
                        }
                        if (content.rca[i] === '右后侧支第三分支') {
                          this.isYHCZDSFZrca = true
                          this.rcarightthirdvalue = content.rcarightthirdvalue
                        }
                      }
                    }
                  }
                }
              }
              if (content.lesionvalue.length > 0) {
                this.isQXGPG = true
                this.isBBWZ = true
                this.lesionvalue = content.lesionvalue
                if (content.svbg.length > 0) {
                  this.isQXG = true
                  for (let i = 0; i < content.svbg.length; i++) {
                    if (content.svbg[i] === '近段') {
                      this.isJDqxg = true
                      this.svbgnearvalue = content.svbgnearvalue
                    }
                    if (content.svbg[i] === '中段') {
                      this.isZDqxg = true
                      this.svbgmiddlevalue = content.svbgmiddlevalue
                    }
                    if (content.svbg[i] === '远段') {
                      this.isYDqxg = true
                      this.svbgfarvalue = content.svbgfarvalue
                    }
                  }
                }
              }
              if (content.larpg !== '') {
                this.isZSZDM = true
                this.larpg = content.larpg
              }
              if (content.draandother.length > 0) {
                for (let i = 0; i < content.draandother.length; i++) {
                  if (content.draandother[i] === '双肾动脉造影') {
                    this.isSSDM = true
                    this.dra = content.dra
                  }
                  if (content.draandother[i] === '其他造影发现') {
                    if (content.oaf.length > 0) {
                      this.isQTZY = true
                      for (let i = 0; i < content.oaf.length; i++) {
                        if (content.oaf[i] === '侧支循环') {
                          this.isCZXH = true
                          this.ccvalue = content.ccvalue
                        }
                        if (content.oaf[i] === '肌桥') {
                          this.isJQ = true
                          this.mbvalue = content.mbvalue
                        }
                        if (content.oaf[i] === '血管畸形') {
                          this.isXGJX = true
                          this.vmvalue = content.vmvalue
                        }
                        if (content.oaf[i] === '动静脉瘘') {
                          this.isDJML = true
                          this.afvalue = content.afvalue
                        }
                        if (content.oaf[i] === '冠脉痉挛') {
                          this.isGMJL = true
                          this.csvalue = content.csvalue
                        }
                        if (content.oaf[i] === '其他') {
                          this.isQT = true
                          this.ovalue = content.ovalue
                        }
                      }
                    }
                  }
                }
              }
              this.pcidate = content.pcidate
              this.pcistatus = content.pcistatus
              if (content.sis.length > 0) {
                this.isZJZR = true
                this.sisDto = content.sis
                for (let i = 0; i < content.sis.length; i++) {
                  if (content.sis[i] === 'LM') {
                    if (content.lm_tlcs) {
                      this.sisBDto[i] = 'LM：' + content.lm_tlcs
                    }
                    if (content.lm_cm) {
                      if (content.lm_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lm_cm.hc.length; j++) {
                          this.company = content.lm_cm.hc[j] + '-M'
                          this.width = content.lm_cm.hc[j] + '-W'
                          this.height = content.lm_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lm_cm.hc[j] + '(' + content.lm_cm[this.company] + '，' + content.lm_cm[this.width] + '*' + content.lm_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LM：' + this.sisGDto
                      }
                    }
                    if (content.lm_prs) {
                      this.sishDto[i] = 'LM：' + content.lm_prs + '%'
                    }
                    if (content.lm_timi) {
                      this.sistiDto[i] = 'LM：' + content.lm_timi
                    }
                  }
                  if (content.sis[i] === 'LAD近段') {
                    if (content.ladn_tlcs) {
                      this.sisBDto[i] = 'LAD近段：' + content.ladn_tlcs
                    }
                    if (content.ladn_cm) {
                      if (content.ladn_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladn_cm.hc.length; j++) {
                          this.company = content.ladn_cm.hc[j] + '-M'
                          this.width = content.ladn_cm.hc[j] + '-W'
                          this.height = content.ladn_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladn_cm.hc[j] + '(' + content.ladn_cm[this.company] + '，' + content.ladn_cm[this.width] + '*' + content.ladn_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD近段：' + this.sisGDto
                      }
                    }
                    if (content.ladn_prs) {
                      this.sishDto[i] = 'LAD近段：' + content.ladn_prs + '%'
                    }
                    if (content.ladn_timi) {
                      this.sistiDto[i] = 'LAD近段：' + content.ladn_timi
                    }
                  }
                  if (content.sis[i] === 'LAD中段') {
                    if (content.ladm_tlcs) {
                      this.sisBDto[i] = 'LAD中段：' + content.ladm_tlcs
                    }
                    if (content.ladm_cm) {
                      if (content.ladm_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladm_cm.hc.length; j++) {
                          this.company = content.ladm_cm.hc[j] + '-M'
                          this.width = content.ladm_cm.hc[j] + '-W'
                          this.height = content.ladm_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladm_cm.hc[j] + '(' + content.ladm_cm[this.company] + '，' + content.ladm_cm[this.width] + '*' + content.ladm_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD中段：' + this.sisGDto
                      }
                    }
                    if (content.ladm_prs) {
                      this.sishDto[i] = 'LAD中段：' + content.ladm_prs + '%'
                    }
                    if (content.ladm_timi) {
                      this.sistiDto[i] = 'LAD中段：' + content.ladm_timi
                    }
                  }
                  if (content.sis[i] === 'LAD远段') {
                    if (content.ladf_tlcs) {
                      this.sisBDto[i] = 'LAD远段：' + content.ladf_tlcs
                    }
                    if (content.ladf_cm) {
                      if (content.ladf_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladf_cm.hc.length; j++) {
                          this.company = content.ladf_cm.hc[j] + '-M'
                          this.width = content.ladf_cm.hc[j] + '-W'
                          this.height = content.ladf_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladf_cm.hc[j] + '(' + content.ladf_cm[this.company] + '，' + content.ladf_cm[this.width] + '*' + content.ladf_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD远段：' + this.sisGDto
                      }
                    }
                    if (content.ladf_prs) {
                      this.sishDto[i] = 'LAD远段：' + content.ladf_prs + '%'
                    }
                    if (content.ladf_timi) {
                      this.sistiDto[i] = 'LAD远段：' + content.ladf_timi
                    }
                  }
                  if (content.sis[i] === 'LAD第一对角支') {
                    if (content.ladfv_tlcs) {
                      this.sisBDto[i] = 'LAD第一对角支：' + content.ladfv_tlcs
                    }
                    if (content.ladfv_cm) {
                      if (content.ladfv_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladfv_cm.hc.length; j++) {
                          this.company = content.ladfv_cm.hc[j] + '-M'
                          this.width = content.ladfv_cm.hc[j] + '-W'
                          this.height = content.ladfv_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladfv_cm.hc[j] + '(' + content.ladfv_cm[this.company] + '，' + content.ladfv_cm[this.width] + '*' + content.ladfv_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD第一对角支：' + this.sisGDto
                      }
                    }
                    if (content.ladfv_prs) {
                      this.sishDto[i] = 'LAD第一对角支：' + content.ladfv_prs + '%'
                    }
                    if (content.ladfv_timi) {
                      this.sistiDto[i] = 'LAD第一对角支：' + content.ladfv_timi
                    }
                  }
                  if (content.sis[i] === 'LAD第一对角支a') {
                    if (content.ladfav_tlcs) {
                      this.sisBDto[i] = 'LAD第一对角支a：' + content.ladfav_tlcs
                    }
                    if (content.ladfav_cm) {
                      if (content.ladfav_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladfav_cm.hc.length; j++) {
                          this.company = content.ladfav_cm.hc[j] + '-M'
                          this.width = content.ladfav_cm.hc[j] + '-W'
                          this.height = content.ladfav_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladfav_cm.hc[j] + '(' + content.ladfav_cm[this.company] + '，' + content.ladfav_cm[this.width] + '*' + content.ladfav_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD第一对角支a：' + this.sisGDto
                      }
                    }
                    if (content.ladfav_prs) {
                      this.sishDto[i] = 'LAD第一对角支a：' + content.ladfav_prs + '%'
                    }
                    if (content.ladfav_timi) {
                      this.sistiDto[i] = 'LAD第一对角支a：' + content.ladfav_timi
                    }
                  }
                  if (content.sis[i] === 'LAD第二对角支') {
                    if (content.ladsv_tlcs) {
                      this.sisBDto[i] = 'LAD第二对角支：' + content.ladsv_tlcs
                    }
                    if (content.ladsv_cm) {
                      if (content.ladsv_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladsv_cm.hc.length; j++) {
                          this.company = content.ladsv_cm.hc[j] + '-M'
                          this.width = content.ladsv_cm.hc[j] + '-W'
                          this.height = content.ladsv_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladsv_cm.hc[j] + '(' + content.ladsv_cm[this.company] + '，' + content.ladsv_cm[this.width] + '*' + content.ladsv_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD第二对角支：' + this.sisGDto
                      }
                    }
                    if (content.ladsv_prs) {
                      this.sishDto[i] = 'LAD第二对角支：' + content.ladsv_prs + '%'
                    }
                    if (content.ladsv_timi) {
                      this.sistiDto[i] = 'LAD第二对角支：' + content.ladsv_timi
                    }
                  }
                  if (content.sis[i] === 'LAD第二对角支a') {
                    if (content.ladsav_tlcs) {
                      this.sisBDto[i] = 'LAD第二对角支a：' + content.ladsav_tlcs
                    }
                    if (content.ladsav_cm) {
                      if (content.ladsav_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.ladsav_cm.hc.length; j++) {
                          this.company = content.ladsav_cm.hc[j] + '-M'
                          this.width = content.ladsav_cm.hc[j] + '-W'
                          this.height = content.ladsav_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.ladsav_cm.hc[j] + '(' + content.ladsav_cm[this.company] + '，' + content.ladsav_cm[this.width] + '*' + content.ladsav_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LAD第二对角支a：' + this.sisGDto
                      }
                    }
                    if (content.ladsav_prs) {
                      this.sishDto[i] = 'LAD第二对角支a：' + content.ladsav_prs + '%'
                    }
                    if (content.ladsav_timi) {
                      this.sistiDto[i] = 'LAD第二对角支a：' + content.ladsav_timi
                    }
                  }
                  if (content.sis[i] === 'LCX近段') {
                    if (content.lcxn_tlcs) {
                      this.sisBDto[i] = 'LCX近段：' + content.lcxn_tlcs
                    }
                    if (content.lcxn_cm) {
                      if (content.lcxn_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxn_cm.hc.length; j++) {
                          this.company = content.lcxn_cm.hc[j] + '-M'
                          this.width = content.lcxn_cm.hc[j] + '-W'
                          this.height = content.lcxn_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxn_cm.hc[j] + '(' + content.lcxn_cm[this.company] + '，' + content.lcxn_cm[this.width] + '*' + content.lcxn_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX近段：' + this.sisGDto
                      }
                    }
                    if (content.lcxn_prs) {
                      this.sishDto[i] = 'LCX近段：' + content.lcxn_prs + '%'
                    }
                    if (content.lcxn_timi) {
                      this.sistiDto[i] = 'LCX近段：' + content.lcxn_timi
                    }
                  }
                  if (content.sis[i] === 'LCX中段') {
                    if (content.lcxm_tlcs) {
                      this.sisBDto[i] = 'LCX中段：' + content.lcxm_tlcs
                    }
                    if (content.lcxm_cm) {
                      if (content.lcxm_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxm_cm.hc.length; j++) {
                          this.company = content.lcxm_cm.hc[j] + '-M'
                          this.width = content.lcxm_cm.hc[j] + '-W'
                          this.height = content.lcxm_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxm_cm.hc[j] + '(' + content.lcxm_cm[this.company] + '，' + content.lcxm_cm[this.width] + '*' + content.lcxm_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX中段：' + this.sisGDto
                      }
                    }
                    if (content.lcxm_prs) {
                      this.sishDto[i] = 'LCX中段：' + content.lcxm_prs + '%'
                    }
                    if (content.lcxm_timi) {
                      this.sistiDto[i] = 'LCX中段：' + content.lcxm_timi
                    }
                  }
                  if (content.sis[i] === 'LCX远段') {
                    if (content.lcxf_tlcs) {
                      this.sisBDto[i] = 'LCX远段：' + content.lcxf_tlcs
                    }
                    if (content.lcxf_cm) {
                      if (content.lcxf_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxf_cm.hc.length; j++) {
                          this.company = content.lcxf_cm.hc[j] + '-M'
                          this.width = content.lcxf_cm.hc[j] + '-W'
                          this.height = content.lcxf_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxf_cm.hc[j] + '(' + content.lcxf_cm[this.company] + '，' + content.lcxf_cm[this.width] + '*' + content.lcxf_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX远段：' + this.sisGDto
                      }
                    }
                    if (content.lcxf_prs) {
                      this.sishDto[i] = 'LCX远段：' + content.lcxf_prs + '%'
                    }
                    if (content.lcxf_timi) {
                      this.sistiDto[i] = 'LCX远段：' + content.lcxf_timi
                    }
                  }
                  if (content.sis[i] === 'LCX中间支') {
                    if (content.lcxc_tlcs) {
                      this.sisBDto[i] = 'LCX中间支：' + content.lcxc_tlcs
                    }
                    if (content.lcxc_cm) {
                      if (content.lcxc_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxc_cm.hc.length; j++) {
                          this.company = content.lcxc_cm.hc[j] + '-M'
                          this.width = content.lcxc_cm.hc[j] + '-W'
                          this.height = content.lcxc_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxc_cm.hc[j] + '(' + content.lcxc_cm[this.company] + '，' + content.lcxc_cm[this.width] + '*' + content.lcxc_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX中间支：' + this.sisGDto
                      }
                    }
                    if (content.lcxc_prs) {
                      this.sishDto[i] = 'LCX中间支：' + content.lcxc_prs + '%'
                    }
                    if (content.lcxc_timi) {
                      this.sistiDto[i] = 'LCX中间支：' + content.lcxc_timi
                    }
                  }
                  if (content.sis[i] === 'LCX第一钝缘支') {
                    if (content.lcxfv_tlcs) {
                      this.sisBDto[i] = 'LCX第一钝缘支：' + content.lcxfv_tlcs
                    }
                    if (content.lcxfv_cm) {
                      if (content.lcxfv_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxfv_cm.hc.length; j++) {
                          this.company = content.lcxfv_cm.hc[j] + '-M'
                          this.width = content.lcxfv_cm.hc[j] + '-W'
                          this.height = content.lcxfv_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxfv_cm.hc[j] + '(' + content.lcxfv_cm[this.company] + '，' + content.lcxfv_cm[this.width] + '*' + content.lcxfv_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX第一钝缘支：' + this.sisGDto
                      }
                    }
                    if (content.lcxfv_prs) {
                      this.sishDto[i] = 'LCX第一钝缘支：' + content.lcxfv_prs + '%'
                    }
                    if (content.lcxfv_timi) {
                      this.sistiDto[i] = 'LCX第一钝缘支：' + content.lcxfv_timi
                    }
                  }
                  if (content.sis[i] === 'LCX第二钝缘支') {
                    if (content.lcxsv_tlcs) {
                      this.sisBDto[i] = 'LCX第二钝缘支：' + content.lcxsv_tlcs
                    }
                    if (content.lcxsv_cm) {
                      if (content.lcxsv_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxsv_cm.hc.length; j++) {
                          this.company = content.lcxsv_cm.hc[j] + '-M'
                          this.width = content.lcxsv_cm.hc[j] + '-W'
                          this.height = content.lcxsv_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxsv_cm.hc[j] + '(' + content.lcxsv_cm[this.company] + '，' + content.lcxsv_cm[this.width] + '*' + content.lcxsv_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX第二钝缘支：' + this.sisGDto
                      }
                    }
                    if (content.lcxsv_prs) {
                      this.sishDto[i] = 'LCX第二钝缘支：' + content.lcxsv_prs + '%'
                    }
                    if (content.lcxsv_timi) {
                      this.sistiDto[i] = 'LCX第二钝缘支：' + content.lcxsv_timi
                    }
                  }
                  if (content.sis[i] === 'LCX左后侧支') {
                    if (content.lcxl_tlcs) {
                      this.sisBDto[i] = 'LCX左后侧支：' + content.lcxl_tlcs
                    }
                    if (content.lcxl_cm) {
                      if (content.lcxl_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxl_cm.hc.length; j++) {
                          this.company = content.lcxl_cm.hc[j] + '-M'
                          this.width = content.lcxl_cm.hc[j] + '-W'
                          this.height = content.lcxl_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxl_cm.hc[j] + '(' + content.lcxl_cm[this.company] + '，' + content.lcxl_cm[this.width] + '*' + content.lcxl_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX左后侧支：' + this.sisGDto
                      }
                    }
                    if (content.lcxl_prs) {
                      this.sishDto[i] = 'LCX左后侧支：' + content.lcxl_prs + '%'
                    }
                    if (content.lcxl_timi) {
                      this.sistiDto[i] = 'LCX左后侧支：' + content.lcxl_timi
                    }
                  }
                  if (content.sis[i] === 'LCX左后侧支a') {
                    if (content.lcxla_tlcs) {
                      this.sisBDto[i] = 'LCX左后侧支a：' + content.lcxla_tlcs
                    }
                    if (content.lcxla_cm) {
                      if (content.lcxla_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxla_cm.hc.length; j++) {
                          this.company = content.lcxla_cm.hc[j] + '-M'
                          this.width = content.lcxla_cm.hc[j] + '-W'
                          this.height = content.lcxla_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxla_cm.hc[j] + '(' + content.lcxla_cm[this.company] + '，' + content.lcxla_cm[this.width] + '*' + content.lcxla_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX左后侧支a：' + this.sisGDto
                      }
                    }
                    if (content.lcxla_prs) {
                      this.sishDto[i] = 'LCX左后侧支a：' + content.lcxla_prs + '%'
                    }
                    if (content.lcxla_timi) {
                      this.sistiDto[i] = 'LCX左后侧支a：' + content.lcxla_timi
                    }
                  }
                  if (content.sis[i] === 'LCX左后侧支b') {
                    if (content.lcxlb_ltcs) {
                      this.sisBDto[i] = 'LCX左后侧支b：' + content.lcxlb_ltcs
                    }
                    if (content.lcxlb_cm) {
                      if (content.lcxlb_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxlb_cm.hc.length; j++) {
                          this.company = content.lcxlb_cm.hc[j] + '-M'
                          this.width = content.lcxlb_cm.hc[j] + '-W'
                          this.height = content.lcxlb_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxlb_cm.hc[j] + '(' + content.lcxlb_cm[this.company] + '，' + content.lcxlb_cm[this.width] + '*' + content.lcxlb_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX左后侧支b：' + this.sisGDto
                      }
                    }
                    if (content.lcxlb_prs) {
                      this.sishDto[i] = 'LCX左后侧支b：' + content.lcxlb_prs + '%'
                    }
                    if (content.lcxlb_timi) {
                      this.sistiDto[i] = 'LCX左后侧支b：' + content.lcxlb_timi
                    }
                  }
                  if (content.sis[i] === 'LCX左后降支') {
                    if (content.lcxld_ltcs) {
                      this.sisBDto[i] = 'LCX左后降支：' + content.lcxld_ltcs
                    }
                    if (content.lcxld_cm) {
                      if (content.lcxld_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.lcxld_cm.hc.length; j++) {
                          this.company = content.lcxld_cm.hc[j] + '-M'
                          this.width = content.lcxld_cm.hc[j] + '-W'
                          this.height = content.lcxld_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.lcxld_cm.hc[j] + '(' + content.lcxld_cm[this.company] + '，' + content.lcxld_cm[this.width] + '*' + content.lcxld_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'LCX左后降支：' + this.sisGDto
                      }
                    }
                    if (content.lcxld_prs) {
                      this.sishDto[i] = 'LCX左后降支：' + content.lcxld_prs + '%'
                    }
                    if (content.lcxld_timi) {
                      this.sistiDto[i] = 'LCX左后降支：' + content.lcxld_timi
                    }
                  }
                  if (content.sis[i] === 'RCA近段') {
                    if (content.rcan_ltcs) {
                      this.sisBDto[i] = 'RCA近段：' + content.rcan_ltcs
                    }
                    if (content.rcan_cm) {
                      if (content.rcan_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcan_cm.hc.length; j++) {
                          this.company = content.rcan_cm.hc[j] + '-M'
                          this.width = content.rcan_cm.hc[j] + '-W'
                          this.height = content.rcan_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcan_cm.hc[j] + '(' + content.rcan_cm[this.company] + '，' + content.rcan_cm[this.width] + '*' + content.rcan_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA近段：' + this.sisGDto
                      }
                    }
                    if (content.rcan_prs) {
                      this.sishDto[i] = 'RCA近段：' + content.rcan_prs + '%'
                    }
                    if (content.rcan_timi) {
                      this.sistiDto[i] = 'RCA近段：' + content.rcan_timi
                    }
                  }
                  if (content.sis[i] === 'RCA中段') {
                    if (content.rcam_ltcs) {
                      this.sisBDto[i] = 'RCA中段：' + content.rcam_ltcs
                    }
                    if (content.rcam_cm) {
                      if (content.rcam_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcam_cm.hc.length; j++) {
                          this.company = content.rcam_cm.hc[j] + '-M'
                          this.width = content.rcam_cm.hc[j] + '-W'
                          this.height = content.rcam_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcam_cm.hc[j] + '(' + content.rcam_cm[this.company] + '，' + content.rcam_cm[this.width] + '*' + content.rcam_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA中段：' + this.sisGDto
                      }
                    }
                    if (content.rcam_prs) {
                      this.sishDto[i] = 'RCA中段：' + content.rcam_prs + '%'
                    }
                    if (content.rcam_timi) {
                      this.sistiDto[i] = 'RCA中段：' + content.rcam_timi
                    }
                  }
                  if (content.sis[i] === 'RCA远段') {
                    if (content.rcaf_ltcs) {
                      this.sisBDto[i] = 'RCA远段：' + content.rcaf_ltcs
                    }
                    if (content.rcaf_cm) {
                      if (content.rcaf_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcaf_cm.hc.length; j++) {
                          this.company = content.rcaf_cm.hc[j] + '-M'
                          this.width = content.rcaf_cm.hc[j] + '-W'
                          this.height = content.rcaf_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcaf_cm.hc[j] + '(' + content.rcaf_cm[this.company] + '，' + content.rcaf_cm[this.width] + '*' + content.rcaf_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA远段：' + this.sisGDto
                      }
                    }
                    if (content.rcaf_prs) {
                      this.sishDto[i] = 'RCA远段：' + content.rcaf_prs + '%'
                    }
                    if (content.rcaf_timi) {
                      this.sistiDto[i] = 'RCA远段：' + content.rcaf_timi
                    }
                  }
                  if (content.sis[i] === 'RCA右后降支') {
                    if (content.rcard_ltcs) {
                      this.sisBDto[i] = 'RCA右后降支：' + content.rcard_ltcs
                    }
                    if (content.rcard_cm) {
                      if (content.rcard_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcard_cm.hc.length; j++) {
                          this.company = content.rcard_cm.hc[j] + '-M'
                          this.width = content.rcard_cm.hc[j] + '-W'
                          this.height = content.rcard_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcard_cm.hc[j] + '(' + content.rcard_cm[this.company] + '，' + content.rcard_cm[this.width] + '*' + content.rcard_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA右后降支：' + this.sisGDto
                      }
                    }
                    if (content.rcard_prs) {
                      this.sishDto[i] = 'RCA右后降支：' + content.rcard_prs + '%'
                    }
                    if (content.rcard_timi) {
                      this.sistiDto[i] = 'RCA右后降支：' + content.rcard_timi
                    }
                  }
                  if (content.sis[i] === 'RCA右后侧支') {
                    if (content.rcar_ltcs) {
                      this.sisBDto[i] = 'RCA右后侧支：' + content.rcar_ltcs
                    }
                    if (content.rcar_cm) {
                      if (content.rcar_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcar_cm.hc.length; j++) {
                          this.company = content.rcar_cm.hc[j] + '-M'
                          this.width = content.rcar_cm.hc[j] + '-W'
                          this.height = content.rcar_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcar_cm.hc[j] + '(' + content.rcar_cm[this.company] + '，' + content.rcar_cm[this.width] + '*' + content.rcar_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA右后侧支：' + this.sisGDto
                      }
                    }
                    if (content.rcar_prs) {
                      this.sishDto[i] = 'RCA右后侧支：' + content.rcar_prs + '%'
                    }
                    if (content.rcar_timi) {
                      this.sistiDto[i] = 'RCA右后侧支：' + content.rcar_timi
                    }
                  }
                  if (content.sis[i] === 'RCA右后侧支第一分支') {
                    if (content.rcarf_ltcs) {
                      this.sisBDto[i] = 'RCA右后侧支第一分支：' + content.rcarf_ltcs
                    }
                    if (content.rcarf_cm) {
                      if (content.rcarf_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcarf_cm.hc.length; j++) {
                          this.company = content.rcarf_cm.hc[j] + '-M'
                          this.width = content.rcarf_cm.hc[j] + '-W'
                          this.height = content.rcarf_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcarf_cm.hc[j] + '(' + content.rcarf_cm[this.company] + '，' + content.rcarf_cm[this.width] + '*' + content.rcarf_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA右后侧支第一分支：' + this.sisGDto
                      }
                    }
                    if (content.rcarf_prs) {
                      this.sishDto[i] = 'RCA右后侧支第一分支：' + content.rcarf_prs + '%'
                    }
                    if (content.rcarf_timi) {
                      this.sistiDto[i] = 'RCA右后侧支第一分支：' + content.rcarf_timi
                    }
                  }
                  if (content.sis[i] === 'RCA右后侧支第二分支') {
                    if (content.rcars_ltcs) {
                      this.sisBDto[i] = 'RCA右后侧支第二分支：' + content.rcars_ltcs
                    }
                    if (content.rcars_cm) {
                      if (content.rcars_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcars_cm.hc.length; j++) {
                          this.company = content.rcars_cm.hc[j] + '-M'
                          this.width = content.rcars_cm.hc[j] + '-W'
                          this.height = content.rcars_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcars_cm.hc[j] + '(' + content.rcars_cm[this.company] + '，' + content.rcars_cm[this.width] + '*' + content.rcars_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA右后侧支第二分支：' + this.sisGDto
                      }
                    }
                    if (content.rcars_prs) {
                      this.sishDto[i] = 'RCA右后侧支第二分支：' + content.rcars_prs + '%'
                    }
                    if (content.rcars_timi) {
                      this.sistiDto[i] = 'RCA右后侧支第二分支：' + content.rcars_timi
                    }
                  }
                  if (content.sis[i] === 'RCA右后侧支第三分支') {
                    if (content.rcart_ltcs) {
                      this.sisBDto[i] = 'RCA右后侧支第三分支：' + content.rcart_ltcs
                    }
                    if (content.rcart_cm) {
                      if (content.rcart_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.rcart_cm.hc.length; j++) {
                          this.company = content.rcart_cm.hc[j] + '-M'
                          this.width = content.rcart_cm.hc[j] + '-W'
                          this.height = content.rcart_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.rcart_cm.hc[j] + '(' + content.rcart_cm[this.company] + '，' + content.rcart_cm[this.width] + '*' + content.rcart_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = 'RCA右后侧支第三分支：' + this.sisGDto
                      }
                    }
                    if (content.rcart_prs) {
                      this.sishDto[i] = 'RCA右后侧支第三分支：' + content.rcart_prs + '%'
                    }
                    if (content.rcart_timi) {
                      this.sistiDto[i] = 'RCA右后侧支第三分支：' + content.rcart_timi
                    }
                  }
                  if (content.sis[i] === '桥血管近段') {
                    if (content.svbgn_ltcs) {
                      this.sisBDto[i] = '桥血管近段：' + content.svbgn_ltcs
                    }
                    if (content.svbgn_cm) {
                      if (content.svbgn_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.svbgn_cm.hc.length; j++) {
                          this.company = content.svbgn_cm.hc[j] + '-M'
                          this.width = content.svbgn_cm.hc[j] + '-W'
                          this.height = content.svbgn_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.svbgn_cm.hc[j] + '(' + content.svbgn_cm[this.company] + '，' + content.svbgn_cm[this.width] + '*' + content.svbgn_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = '桥血管近段：' + this.sisGDto
                      }
                    }
                    if (content.svbgn_prs) {
                      this.sishDto[i] = '桥血管近段：' + content.svbgn_prs + '%'
                    }
                    if (content.svbgn_timi) {
                      this.sistiDto[i] = '桥血管近段：' + content.svbgn_timi
                    }
                  }
                  if (content.sis[i] === '桥血管中段') {
                    if (content.svbgm_ltcs) {
                      this.sisBDto[i] = '桥血管中段：' + content.svbgm_ltcs
                    }
                    if (content.svbgm_cm) {
                      if (content.svbgm_cm.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.svbgm_cm.hc.length; j++) {
                          this.company = content.svbgm_cm.hc[j] + '-M'
                          this.width = content.svbgm_cm.hc[j] + '-W'
                          this.height = content.svbgm_cm.hc[j] + '-L'
                          this.sisGDto[j] = content.svbgm_cm.hc[j] + '(' + content.svbgm_cm[this.company] + '，' + content.svbgm_cm[this.width] + '*' + content.svbgm_cm[this.height] + ')'
                        }
                        this.sisHDto[i] = '桥血管中段：' + this.sisGDto
                      }
                    }
                    if (content.svbgm_prs) {
                      this.sishDto[i] = '桥血管中段：' + content.svbgm_prs + '%'
                    }
                    if (content.svbgm_timi) {
                      this.sistiDto[i] = '桥血管中段：' + content.svbgm_timi
                    }
                  }
                  if (content.sis[i] === '桥血管远段') {
                    if (content.svbgf_ltcs) {
                      this.sisBDto[i] = '桥血管远段：' + content.svbgf_ltcs
                    }
                    if (content.svbgf_timi) {
                      if (content.svbgf_timi.hc.length > 0) {
                        this.isHC = true
                        for (let j = 0; j < content.svbgf_timi.hc.length; j++) {
                          this.company = content.svbgf_timi.hc[j] + '-M'
                          this.width = content.svbgf_timi.hc[j] + '-W'
                          this.height = content.svbgf_timi.hc[j] + '-L'
                          this.sisGDto[j] = content.svbgf_timi.hc[j] + '(' + content.svbgf_timi[this.company] + '，' + content.svbgf_timi[this.width] + '*' + content.svbgf_timi[this.height] + ')'
                        }
                        this.sisHDto[i] = '桥血管远段：' + this.sisGDto
                      }
                    }
                    if (content.svbgf_prs) {
                      this.sishDto[i] = '桥血管远段：' + content.svbgf_prs + '%'
                    }
                    if (content.svbgf_timi) {
                      this.sistiDto[i] = '桥血管远段：' + content.svbgf_timi
                    }
                  }
                }
              }
            }
          } else {
            this.isPci = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getLabReportRecord () {
        this.$http.get(`${this.$global.api}labReportRecord/get?illnessId=${this.$route.params.id}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.recordDtos = content.recordDtos
              for (let i = 0; i < content.recordDtos.length; i++) {
                for (let j = 0; j < content.recordDtos[i].items.length; j++) {
                  if (content.recordDtos[i].items[j].reference) {
                    this.recordDtos[i].items[j].arrange = content.recordDtos[i].items[j].reference
                  } else if (content.recordDtos[i].items[j].lowerlimit || content.recordDtos[i].items[j].toplimit) {
                    this.recordDtos[i].items[j].arrange = content.recordDtos[i].items[j].lowerlimit + '-' + content.recordDtos[i].items[j].toplimit + content.recordDtos[i].items[j].unit
                  }
                }
              }
              this.imagingReportDtos = content.imagingReportDtos
            }
          } else {
            this.isResult = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getAuxiliaryExamination () {
        this.$http.get(`${this.$global.api}auxiliaryExamination/find/${this.$route.params.id}?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
//              console.log(content)
              for (let i = 0; i < content.ae.length; i++) {
                if (content.ae[i] === '心超') {
                  this.isXC = true
                  if (content.checkedDate) {
                    this.checkedDate = content.checkedDate
                  }
                  if (content.hospitalName) {
                    this.hospitalName2 = content.hospitalName
                  }
                  if (content.ardmetervalue) {
                    this.ardmetervalue = content.ardmetervalue
                  }
                  if (content.ardnormalvalue) {
                    this.ardnormalvalue = content.ardnormalvalue
                  }
                  if (content.ladmetervalue) {
                    this.ladmetervalue = content.ladmetervalue
                  }
                  if (content.ladnormalvalue) {
                    this.ladnormalvalue = content.ladnormalvalue
                  }
                  if (content.lveddmetervalue) {
                    this.lveddmetervalue = content.lveddmetervalue
                  }
                  if (content.lveddnormalvalue) {
                    this.lveddnormalvalue = content.lveddnormalvalue
                  }
                  if (content.lvesdmetervalue) {
                    this.lvesdmetervalue = content.lvesdmetervalue
                  }
                  if (content.lvesdnormalvalue) {
                    this.lvesdnormalvalue = content.lvesdnormalvalue
                  }
                  if (content.lvstmetervalue) {
                    this.lvstmetervalue = content.lvstmetervalue
                  }
                  if (content.lvstnormalvalue) {
                    this.lvstnormalvalue = content.lvstnormalvalue
                  }
                  if (content.lvtmetervalue) {
                    this.lvtmetervalue = content.lvtmetervalue
                  }
                  if (content.lvtnormalvalue) {
                    this.lvtnormalvalue = content.lvtnormalvalue
                  }
                  if (content.ardmetervalue || content.ardnormalvalue || content.ladmetervalue || content.ladnormalvalue || content.lveddmetervalue || content.lveddnormalvalue || content.lvesdmetervalue || content.lvesdnormalvalue || content.lvstmetervalue || content.lvstnormalvalue || content.lvtmetervalue || content.lvtnormalvalue) {
                    this.ismMain = true
                  }
                  this.mMainresult = [
                    {
                      label: '主动脉根部直径（cm）', key: this.ardmetervalue, subKey: this.ardnormalvalue
                    },
                    {
                      label: '左房内径（cm）', key: this.ladmetervalue, subKey: this.ladnormalvalue
                    },
                    {
                      label: '左室舒张末内径（cm）', key: this.lveddmetervalue, subKey: this.lveddnormalvalue
                    },
                    {
                      label: '左室收缩末内径（cm）', key: this.lvesdmetervalue, subKey: this.lvesdnormalvalue
                    },
                    {
                      label: '室间隔厚度（cm）', key: this.lvstmetervalue, subKey: this.lvstnormalvalue
                    },
                    {
                      label: '左室厚壁厚度（cm）', key: this.lvtmetervalue, subKey: this.lvtnormalvalue
                    }]
                  if (content.slightlyitem) {
                    for (let i = 0; i < content.slightlyitem.length; i++) {
                      if (content.slightlyitem[i] === 'Simpson法测量LVEF') {
                        this.isEWCS = true
                        this.isSim = true
                        this.simpsonItem = content.simpsonItem + '%'
                      }
                      if (content.slightlyitem[i] === '肺动脉压力') {
                        this.isEWCS = true
                        this.isFDM = true
                        this.papitem = content.papitem + 'mmHg'
                      }
                      if (content.slightlyitem[i] === '其他') {
                        this.isOtherItem = true
                        this.otherItem = content.otherItem
                      }
                    }
                  }
                  if (content.lvedvmetervalue) {
                    this.lvedvmetervalue = content.lvedvmetervalue
                  }
                  if (content.lvedvnormalvalue) {
                    this.lvedvnormalvalue = content.lvedvnormalvalue
                  }
                  if (content.lvesvmetervalue) {
                    this.lvesvmetervalue = content.lvesvmetervalue
                  }
                  if (content.lvesvnormalvalue) {
                    this.lvesvnormalvalue = content.lvesvnormalvalue
                  }
                  if (content.lvefmetervalue) {
                    this.lvefmetervalue = content.lvefmetervalue
                  }
                  if (content.lvefnormalvalue) {
                    this.lvefnormalvalue = content.lvefnormalvalue
                  }
                  if (content.lvedvmetervalue || content.lvedvnormalvalue || content.lvesvmetervalue || content.lvesvnormalvalue || content.lvefmetervalue || content.lvefnormalvalue) {
                    this.isZXS = true
                  }
                  this.zXSDto = [
                    {
                      label: '左室舒张末容量（ml）', key: this.lvedvmetervalue, subKey: this.lvedvnormalvalue
                    },
                    {
                      label: '左室收缩末容量（ml）', key: this.lvesvmetervalue, subKey: this.lvesvnormalvalue
                    },
                    {
                      label: '左室射血分数LVEF（%）', key: this.lvefmetervalue, subKey: this.lvefnormalvalue
                    }
                  ]
                  if (content.lvwmstatus === '正常') {
                    this.lvwmZC = '正常'
                  } else if (content.lvwmstatus === '异常') {
                    this.lvwmZC = '异常；'
                    for (let i = 0; i < content.lvwmitem.length; i++) {
                      if (content.lvwmitem[i] === '前壁') {
                        if (content.lfwvalue) {
                          this.lfwvalue = '前壁：' + content.lfwvalue + '%；'
                        } else {
                          this.lfwvalue = '前壁：'
                        }
                      }
                      if (content.lvwmitem[i] === '下壁') {
                        if (content.llwvalue) {
                          this.llwvalue = '下壁：' + content.llwvalue + '%；'
                        } else {
                          this.llwvalue = '下壁：'
                        }
                      }
                      if (content.lvwmitem[i] === '后壁') {
                        if (content.latwvalue) {
                          this.latwvalue = '后壁：' + content.latwvalue + '%；'
                        } else {
                          this.latwvalue = '后壁：'
                        }
                      }
                      if (content.lvwmitem[i] === '心尖部') {
                        if (content.lapexvalue) {
                          this.lapexvalue = '心尖部：' + content.lapexvalue + '%；'
                        } else {
                          this.lapexvalue = '心尖部：'
                        }
                      }
                      if (content.lvwmitem[i] === '室间隔') {
                        if (content.lisvalue) {
                          this.lisvalue = '室间隔：' + content.lisvalue + '%；'
                        } else {
                          this.lisvalue = '室间隔：'
                        }
                      }
                      if (content.lvwmitem[i] === '右室') {
                        if (content.lrvvalue) {
                          this.lrvvalue = '右室：' + content.lrvvalue + '%'
                        } else {
                          this.lrvvalue = '右室：'
                        }
                      }
                    }
                  }
                  if (content.rvwmstatus === '正常') {
                    this.rvwmZC = '正常'
                  } else if (content.rvwmstatus === '异常') {
                    this.rvwmZC = '异常；'
                    for (let i = 0; i < content.rvwmitem.length; i++) {
                      if (content.rvwmitem[i] === '前壁') {
                        if (content.rfwvalue) {
                          this.rfwvalue = '前壁：' + content.rfwvalue + '%；'
                        } else {
                          this.rfwvalue = '前壁：'
                        }
                      }
                      if (content.rvwmitem[i] === '下壁') {
                        if (content.rlwvalue) {
                          this.rlwvalue = '下壁：' + content.rlwvalue + '%；'
                        } else {
                          this.rlwvalue = '下壁：'
                        }
                      }
                      if (content.rvwmitem[i] === '后壁') {
                        if (content.ratwvalue) {
                          this.ratwvalue = '后壁：' + content.ratwvalue + '%；'
                        } else {
                          this.ratwvalue = '后壁：'
                        }
                      }
                      if (content.rvwmitem[i] === '心尖部') {
                        if (content.rapexvalue) {
                          this.rapexvalue = '心尖部：' + content.rapexvalue + '%；'
                        } else {
                          this.rapexvalue = '心尖部：'
                        }
                      }
                      if (content.rvwmitem[i] === '室间隔') {
                        if (content.risvalue) {
                          this.risvalue = '室间隔：' + content.risvalue + '%；'
                        } else {
                          this.risvalue = '室间隔：'
                        }
                      }
                      if (content.rvwmitem[i] === '右室') {
                        if (content.rrvvalue) {
                          this.rrvvalue = '右室：' + content.rrvvalue + '%'
                        } else {
                          this.rrvvalue = '右室：'
                        }
                      }
                    }
                  }
                  if (content.viflag === '无') {
                    this.viflag = '无'
                  } else if (content.viflag === '有') {
                    this.viflag = '有'
                    if (content.vic.length > 0) {
                      for (let i = 0; i < content.vic.length; i++) {
                        if (content.vic[i] === '二尖瓣') {
                          if (content.vicmv) {
                            this.vicmv = content.vic[i] + content.vicmv
                          } else {
                            this.vicmv = content.vic[i]
                          }
                        }
                        if (content.vic[i] === '三尖瓣') {
                          if (content.victv) {
                            this.victv = content.vic[i] + content.victv
                          } else {
                            this.victv = content.vic[i]
                          }
                        }
                        if (content.vic[i] === '主动脉瓣') {
                          if (content.vicav) {
                            this.vicav = content.vic[i] + content.vicav
                          } else {
                            this.vicav = content.vic[i]
                          }
                        }
                        if (content.vic[i] === '肺动脉瓣') {
                          if (content.vicpv) {
                            this.vicpv = content.vic[i] + content.vicpv
                          } else {
                            this.vicpv = content.vic[i]
                          }
                        }
                      }
                      this.vicDto = [this.vicmv, this.victv, this.vicav, this.vicpv]
                    }
                    for (let i = 0; i < content.vic.length; i++) {
                      this.vid = content.vid
                    }
                  }
                  if (content.vs === '无') {
                    this.vs = '无'
                  } else if (content.vs === '有') {
                    this.vs = '有'
                    if (content.vsc.length > 0) {
                      for (let i = 0; i < content.vsc.length; i++) {
                        if (content.vsc[i] === '二尖瓣') {
                          if (content.vscmv) {
                            this.vscmv = content.vsc[i] + content.vscmv
                          } else {
                            this.vscmv = content.vsc[i]
                          }
                        }
                        if (content.vsc[i] === '三尖瓣') {
                          if (content.vsctv) {
                            this.vsctv = content.vsc[i] + content.vsctv
                          } else {
                            this.vsctv = content.vsc[i]
                          }
                        }
                        if (content.vsc[i] === '主动脉瓣') {
                          if (content.vscav) {
                            this.vscav = content.vsc[i] + content.vscav
                          } else {
                            this.vscav = content.vsc[i]
                          }
                        }
                        if (content.vsc[i] === '肺动脉瓣') {
                          if (content.vscpv) {
                            this.vscpv = content.vsc[i] + content.vscpv
                          } else {
                            this.vscpv = content.vsc[i]
                          }
                        }
                      }
                      this.vscDto = [this.vscmv, this.vsctv, this.vscav, this.vscpv]
                    }
                    for (let i = 0; i < content.vsc.length; i++) {
                      this.vsc = content.vsc
                    }
                  }
                }
                if (content.ae[i] === '心电图') {
                  this.isXDT = true
                  this.cardiogramItem = content.cardiogramItem
                }
                if (content.ae[i] === '动态心电图') {
                  this.isDTXDT = true
                  this.dcgitem = content.dcgitem
                }
                if (content.ae[i] === '颈部血管超声') {
                  this.isJBXG = true
                  this.cvusitem = content.cvusitem
                }
                if (content.ae[i] === '下肢血管超声') {
                  this.isXZXG = true
                  this.levuitem = content.levuitem
                }
                if (content.ae[i] === '冠脉CTA') {
                  this.isMGCTA = true
                  this.ctaitem = content.ctaitem
                }
              }
            }
          } else {
            this.isCheck = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getPerioperativeEvents () {
        this.$http.get(`${this.$global.api}perioperativeEvents/find/${this.$route.params.id}?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              if (content.mi && content.mi === '是') {
                this.mi = '心肌梗死，'
              } else if (content.mi === '' || content.mi === '否') {
                this.mi = ''
              }
              if (content.cs && content.cs === '是') {
                this.cs = '心源性休克，'
              } else if (content.cs === '' || content.cs === '否') {
                this.cs = ''
              }
              if (content.hf && content.hf === '是') {
                this.hf = '心力衰竭，'
              } else if (content.hf === '' || content.hf === '否') {
                this.hf = ''
              }
              if (content.cat && content.cat === '是') {
                this.cat = '缺血性脑卒中，'
              } else if (content.cat === '' || content.cat === '否') {
                this.cat = ''
              }
              if (content.ha && content.ha === '是') {
                this.ha = '出血性脑卒中，'
              } else if (content.ha === '' || content.ha === '否') {
                this.ha = ''
              }
              if (content.pt && content.pt === '是') {
                this.pt = '心包填塞，'
              } else if (content.pt === '' || content.pt === '否') {
                this.pt = ''
              }
              if (content.cn && content.cn === '是') {
                this.cn = '对比剂肾病，'
              } else if (content.cn === '' || content.cn === '否') {
                this.cn = ''
              }
              if (content.ndd && content.ndd === '是') {
                this.ndd = '新透析需求，'
              } else if (content.ndd === '' || content.ndd === '否') {
                this.ndd = ''
              }
              if (content.ovc && content.ovc === '是') {
                this.ovc = '其他需要处理的血管并发症，'
              } else if (content.ovc === '' || content.ovc === '否') {
                this.ovc = ''
              }
              if (content.cr && content.cr === '是') {
                this.cr = '浓缩红细胞／全血输血，'
              } else if (content.cr === '' || content.cr === '否') {
                this.cr = ''
              }
              if (content.seventytwoh && content.seventytwoh === '是') {
                this.seventytwoh = '72小时内出血，'
              } else if (content.seventytwoh === '' || content.seventytwoh === '否') {
                this.seventytwoh = ''
              }
              if (content.bo && content.bo === '是') {
                this.bo = '出现穿刺部位出血，'
              } else if (content.bo === '' || content.bo === '否') {
                this.bo = ''
              }
              if (content.hs) {
                this.hs = '血肿大小' + content.hs + '，'
              } else if (content.hs === '') {
                this.hs = ''
              }
              if (content.rh && content.rh === '是') {
                this.rh = '后腹膜出血，'
              } else if (content.rh === '' || content.rh === '否') {
                this.rh = ''
              }
              if (content.dtb && content.dtb === '是') {
                this.dtb = '消化道出血，'
              } else if (content.dtb === '' || content.dtb === '否') {
                this.dtb = ''
              }
              if (content.uh && content.uh === '是') {
                this.uh = '泌尿生殖系统出血，'
              } else if (content.uh === '' || content.uh === '否') {
                this.uh = ''
              }
              if (content.ob && content.ob === '是') {
                this.ob = '其他出血，'
              } else if (content.ob === '' || content.ob === '否') {
                this.ob = ''
              }
              if (content.pi && content.pi === '是') {
                this.pi3 = '肺部感染，'
              } else if (content.pi === '' || content.pi === '否') {
                this.pi3 = ''
              }
              if (content.sa && content.sa === '是') {
                this.sa = '严重心律失常'
                if (content.satext) {
                  this.satext = '(' + content.satext + ')'
                } else {
                  this.satext = ''
                }
              } else if (content.sa === '' || content.sa === '否') {
                this.sa = ''
              }
            }
          } else {
            this.isOperate = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getHospitalOutcome () {
        this.$http.get(`${this.$global.api}hospitalOutcome/find/${this.$route.params.id}?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.outcomeName = content.name
            }
          } else {
            this.isOutcome = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getDischargeMedication () {
        this.$http.get(`${this.$global.api}dischargeMedication/find/${this.$route.params.id}?time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.dischargeDto = content
            }
          } else {
            this.isDischarge = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getFlupController () {
        this.$http.get(`${this.$global.oApi}api/flup/find?userId=${this.$route.params.userId}&doctorId=${this.token['parameter1']}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.doctorName = content.doctorName
              this.planDate = content.planDate
              this.flupItemDtoList = content.flupItems
            }
          } else {
            this.isFlup = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = err
        })
      },
      getOtherFlupController () {
        this.$http.get(`${this.$global.oApi}api/flup/findOthers?userId=${this.$route.params.userId}&doctorId=${this.token['parameter1']}&time=${new Date().getTime()}`).then(res => {
          if (res.data && res.data.code === 0 && res.data.data) {
            let content = res.data.data
            if (content.length === 0) {
              console.log('数据为空')
            } else {
              this.otherFlupList = content
            }
          } else {
            this.isOtherFlup = false
          }
        }).catch(err => {
          this.isErrorMsg = true
          this.errorMsg = '啊哦，服务器接口出错了'
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/css/global';
  @import './case';

  #case-detail {
    color: #666;
    .tab-table {
      padding: 20px;
    }
    .tab-table .el-table {
      margin-bottom: 30px;
    }
  }

  .ssjl {
    font-size: 16px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    margin-left: -15px;
    margin-right: -15px;
    margin-bottom: 5px;
    background-color: #eee;
  }

  .ssjl-info {
    margin-bottom: 10px;
  }

  .result {
    > h1 {
      text-align: center;
      color: $color-text-primary;
      margin: 20px 0;
    }
    max-width: 1000px;
    margin: 15px auto;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .result-edit {
      color: #fff;
      margin-top: 5px;
      background: $color-primary;
      > span {
        padding-left: 15px;
        font-size: 16px;
        line-height: 56px;
      }
      button {
        margin: 10px 30px;
        background: #fff;
        color: $color-primary;
      }
    }
    .result-info {
      padding: 8px 15px;
      font-size: 14px;
      li {
        padding: 5px;
      }
    }
    .report-result {
      padding: 15px;
    }
  }
</style>
