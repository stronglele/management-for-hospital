// router/index.js

import Vue from 'vue'
import VueRouter from 'vue-router'

import CaseRouter from '@/components/case/_router' // 病史资料查看录入相关路由
import AccountRouter from '@/components/account/_router' // 超级管理员账户信息管理相关路由
import MetadataRouter from '@/components/metadata/_router' // 基础数据维护相关路由
import FiltrateRouter from '@/components/filtrate/_router' // 病史资料筛选相关路由
import CaseDetail from '@/components/case/CaseDetail'

import Main from '@/components/Main'
import Login from '@/components/login/Login'
import Error from '@/components/error'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/management-hospital/',
  routes: [{
    path: '/',
    meta: {
      requireAuth: true
    },
    component: Main,
    children: [
      ...CaseRouter,
      ...AccountRouter,
      ...MetadataRouter,
      ...FiltrateRouter
    ]
  }, {
    path: '/case-detail/:id/:userId',
    meta: {
      requireAuth: true
    },
    name: 'CaseDetail',
    component: CaseDetail
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    name: 'error',
    component: Error
  }]
})
