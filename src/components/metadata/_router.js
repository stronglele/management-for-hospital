import DrugCategory from '@/components/metadata/DrugCategory'
import Drug from '@/components/metadata/Drug'
import CheckCategory from '@/components/metadata/CheckCategory'
import CheckSubCategory from '@/components/metadata/CheckSubCategory'
import Supplies from '@/components/metadata/Supplies'
import SupplyType from '@/components/metadata/SupplyType'
import SupplyMaintain from '@/components/metadata/SupplyMaintain'

export default [{
  path: '/drug-category',
  meta: {
    requireAuth: true
  },
  name: 'DrugCategory',
  component: DrugCategory
}, {
  path: '/drug',
  meta: {
    requireAuth: true
  },
  name: 'Drug',
  component: Drug
}, {
  path: '/check-category',
  meta: {
    requireAuth: true
  },
  name: 'CheckCategory',
  component: CheckCategory
}, {
  path: '/check-subcategory',
  meta: {
    requireAuth: true
  },
  name: 'CheckSubCategory',
  component: CheckSubCategory
}, {
  path: '/supplies',
  meta: {
    requireAuth: true
  },
  name: 'Supplies',
  component: Supplies
}, {
  path: '/supply-type',
  meta: {
    requireAuth: true
  },
  name: 'SupplyType',
  component: SupplyType
}, {
  path: '/supply-maintain',
  meta: {
    requireAuth: true
  },
  name: 'SupplyMaintain',
  component: SupplyMaintain
}]
