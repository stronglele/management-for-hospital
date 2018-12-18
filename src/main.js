/**
 * main.js
 * App 入口文件，初始化 Vue ，配置路由、状态管理并引入控件
 */
'use strict'
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import moment from 'moment'
import global from '@/components/_libs/global'

import './assets/theme/reset.css'
import './assets/theme/index.css'
import {
  Button,
  ButtonGroup,
  Icon,
  Badge,
  Tag,
  Input,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Radio,
  RadioGroup,
  RadioButton,
  Select,
  Option,
  OptionGroup,
  Form,
  FormItem,
  DatePicker,
  Transfer,
  Cascader,
  Table,
  TableColumn,
  Pagination,
  Tabs,
  TabPane,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dialog,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Row,
  Col,
  Loading,
  Card,
  Autocomplete
} from 'element-ui'

import App from './App' // Root Component
import { getCookie, delCookie } from '@/components/_libs/util'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$global = global
Vue.prototype.$CryptoJS = CryptoJS
Vue.prototype.$moment = moment
Vue.prototype.$key = CryptoJS.enc.Latin1.parse(global.key)
Vue.prototype.$iv = CryptoJS.enc.Latin1.parse(global.iv)

/* 配置路由拦截 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    let token = window.sessionStorage.getItem('token') || null
    if (token || store.state.token) { // 通过 vuex state 获取当前的 token 是否存在
      if (!store.state.token) {
        store.commit('setToken', JSON.parse(token))
      }
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由 path 作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let session = getCookie('session') || null
    let uuid = getCookie('u_uuid') || null
    if (session && uuid) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['passport'] = decodeURIComponent(uuid)
      config.headers['access-token'] = session
    }
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
        // 返回 403 清除token信息并跳转到登录页面
          store.commit('tokenDelete')
          delCookie('session')
          delCookie('u_uuid')
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(CheckboxButton)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Tag)

Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Transfer)
Vue.use(Cascader)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.use(Dialog)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Autocomplete)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
