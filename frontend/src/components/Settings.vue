<template>
  <div>
     <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>敏感词</span>
  </div>
  <el-tag
  :key="word"
  v-for="word in sensitiveWords"
  type="danger"
  closable
  :disable-transitions="false"
  @close="handleClose(word)">
  {{word}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>重点域名列表</span>
  </div>
  <el-tag
  :key="tag"
  v-for="tag in keyService"
  type="danger"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>重点账号列表</span>
  </div>
  <el-tag
  :key="tag"
  v-for="tag in keyAccounts"
  type="danger"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
</el-card>
  </div>
</template>
<script>
export default {
    data(){
        return {
          sensitiveWords: ['机密', '涉密'],
          keyService:['iie.ac.cn','mails.ucas.ac.cn','digitalgd.com.cn'],
          keyAccounts:['vfcesdccgwec@300310.com','linmr@gd.gov.cn','chenqin@tongdaotech.com'],
        inputVisible: false,
        inputValue: ''
        }
    },
    methods:{
      handleClose(tag) {
        this.sensitiveWords.splice(this.sensitiveWords.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.sensitiveWords.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    mounted(){
      this.getLog()
      this.getRatio()
    }
}
</script>
<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
   .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
