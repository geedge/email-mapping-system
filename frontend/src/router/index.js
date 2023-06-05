import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/MainPage'
import Index from '../components/Index'
import MailLog from '../components/MailLog'
import Settings from '../components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',name:'MainPage',component:MainPage,redirect:'/index',
  children:[
    {path:'/index',name:'Index',component:Index},
    {path:'/mailLog',name:"MailLog",component:MailLog},
    {path:'/settings',name:"Settings",component:Settings}
  ]}
  ]
})
