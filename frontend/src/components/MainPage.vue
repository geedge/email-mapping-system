<template>
    <div>
        <el-row style="border-bottom: 1px solid #eee">
            <!--头部-->
            <el-col :span="24" class="topbar-wrap" id="nav">
            <el-menu :default-active="activeIndex" mode="horizontal"
            background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
            <div class="topbar-title">
                <span style="font-size: 18px;">Argvs 邮件服务测绘系统</span>
            </div>
            <el-menu-item index="1">
                <router-link :to="{name:'Index'}">邮件服务测绘报告</router-link>
            </el-menu-item>
            <el-menu-item style="" index="2">
                <router-link :to="{name:'MailLog'}">邮件通联日志报告</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link :to="{name:'Settings'}">设置</router-link>
            </el-menu-item>
</el-menu>
            </el-col>
        </el-row>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userName:'admin',
            activeIndex:'1'
        }
    },
    methods: {
      logout(){
        sessionStorage.clear();
        this.$router.push('/');
      }
    },
    mounted(){
        this.userName=sessionStorage.getItem('user')
    }
}
</script>

<style scoped>
.topbar-wrap{
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding: 0;
}
.topbar-logo{
    float: left;
    width: 59px;
    line-height: 26px;
}
.topbar-logo img{
    height: 50px;
    margin-top: 5px;
    margin-left: 2px;
}
.topbar-title{
    float: left;
    text-align: left;
    width: 200px;
    padding-left: 10px;
    color: #fff;
}
.topbar-account{
    float: right;
    padding-right: 12px;
}
.userinfo-inner{
    cursor: pointer;
    padding-left: 10px;
}
  a{
    text-decoration:none;
  }
</style>
