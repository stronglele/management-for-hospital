'use strict'

import CaseList from '@/components/case/CaseList'
import CaseEdit from '@/components/case/CaseEdit'
import CaseImage from '@/components/case/CaseImage'

export default [{
  path: '/',
  meta: {
    requireAuth: true
  },
  redirect: '/case-list'
}, {
  path: '/case-list',
  meta: {
    requireAuth: true
  },
  name: 'CaseList',
  component: CaseList
}, {
  path: '/case-edit/:id/:userId',
  meta: {
    requireAuth: true
  },
  name: 'CaseEdit',
  component: CaseEdit
}, {
  path: '/case-image/:id',
  meta: {
    requireAuth: true
  },
  name: 'CaseImage',
  component: CaseImage
}]
