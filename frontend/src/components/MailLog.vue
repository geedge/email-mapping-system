<template>
    <div>
      <el-card shadow="hover">
            <div slot="header" class="clearfix">
    <span>明文邮件内容分析</span>
  </div>
  <el-row>
    <el-col
    :span="16"
    v-loading="plaintextLoading"
    element-loading-spinner="el-icon-loading">
    <el-col :span="8">
      <!-- 饼图-->
          <div
          class="canvas" id="sensitiveWordsChart"/>
    </el-col>
    <el-col :span="16">
        <el-table
    :data="sensitiveWordsAccount"
    height="200"
    border
    style="width: 100%">
    <el-table-column
      prop="account"
      label="账户">
    </el-table-column>
    <el-table-column
      prop="count"
      label="出现敏感词次数">
    </el-table-column>
    <el-table-column
      prop="sensitiveWords"
      label="敏感词">
    </el-table-column>
  </el-table>
    </el-col>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="7">
      <b>说明：</b><br>
      <em>根据；</em><br>
      <em>2.租用服务：租用邮箱运营商的服务，邮件服务器由运营商维护；</em><br>
      <em>3.境内/境外服务：根据邮件服务器端口证书国别字段区分；</em><br>
      <em>4.邮件服务用户类型：按域名分类，gov.cn——政府类、edu.cn——教育类、其他。</em>
    </el-col>
  </el-row>
      </el-card>
      <el-card shadow="hover">
            <div slot="header" class="clearfix">
    <span>邮件通联关系图</span>
  </div>
  <el-row>
    <el-col
    :span="16"
    v-loading="domainLoading"
    element-loading-spinner="el-icon-loading">
    <div class="relationChart" id="relationChart"/>
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
    </div>
</template>
<script>
// require('echarts-wordcloud');
var echarts = require("echarts");
require("echarts/src/chart/graph");
echarts.dataTool = require("echarts/extension/dataTool");
import cytoscape from 'cytoscape'
export default {
    data(){
        return {
          sensitiveWordsAccount:[{
            account:"liu_qiang@163.com",
            count:"13",
            sensitiveWords:"机密、泄密"
          },{
            account:"ouzdq@lzxzca.net",
            count:"10",
            sensitiveWords:"机密"
          },{
            account:"zshlwxh@126.com",
            count:"8",
            sensitiveWords:"机密"
          }],
          sensitiveWordsOption:{
            title:[{
              subtext:'含敏感词邮件',
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
          data: [{
              name:'机密',
              value:400},{
                name:'涉密',
              value:234
              }],
          animation: false,
          label: {
            position: 'inner',
            alignTo: 'edge',
            margin: 20,
            formatter: '{c}'
          },
          right: 0,
          top: 0,
          bottom: 0
        }],
        tooltip: {
            formatter: '{b} : {c}',// 默认值null，内容格式器
          }
      },
      
        }
    },
    mounted(){
        this.getRelation()
        this.getSnstvWrds()
    },
    methods:{
        getSnstvWrds(){
          let sensitiveWordsChart = echarts.init(document.getElementById('sensitiveWordsChart'));
          sensitiveWordsChart.setOption(this.sensitiveWordsOption);
        },
        getRelation(){
            $.get('static/elements.json', function(result) {
                const cy = cytoscape({
                container:document.getElementById('relationChart'),
                userZoomingEnabled: true, //是否允许用户事件（例如鼠标滚轮，捏合缩放）缩放图形
                wheelSensitivity: 0.1, //缩放时更改滚轮灵敏度。
                autoungrabify: true,//节点是否可以拖拽
                minZoom: 0.3,//图表缩放的最小界限
                layout: {
                    name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
                },
                style: [{//设置节点样式
                    selector: 'node',
                    style: {
                        "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
    "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
    "content": "data(id)",
    "font-size": "12px",
    "text-valign": "center",
    "text-halign": "center",
    "background-color": "#555",
    "text-outline-color": "#555",
    "text-outline-width": "2px",
    "color": "#fff",
    "overlay-padding": "6px",
    "z-index": "10"
                    }
                },{//设置连线样式
                    selector: 'edge',
                    style: {
                        width: 3,
                        'target-arrow-shape': 'triangle',
                        // "target-arrow-fill": "hollow", //箭头填充 空心
                        'line-color': '#9dbaea',
                        'target-arrow-color': '#9dbaea',
                        'curve-style': 'bezier',
                    }
                }
                ],
                elements: result.elements
            })
            },'json');
        }
    }
}
</script>
<style scoped>
#main{
    display:inline-block;
    width:100%;
    height: 530px;
}
.canvas{
    display:inline-block;
    width: 100%;
    height: 200px;
}
.relationChart{
    display:inline-block;
    width: 100%;
    height: 600px;
}
</style>
