<template>
  <div id="app">
    <router-view/>
    <el-footer class='footer'>
				<span>©2020 MESALAB TEAM</span>
			</el-footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0px;
  background: #e5e5e5; /* fallback for old browsers */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.footer{
		bottom: 0;
		width: 100%;
		background-color: #333333;
		line-height: 60px;
		text-align: center;
    color: #bbbbbb;
}
</style>
