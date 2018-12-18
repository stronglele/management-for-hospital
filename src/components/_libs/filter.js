/**
 * filter.js
 * 定义一些数据过滤函数
 */
'use strict'

import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', function (value) {
  return value ? moment(new Date(value)).format('YYYY-MM-DD') : ''
})

Vue.filter('datetime', function (value) {
  return value ? moment(new Date(value)).format('YYYY-MM-DD HH:mm') : ''
})

Vue.filter('time', function (value) {
  return value ? moment(new Date(value)).format('HH:mm') : ''
})

