<template>
    <div>
      <div style="padding: 5px;">
        <span>统计时间周期：</span>
  <el-date-picker
      size="mini"
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="请选择"
      end-placeholder="请选择"
      @change="handleDateChange()"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
    <el-divider direction="vertical"></el-divider>
    <span>邮箱域名数量：<el-tag size="mini">{{domainNum}}</el-tag>个</span>
    <el-divider direction="vertical"></el-divider>
      <span>邮件端口数量：<el-tag size="mini">{{portNum}}</el-tag>个</span>
      </div>
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
    <span>邮件服务基本情况</span>
  </div>
  <el-row>
    <el-col
    :span="16"
    v-loading="domainLoading"
    element-loading-spinner="el-icon-loading">
    <el-col :span="8">
      <!-- 饼图-->
          <div
          class="canvas" id="firstChart"/>
    </el-col>
    <el-col :span="8">
      <div
          class="canvas" id="countryChart"/>
    </el-col>
    <el-col :span="8">
      <div class="canvas" id="typeChart"/>
    </el-col>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="7">
      <b>说明：</b><br>
      <em>1.自建服务：邮件服务器由域名所有者自行维护；</em><br>
      <em>2.租用服务：租用邮箱运营商的服务，邮件服务器由运营商维护；</em><br>
      <em>3.境内/境外服务：根据邮件服务器端口证书国别字段区分；</em><br>
      <em>4.邮件服务用户类型：按域名分类，gov.cn——政府类、edu.cn——教育类、其他。</em>
    </el-col>
  </el-row>
      </el-card>
      <el-row>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>邮箱域名备案情况</span>
            </div>

      <el-row>
        <el-col v-loading="icpLoading"
    element-loading-spinner="el-icon-loading" :span="16">
          <el-col :span="12">
            <!-- 柱状图-->
            <div class="canvas" id="ICPChart"/>
          </el-col>
          <el-col :span="12">
            <!-- 柱状图-->
            <div class="canvas" id="ICPCityChart"/>
          </el-col>
        </el-col>
        <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="7">
      <b>说明：</b><br>
      <em>备案地域按照网站备案许可证号中的省份简称进行判断。</em>
    </el-col>
      </el-row>
      </el-card>
      </el-row>
          <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>SPF/DMARC协议部署情况</span>
        </div>
        <el-row>
          <el-col v-loading="singleLoading"
    element-loading-spinner="el-icon-loading" :span="16">
            <el-col :span="12">
              <!-- 饼图-->
          <div class="canvas" id="secondChart"/>
            </el-col>
            <el-col :span="12">
              <div class="canvas" id="singleDmarcChart"/>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-loading="renderLoading"
    element-loading-spinner="el-icon-loading" :span="16">
            <el-col :span="12">
              <!-- 饼图-->
          <div class="canvas" id="renderChart"/>
            </el-col>
            <el-col :span="12">
              <div class="canvas" id="renderDmarcChart"/>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-loading="govProtocolLoading"
    element-loading-spinner="el-icon-loading" :span="16">
            <el-col :span="12">
              <!-- 饼图-->
          <div class="canvas" id="govSpfChart"/>
            </el-col>
            <el-col :span="12">
              <div class="canvas" id="govDmarcChart"/>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-loading="eduProtocolLoading"
    element-loading-spinner="el-icon-loading" :span="16">
            <el-col :span="12">
              <!-- 饼图-->
          <div class="canvas" id="eduSpfChart"/>
            </el-col>
            <el-col :span="12">
              <div class="canvas" id="eduDmarcChart"/>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
          <el-card shadow="hover">
        <div slot="header" class="clearfix">
    <span>邮件服务安全性评级</span>
  </div>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <div class="canvas" id="judgeChart"/>
      </el-col>
      <el-col :span="12">
        <div class="canvas" id="renderJudgeChart"/>
      </el-col>
    </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
      <el-col :span="12">
        <div class="canvas" id="govJudgeChart"/>
      </el-col>
      <el-col :span="12">
        <div class="canvas" id="eduJudgeChart"/>
      </el-col>
    </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <p style="text-align: center;color:grey;font-size: 14px;">评级前二十邮件服务</p>
        <el-table
    :data="tableData"
    height="200"
    border
    style="width: 100%">
    <el-table-column
      prop="domain"
      label="域名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="owner"
      label="所有者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="score"
      label="评级">
    </el-table-column>
  </el-table>
      </el-col>
    </el-row>
      </el-card>
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
    <span>邮件服务证书安全性分析</span>
  </div>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certChart"/>
      </el-col>
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certSingleKeySizeLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certSingleKeySize"/>
      </el-col>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certSingleAlgoLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certSingleAlgo"/>
      </el-col>
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certSingleIssuerLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certSingleIssuer"/>
      </el-col>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certSingleExpirLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certSingleExpir"/>
      </el-col>
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certSingleDVLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certSingleDV"/>
      </el-col>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certRenderLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certRenderChart"/>
      </el-col>
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certRenderKeySizeLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certRenderKeySize"/>
      </el-col>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certRenderAlgoLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certRenderAlgo"/>
      </el-col>
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certRenderIssuerLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certRenderIssuer"/>
      </el-col>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certRenderExpirLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certRenderExpir"/>
      </el-col>
      <el-col :span="12">
        <!-- 饼图-->
          <div v-loading="certRenderDVLoading"
    element-loading-spinner="el-icon-loading"class="canvas" id="certRenderDV"/>
      </el-col>
    </el-col>
  </el-row>
      </el-card>
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
    <span>邮件服务加密套件安全性分析</span>
  </div>
  <el-row>
    <el-col :span="16">
      <el-col :span="8">
      <!-- 饼图-->
          <div
          class="canvas" id="suiteChart"/>
    </el-col>
    <el-col :span="8">
      <div
          class="canvas" id="singleWeakSuiteChart"/>
    </el-col>
    <el-col :span="8">
      <div class="canvas" id="singleHrtbldChart"/>
    </el-col>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <el-col :span="8">
      <!-- 饼图-->
          <div
          class="canvas" id="renderSuiteChart"/>
    </el-col>
    <el-col :span="8">
      <div
          class="canvas" id="renderWeakSuiteChart"/>
    </el-col>
    <el-col :span="8">
      <div class="canvas" id="renderHrtbldChart"/>
    </el-col>
    </el-col>
  </el-row>
      </el-card>
          <el-card shadow="hover">
        <div slot="header" class="clearfix">
    <span>邮件服务端口加密情况分析</span>
  </div>
  <el-row>
    <el-col :span="16">
      <el-col :span="12">
        <div v-loading="portLoading"
    element-loading-spinner="el-icon-loading" style="height: 300px;" id="portChart"/>
      </el-col>
      <el-col :span="12">
        <div v-loading="renderPortLoading"
    element-loading-spinner="el-icon-loading" style="height: 300px;" id="renderPortChart"/>
      </el-col>
    </el-col>
  </el-row>
      </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{
      domainNum:0,
      portNum:0,
      dateRange:['2020-08-26','2030-08-28'],
      govProtocolLoading:true,
      eduProtocolLoading:true,
      domainLoading:true,
      icpLoading:true,
      singleLoading:true,
      renderLoading:true,
      tlsLoading:true,
      portLoading:true,
      certLoading:true,
      certSingleAlgoLoading:true,
      certSingleExpirLoading:true,
      certSingleDVLoading:true,
      certSingleKeySizeLoading:true,
      certSingleIssuerLoading:true,
      certRenderDVLoading:true,
      certRenderIssuerLoading:true,
      certRenderExpirLoading:true,
      certRenderKeySizeLoading:true,
      certRenderLoading:true,
      certRenderAlgoLoading:true,
      tableData: [],
      typeOption:{
        title:[{
          subtext:'邮件服务用户类型',
          left:'50%',
          top:'80%',
          textAlign:'center'
        }],
        legend:{
          left:"center"
        },
        series:[{
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: [],
          animation: false,
          label: {
            position: 'inner',
            alignTo: 'edge',
            margin: 20,
            formatter: '{d}%'
          },
          left: '50%',
          right: 0,
          top: 0,
          bottom: 0
        }],
        tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
      },
      countryOption:{
        title:[{
          subtext: '境内/境外服务',
          left: '50%',
          top: '80%',
          textAlign: 'center'
        }],
        legend:{
          left:"center"
        },
        series:[{
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: [],
          animation: false,
          label: {
            position: 'inner',
            alignTo: 'edge',
            margin: 20,
            formatter: '{d}%'
          },
          left: '50%',
          right: 0,
          top: 0,
          bottom: 0
        }],
        tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
      },
      mailDomainOption:{
        title: [{
          subtext: '自建/商业服务',
          left: '50%',
          top: '80%',
          textAlign: 'center'
        }],
        legend: {
        left: 'center'
    },
    series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        },
        left: 0,
        right: '66.6667%',
        top: 0,
        bottom: 0,
            data: [{
              name:'自建服务',
              value:400},{
                name:'商业服务',
              value:234
              }]
          }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        singleOption:{
          title: [{
            text: '自建邮件服务',
            textAlign: 'left',
          },{
            subtext: 'SPF配置情况',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
        legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
    },
          series: [{
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [{
          name: '未配置',
    value: 70
}, {
    name: '-all策略',
    value: 68
},{
    name: '~all策略',
    value: 68
},{
    name: '格式错误',
    value: 68
}],
        animation: false,
        label: {
            position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        }
    }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        singleDmarcOption:{
          title: [{
          subtext: 'DMARC配置情况',
          left: '50%',
          top: '85%',
          textAlign: 'center'
        }],
        legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
    },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        },
            data: [{
              name:'未配置',
              value:400},{
                name:'格式错误',
              value:234
              },{
                name:'配置无效',
              value:234
              },{
                name:'未配置邮箱',
              value:234
              },{
                name:'正确有效',
              value:234
              }]
          }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        renderOption:{
          title: [
          {
            text:'商业邮件服务',
            textAlign:'left'
          },
          {
            subtext: 'SPF配置情况',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          series: [{
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [{
          name: '未配置',
    value: 70
}, {
    name: '-all策略',
    value: 68
},{
    name: '~all策略',
    value: 68
},{
    name: '-格式错误',
    value: 68
}],
        animation: false,
        label: {
            position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        }
    }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          },
          legend:{
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          }
        },
        renderDmarcOption:{
          legend:{
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          title: [{
          subtext: 'DMARC配置情况',
          left: '50%',
          top: '85%',
          textAlign: 'center'
        }],
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        },
            data: [{
              name:'未配置',
              value:400},{
                name:'格式错误',
              value:234
              },{
                name:'配置无效',
              value:234
              },{
                name:'未配置邮箱',
              value:234
              },{
                name:'正确有效',
              value:234
              }]
          }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        govSpfOption:{
          title: [{
            text: '政府类邮件服务',
            textAlign: 'left',
          },{
            subtext: 'SPF配置情况',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
        legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
    },
          series: [{
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [{
          name: '未配置',
    value: 70
}, {
    name: '-all策略',
    value: 68
},{
    name: '~all策略',
    value: 68
},{
    name: '格式错误',
    value: 68
}],
        animation: false,
        label: {
            position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        }
    }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        govDmarcOption:{
          title: [{
          subtext: 'DMARC配置情况',
          left: '50%',
          top: '85%',
          textAlign: 'center'
        }],
        legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
    },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        },
            data: [{
              name:'未配置',
              value:400},{
                name:'格式错误',
              value:234
              },{
                name:'配置无效',
              value:234
              },{
                name:'未配置邮箱',
              value:234
              },{
                name:'正确有效',
              value:234
              }]
          }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        eduSpfOption:{
          title: [{
            text: '教育类邮件服务',
            textAlign: 'left',
          },{
            subtext: 'SPF配置情况',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
        legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
    },
          series: [{
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [{
          name: '未配置',
    value: 70
}, {
    name: '-all策略',
    value: 68
},{
    name: '~all策略',
    value: 68
},{
    name: '格式错误',
    value: 68
}],
        animation: false,
        label: {
            position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        }
    }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        eduDmarcOption:{
          title: [{
          subtext: 'DMARC配置情况',
          left: '50%',
          top: '85%',
          textAlign: 'center'
        }],
        legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
    },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
        },
            data: [{
              name:'未配置',
              value:400},{
                name:'格式错误',
              value:234
              },{
                name:'配置无效',
              value:234
              },{
                name:'未配置邮箱',
              value:234
              },{
                name:'正确有效',
              value:234
              }]
          }],
          tooltip: {
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        ICPOption:{
          title: [{
            subtext: '是否备案（比例）',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['已备案', '未备案']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['政府类', '教育类', '其它']
    },
    series: [
        {
            name: '已备案',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data:[]
        },
        {
            name: '未备案',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data:[]
        }
      ]
},
ICPCityOption:{
  title:[{
    subtext: '备案地域分布（比例）',
    left: '50%',
    top: '85%',
    textAlign: 'center'
  }],
  tooltip:{
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: []
  },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['政府类', '教育类', '其它']
    },
    series: [
        {
            name: '已备案',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data:[220, 182,220]
        },
        {
            name: '未备案',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data:[182, 182,220]
        }
      ]
},
        portOption:{
          title:{
            subtext: '自建服务端口加密情况',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
              data: ['成功', '失败']
          },
          grid: {
              left: '5%',
              right: '4%',
              bottom: '11%',
              containLabel: true
          },
          xAxis: {
              type: 'value'
          },
          yAxis: {
              type: 'category',
              data: ['25', '465', '587', '110', '995', '143', '993']
          },
          series: [
              {
                  name: '成功',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      show: true,
                      position: 'insideLeft'
                  },
                  data: [10, 10, 301, 334, 390, 330, 320]
              },
              {
                  name: '失败',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      show: true,
                      position: 'insideLeft'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
              }
          ]
        },
        renderPortOption:{
          title:{
            subtext: '商业服务端口加密情况',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
              data: ['成功', '失败']
          },
          grid: {
              left: '0%',
              right: '4%',
              bottom: '11%',
              containLabel: true
          },
          xAxis: {
              type: 'value'
          },
          yAxis: {
              type: 'category',
              data: ['25', '465', '587', '110', '995', '143', '993']
          },
          series: [
              {
                  name: '成功',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      show: true,
                      position: 'insideLeft'
                  },
                  data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                  name: '失败',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      show: true,
                      position: 'insideLeft'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
              }
          ]
        },
        suiteOption:{
          title: [{
            subtext: 'TLS版本',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }, {
            text: '自建邮件服务',
            textAlign: 'left'
          }],
          legend: {
            orient: 'vertical',
            right: -5,
            top: 20,
            bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        singleWeakSuiteOption:{
          title: [{
            subtext: '不安全套件',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left:"center"
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
            },
            left: 0,
            right: '66.6667%',
            top: 0,
            bottom: 0,
            data: [{
              name:'支持不安全套件',
              value:400
            },{
              name:'不支持',
              value:234
            }]
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        singleHrtbldOption:{
          title: [{
            subtext: 'heartbleed漏洞',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left:'center'
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: '有heartbleed漏洞',
              value: 70
            }, {
              name: '无',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'edge',
                margin: 20,
                formatter: '{d}%'
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        renderSuiteOption:{
          title: [{
            subtext: 'TLS版本',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }, {
            text: '商业邮件服务',
            textAlign: 'left'
          }],
          legend: {
            orient: 'vertical',
            right: -5,
            top: 20,
            bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        renderWeakSuiteOption:{
          title: [{
            subtext: '不安全套件',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left:"center"
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
            },
            left: 0,
            right: '66.6667%',
            top: 0,
            bottom: 0,
            data: [{
              name:'支持不安全套件',
              value:400
            },{
              name:'不支持',
              value:234
            }]
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        renderHrtbldOption:{
          title: [{
            subtext: 'heartbleed漏洞',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left:'center'
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: '有heartbleed漏洞',
              value: 70
            }, {
              name: '无',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'edge',
                margin: 20,
                formatter: '{d}%'
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certOption:{
          title: [{
            subtext: '证书链长度',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }, {
            text: '自建邮件服务',
            textAlign: 'left'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: '自签名',
              value: 70
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            }
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certSingleKeySizeOption:{
          title: [{
            subtext: '密钥长度',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
            },
            left: 0,
            right: '66.6667%',
            top: 0,
            bottom: 0,
            data: [{
              name:'2048',
              value:400
            },{
              name:'4096',
              value:234
            },{
              name:'1024',
              value:400
            },{
              name:'其它',
              value:400
            }]
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certSingleAlgoOption:{
          title: [{
            subtext: '签名算法',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: 'SHA256-RSA',
              value: 70
            }, {
              name: 'MD5-RSA',
              value: 68
            },{
              name: 'SHA1-RSA',
              value: 70
            }, {
              name: 'ECDSA-SHA256',
              value: 68
            },{
              name: 'SHA384-RSA',
              value: 68
            },{
              name: 'SHA512-RSA',
              value: 70
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'edge',
                margin: 20,
                formatter: '{d}%'
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certSingleIssuerOption:{
          title: [{
            subtext: '证书颁发者',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certSingleExpirOption:{
          title: [{
            subtext: '证书有效期',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
            },
            left: 0,
            right: '66.6667%',
            top: 0,
            bottom: 0,
            data: [{
              name: '过期证书',
              value: 216
            }, {
              name: '有效证书',
              value: 838
            }]
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certSingleDvOption:{
          title: [{
            subtext: '证书审核类型',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: 'DV',
              value: 1216
            }, {
              name: 'OV或EV',
              value: 838
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'edge',
                margin: 20,
                formatter: '{d}%'
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certRenderOption:{
          title: [{
            subtext: '证书链长度',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }, {
            text: '商业邮件服务',
            textAlign: 'left'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: '自签名',
              value: 70
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            }
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certRenderKeySizeOption:{
          title: [{
            subtext: '密钥长度',
            left: '50%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
            },
            left: 0,
            right: '66.6667%',
            top: 0,
            bottom: 0,
            data: [{
              name:'2048',
              value:400
            },{
              name:'4096',
              value:234
            },{
              name:'1024',
              value:400
            },{
              name:'其它',
              value:400
            }]
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certRenderAlgoOption:{
          title: [{
            subtext: '签名算法',
            left: '41.67%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['41.67%', '55%'],
            data: [{
              name: 'SHA256-RSA',
              value: 70
            }, {
              name: 'MD5-RSA',
              value: 68
            },{
              name: 'SHA1-RSA',
              value: 70
            }, {
              name: 'ECDSA-SHA256',
              value: 68
            },{
              name: 'SHA384-RSA',
              value: 68
            },{
              name: 'SHA512-RSA',
              value: 70
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'edge',
                margin: 20,
                formatter: '{d}%'
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certRenderIssuerOption:{
          title: [{
            subtext: '证书颁发者',
            left: '58.33%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certRenderExpirOption:{
          title: [{
            subtext: '证书有效期',
            left: '75%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            animation: false,
            label: {
              position: 'inner',
              alignTo: 'none',
              bleedMargin: 5,
              formatter: '{d}%'
            },
            data: [{
              name: '过期证书',
              value: 216
            }, {
              name: '有效证书',
              value: 838
            }]
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        certRenderDvOption:{
          title: [{
            subtext: '证书审核类型',
            left: '91.67%',
            top: '85%',
            textAlign: 'center'
          }],
          legend: {
            orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            data: [{
              name: 'DV',
              value: 1216
            }, {
              name: 'OV或EV',
              value: 838
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'edge',
                margin: 20,
                formatter: '{d}%'
            },
            left: '66.6667%',
            right: 0,
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        judgeOption:{
          title: [{
            subtext: '自建邮件服务评级',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left: 'center'
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        renderJudgeOption:{
          title: [{
            subtext: '商业邮件服务评级',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left: 'center'
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        govJudgeOption:{
          title: [{
            subtext: '政府类邮件服务评级',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left: 'center'
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            }
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
        eduJudgeOption:{
          title: [{
            subtext: '教育类邮件服务评级',
            left: '50%',
            top: '80%',
            textAlign: 'center'
          }],
          legend: {
            left: 'center'
          },
          series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [{
              name: 'TLSv1.0',
              value: 70
            },{
              name: 'TLSv1.1',
              value: 70
            }, {
              name: 'TLSv1.2',
              value: 68
            }],
            animation: false,
            label: {
                position: 'inner',
                alignTo: 'none',
                bleedMargin: 5,
                formatter: '{d}%'
            },
            left: '33.3333%',
            right: '33.3333%',
            top: 0,
            bottom: 0
          }],
          tooltip:{
            formatter: '{b} : {c} ({d}%)',// 默认值null，内容格式器
          }
        },
    }
  },
  methods:{
    handleDateChange(){
      this.getPort()
    },
    getDateRange(){
      this.$axios
          .get('/dns/date')
          .then(successResponse => {
            this.dateRange=[]
            this.dateRange.push(successResponse.data['beginDate'])
            this.dateRange.push(successResponse.data['endDate'])
            this.domainNum=successResponse.data['domainNum']
          })
          .catch(failResponse => {
            this.$message.error("获取时间范围失败！")
          })
    },
    getGovProtocol(){
      this.$axios
        .get('/dns/gov_spf',{  //params参数必写 , 如果没有参数传{}也可以
          params: {
            "beginDate": this.dateRange[0],
            "endDate": this.dateRange[1]
          }
        })
        .then(successResponse => {
          this.govSpfOption.series[0].data[0].value=successResponse.data.nonSPF;
          this.govSpfOption.series[0].data[1].value=successResponse.data.reject;
          this.govSpfOption.series[0].data[2].value=successResponse.data.soft_reject;
          this.govSpfOption.series[0].data[3].value=successResponse.data.wrong;
          let govSpfChart = echarts.init(document.getElementById('govSpfChart'));
          govSpfChart.setOption(this.govSpfOption);
        })
        .catch(failResponse => {
          this.$message.error("连接失败！")
        })
      this.$axios
        .get('/dns/gov_dmarc',{  //params参数必写 , 如果没有参数传{}也可以
          params: {
            "beginDate": this.dateRange[0],
            "endDate": this.dateRange[1]
          }
        })
        .then(successResponse => {
          this.govDmarcOption.series[0].data[0].value=successResponse.data.nonDMARC;
          this.govDmarcOption.series[0].data[1].value=successResponse.data.wrong;
          this.govDmarcOption.series[0].data[2].value=successResponse.data.no_action;
          this.govDmarcOption.series[0].data[3].value=successResponse.data.null_mail;
          this.govDmarcOption.series[0].data[4].value=successResponse.data.correct;
          // 基于准备好的dom，初始化echarts实例
          let govDmarcChart = echarts.init(document.getElementById('govDmarcChart'));
          govDmarcChart.setOption(this.govDmarcOption);
          this.govProtocolLoading=false
        })
        .catch(failResponse => {
          console.log(failResponse)
          this.$message.error("连接失败！")
        })
    },
    getEduProtocol(){
      this.$axios
        .get('/dns/edu_spf',{  //params参数必写 , 如果没有参数传{}也可以
          params: {
            "beginDate": this.dateRange[0],
            "endDate": this.dateRange[1]
          }
        })
        .then(successResponse => {
          this.eduSpfOption.series[0].data[0].value=successResponse.data.nonSPF;
          this.eduSpfOption.series[0].data[1].value=successResponse.data.reject;
          this.eduSpfOption.series[0].data[2].value=successResponse.data.soft_reject;
          this.eduSpfOption.series[0].data[3].value=successResponse.data.wrong;
          let eduSpfChart = echarts.init(document.getElementById('eduSpfChart'));
          eduSpfChart.setOption(this.eduSpfOption);
        })
        .catch(failResponse => {
          this.$message.error("连接失败！")
        })
      this.$axios
        .get('/dns/edu_dmarc',{  //params参数必写 , 如果没有参数传{}也可以
          params: {
            "beginDate": this.dateRange[0],
            "endDate": this.dateRange[1]
          }
        })
        .then(successResponse => {
          this.eduDmarcOption.series[0].data[0].value=successResponse.data.nonDMARC;
          this.eduDmarcOption.series[0].data[1].value=successResponse.data.wrong;
          this.eduDmarcOption.series[0].data[2].value=successResponse.data.no_action;
          this.eduDmarcOption.series[0].data[3].value=successResponse.data.null_mail;
          this.eduDmarcOption.series[0].data[4].value=successResponse.data.correct;
          // 基于准备好的dom，初始化echarts实例
          let eduDmarcChart = echarts.init(document.getElementById('eduDmarcChart'));
          eduDmarcChart.setOption(this.eduDmarcOption);
          this.eduProtocolLoading=false
        })
        .catch(failResponse => {
          console.log(failResponse)
          this.$message.error("连接失败！")
        })
    },
    getPort(){
      this.$axios
          .get('/port/handshake', {  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            let data=successResponse.data;
            this.portNum=successResponse.data['portNum']
            this.portOption.series[0].data=[
            data["p25"],
            data["p465"],
            data["p587"],
            data["p110"],
            data["p995"],
            data["p143"],
            data["p993"]
            ]
            this.portOption.series[1].data=[
            data["f25"],
            data["f465"],
            data["f587"],
            data["f110"],
            data["f995"],
            data["f143"],
            data["f993"]
            ]
            // 基于准备好的dom，初始化echarts实例
        let portChart = echarts.init(document.getElementById('portChart'));
        portChart.setOption(this.portOption);
        this.portLoading=false
        })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message.error("连接失败！")
          })
    },
    getRenderPort(){
      let renderPortChart = echarts.init(document.getElementById('renderPortChart'));
        renderPortChart.setOption(this.renderPortOption);
        this.renderPortLoading=false
    },
    getType(){
      this.$axios
          .get('/dns/type', {  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            this.typeOption.series[0].data=[]
            for(var key in successResponse.data){
              if(key=="gov"){
                this.typeOption.series[0].data.push({
                name:"政府类",
                value:successResponse.data[key]
              })
              }else if(key=="edu"){
                this.typeOption.series[0].data.push({
                name:"教育类",
                value:successResponse.data[key]
              })
              }else{
                this.typeOption.series[0].data.push({
                name:"其它",
                value:successResponse.data["other"]
              })
              }
            }
            // 基于准备好的dom，初始化echarts实例
            let typeChart = echarts.init(document.getElementById('typeChart'));
            // 绘制图表，this.echarts1_option是数据
            typeChart.setOption(this.typeOption);
            this.domainLoading=false
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message.error("获取域名国别出错！")
          })
    },
    getIcp(){
      this.$axios
          .get('/icp/has_icp',{  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            var data=successResponse.data;
            this.ICPOption.series[0].data.push((data.gov_has_icp/(data.gov_has_icp+data.gov_no_icp)).toFixed(2));
            this.ICPOption.series[0].data.push((data.edu_has_icp/(data.edu_has_icp+data.edu_no_icp)).toFixed(2));
            this.ICPOption.series[0].data.push((data.other_has_icp/(data.other_has_icp+data.other_no_icp)).toFixed(2));
            this.ICPOption.series[1].data.push(data.gov_no_icp/(data.gov_no_icp+data.gov_has_icp).toFixed(2));
            this.ICPOption.series[1].data.push((data.edu_no_icp/(data.edu_has_icp+data.edu_no_icp)).toFixed(2));
            this.ICPOption.series[1].data.push((data.other_no_icp/(data.other_has_icp+data.other_no_icp)).toFixed(2));
            // 基于准备好的dom，初始化echarts实例
            console.log(this.ICPOption);
        let ICPChart = echarts.init(document.getElementById('ICPChart'));
        ICPChart.setOption(this.ICPOption);
        this.icpLoading=false
        })
          .catch(failResponse => {
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/icp/city',{  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            var data=successResponse.data;
            var cityObject={}
            var govSum=0,eduSum=0,otherSum=0;
              for(var city in data['gov']){
                govSum+=data['gov'][city]
              }
              for(var city in data['edu']){
                eduSum+=data['edu'][city]
              }
              for(var city in data['other']){
                otherSum+=data['other'][city]
              }
            for(var key in data){
              for(var city in data[key]){
                var cityArray=[]
                if(city in cityObject){
                  continue;
                }
                if(city in data["gov"]){
                  cityArray.push((data["gov"][city]/govSum).toFixed(2))
                }else{
                  cityArray.push(0)
                }
                if(city in data["edu"]){
                  cityArray.push((data["edu"][city]/eduSum).toFixed(2))
                }else{
                  cityArray.push(0)
                }
                if(city in data["other"]){
                  cityArray.push((data["other"][city]/otherSum).toFixed(2))
                }else{
                  cityArray.push(0)
                }
                cityObject[city]=cityArray;
              }
            }
            this.ICPCityOption.series=[]
            for(var key in cityObject){
              this.ICPCityOption.series.push({
                type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
                name:key.split('"')[1],
                data:cityObject[key]
              })
              if(key in this.ICPCityOption.legend.data){
                continue
              }
              this.ICPCityOption.legend.data.push(key.split('"')[1])
            }
            // 基于准备好的dom，初始化echarts实例
        let ICPCityChart = echarts.init(document.getElementById('ICPCityChart'));
        ICPCityChart.setOption(this.ICPCityOption);
        this.icpLoading=false;
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message.error("连接失败！")
          })
    },
    getCert(){
      this.$axios
          .get('/cert/depth')
          .then(successResponse => {
            this.certOption.series[0].data=[]
            for(var key in successResponse.data){
              this.certOption.series[0].data.push({
                name:key,
                value:successResponse.data[key]
              })
            }
        let certChart = echarts.init(document.getElementById('certChart'));
        certChart.setOption(this.certOption);
        })
          .catch(failResponse => {
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/cert/key_size')
          .then(successResponse => {
            this.certSingleKeySizeOption.series[0].data=[]
            for(var key in successResponse.data){
              this.certSingleKeySizeOption.series[0].data.push({
                name:key,
                value:successResponse.data[key]
              })
            }
            // 基于准备好的dom，初始化echarts实例
        let certSingleKeySize = echarts.init(document.getElementById('certSingleKeySize'));
        certSingleKeySize.setOption(this.certSingleKeySizeOption);
          })
          .catch(failResponse => {
            console.log(failResponse);
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/cert/sign_algorithm')
          .then(successResponse => {
            var data=this.certSingleAlgoOption.series[0].data;
            for(var i=0;i< data.length;i++){
              switch (data[i].name) {
                case 'SHA256-RSA':
                data[i].value=successResponse.data["sha256WithRSAEncryption"]
                break;
                case 'SHA512-RSA':
                data[i].value=successResponse.data["sha512WithRSAEncryption"]
                break;
                case 'SHA384-RSA':
                data[i].value=successResponse.data["sha384WithRSAEncryption"]
                break;
                case 'SHA1-RSA':
                data[i].value=successResponse.data["sha1WithRSAEncryption"]
                break;
                case 'MD5-RSA':
                data[i].value=successResponse.data["md5WithRSAEncryption"]
                break;
                case 'ECDSA-SHA256':
                data[i].value=successResponse.data["ecdsa-with-SHA256"]
                }

            }
            // 基于准备好的dom，初始化echarts实例
        let certSingleAlgo = echarts.init(document.getElementById('certSingleAlgo'));
        certSingleAlgo.setOption(this.certSingleAlgoOption);
          })
          .catch(failResponse => {
            console.log(failResponse);
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/cert/issuer')
          .then(successResponse => {
            this.certSingleIssuerOption.series[0].data=[]
            for(var key in successResponse.data){
              this.certSingleIssuerOption.series[0].data.push({
                name:key,
                value:successResponse.data[key]
              })
            }
            // 基于准备好的dom，初始化echarts实例
        let certSingleIssuer = echarts.init(document.getElementById('certSingleIssuer'));
        certSingleIssuer.setOption(this.certSingleIssuerOption);
          })
          .catch(failResponse => {
            console.log(failResponse);
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/cert/expiration')
          .then(successResponse => {
            this.certSingleExpirOption.series[0].data=[]
            for(var key in successResponse.data){
              this.certSingleExpirOption.series[0].data.push({
                name:key,
                value:successResponse.data[key]
              })
            }
            // 基于准备好的dom，初始化echarts实例
        let certSingleExpir = echarts.init(document.getElementById('certSingleExpir'));
        certSingleExpir.setOption(this.certSingleExpirOption);
          })
          .catch(failResponse => {
            console.log(failResponse);
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/cert/DV')
          .then(successResponse => {
            this.certSingleDvOption.series[0].data=[]
            for(var key in successResponse.data){
              this.certSingleDvOption.series[0].data.push({
                name:key,
                value:successResponse.data[key]
              })
            }
            // 基于准备好的dom，初始化echarts实例
        let certSingleDV = echarts.init(document.getElementById('certSingleDV'));
        certSingleDV.setOption(this.certSingleDvOption);
        this.certSingleDVLoading=false
          })
          .catch(failResponse => {
            console.log(failResponse);
            this.$message.error("连接失败！")
          })
    },
    // 饼图
      getPie () {
          this.$axios
          .get('/dns/render',{  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            this.mailDomainOption.series[0].data[0].value=successResponse.data.single;
            this.mailDomainOption.series[0].data[1].value=successResponse.data.render;
            // 基于准备好的dom，初始化echarts实例
        let firstChart = echarts.init(document.getElementById('firstChart'));
        // 绘制图表，this.echarts1_option是数据
        firstChart.setOption(this.mailDomainOption);
          })
          .catch(failResponse => {
            this.$message.error("获取自建/租用服务出错！")
          })
          this.$axios
          .get('/cert/country')
          .then(successResponse => {
            this.countryOption.series[0].data=[]
            for(var key in successResponse.data){
              if(key=="null"){
                this.countryOption.series[0].data.push({
                name:"未识别",
                value:successResponse.data[key]
              })
              }else if(key=="CN"){
                this.countryOption.series[0].data.push({
                name:"境内",
                value:successResponse.data[key]
              })
              }else{
                this.countryOption.series[0].data.push({
                name:key,
                value:successResponse.data[key]
              })
              }
            }
            // 基于准备好的dom，初始化echarts实例
            let countryChart = echarts.init(document.getElementById('countryChart'));
            // 绘制图表，this.echarts1_option是数据
            countryChart.setOption(this.countryOption);
            this.domainLoading=false
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message.error("获取域名国别出错！")
          })
          this.$axios
          .get('/dns/single_spf',{  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            this.singleOption.series[0].data[0].value=successResponse.data.nonSPF;
            this.singleOption.series[0].data[1].value=successResponse.data.reject;
            this.singleOption.series[0].data[2].value=successResponse.data.soft_reject;
            this.singleOption.series[0].data[3].value=successResponse.data.wrong;
            let secondChart = echarts.init(document.getElementById('secondChart'));
        secondChart.setOption(this.singleOption);
          })
          .catch(failResponse => {
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/dns/single_dmarc',{  //params参数必写 , 如果没有参数传{}也可以
    params: {
       "beginDate": this.dateRange[0],
       "endDate": this.dateRange[1]
    }
})
          .then(successResponse => {
            this.singleDmarcOption.series[0].data[0].value=successResponse.data.nonDMARC;
            this.singleDmarcOption.series[0].data[1].value=successResponse.data.wrong;
            this.singleDmarcOption.series[0].data[2].value=successResponse.data.no_action;
            this.singleDmarcOption.series[0].data[3].value=successResponse.data.null_mail;
            this.singleDmarcOption.series[0].data[4].value=successResponse.data.correct;
            // 基于准备好的dom，初始化echarts实例
        let singleDmarcChart = echarts.init(document.getElementById('singleDmarcChart'));
        singleDmarcChart.setOption(this.singleDmarcOption);
        this.singleLoading=false;
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message.error("连接失败！")
          })
          this.$axios
          .get('/dns/render_spf')
          .then(successResponse => {
            this.renderOption.series[0].data[0].value=successResponse.data.nonSPF;
            this.renderOption.series[0].data[1].value=successResponse.data.reject;
            this.renderOption.series[0].data[2].value=successResponse.data.soft_reject;
            this.renderOption.series[0].data[3].value=successResponse.data.wrong;
            this.$axios
          .get('/dns/render_dmarc')
          .then(successResponse => {
            this.renderDmarcOption.series[0].data[0].value=successResponse.data.nonDMARC;
            this.renderDmarcOption.series[0].data[1].value=successResponse.data.wrong;
            this.renderDmarcOption.series[0].data[2].value=successResponse.data.no_action;
            this.renderDmarcOption.series[0].data[3].value=successResponse.data.null_mail;
            this.renderDmarcOption.series[0].data[4].value=successResponse.data.correct;
            // 基于准备好的dom，初始化echarts实例
        let renderDmarcChart = echarts.init(document.getElementById('renderDmarcChart'));
        renderDmarcChart.setOption(this.renderDmarcOption);
        let renderChart=echarts.init(document.getElementById('renderChart'));
        renderChart.setOption(this.renderOption);
        this.renderLoading=false
          })
          .catch(failResponse => {
            this.$message.error("连接失败！")
          })
          })
          .catch(failResponse => {
            this.$message.error("连接失败！")
          })
        this.getIcp();
        this.getPort();
        this.getCert();
        this.getType();
        this.getGovProtocol();
        this.getEduProtocol();
        this.getSingleJudge();
        this.getRenderJudge();
        this.getGovJudge();
        this.getEduJudge();
        this.getRenderPort();
        let suiteChart = echarts.init(document.getElementById('suiteChart'));
        suiteChart.setOption(this.suiteOption);
        let singleWeakSuiteChart = echarts.init(document.getElementById('singleWeakSuiteChart'));
        singleWeakSuiteChart.setOption(this.singleWeakSuiteOption);
        let singleHrtbldChart = echarts.init(document.getElementById('singleHrtbldChart'));
        singleHrtbldChart.setOption(this.singleHrtbldOption);
        let renderSuiteChart = echarts.init(document.getElementById('renderSuiteChart'));
        renderSuiteChart.setOption(this.renderSuiteOption);
        let renderWeakSuiteChart = echarts.init(document.getElementById('renderWeakSuiteChart'));
        renderWeakSuiteChart.setOption(this.renderWeakSuiteOption);
        let renderHrtbldChart = echarts.init(document.getElementById('renderHrtbldChart'));
        renderHrtbldChart.setOption(this.renderHrtbldOption);
      },
      getSingleJudge(){
        let singleJudgeChart = echarts.init(document.getElementById('judgeChart'));
        singleJudgeChart.setOption(this.judgeOption);
      },
      getRenderJudge(){
        let renderJudgeChart = echarts.init(document.getElementById('renderJudgeChart'));
        renderJudgeChart.setOption(this.renderJudgeOption);
      },
      getGovJudge(){
        let govJudgeChart = echarts.init(document.getElementById('govJudgeChart'));
        govJudgeChart.setOption(this.govJudgeOption);
      },
      getEduJudge(){
        let eduJudgeChart = echarts.init(document.getElementById('eduJudgeChart'));
        eduJudgeChart.setOption(this.eduJudgeOption);
      }
  },
  mounted(){
    this.getPie();
    this.getDateRange();
  }
}
</script>
<style scoped>
.canvas{
    display:inline-block;
    width: 100%;
    height: 200px;
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
