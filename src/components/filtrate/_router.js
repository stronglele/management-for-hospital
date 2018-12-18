import Filtrate from '@/components/filtrate/Filtrate'
import FiltrateResult from '@/components/filtrate/FiltrateResult'

export default [{
  path: '/filtrate',
  meta: {
    requireAuth: true
  },
  name: 'Filtrate',
  component: Filtrate
}, {
  path: '/filtrate-result',
  meta: {
    requireAuth: true
  },
  name: 'FiltrateResult',
  component: FiltrateResult
}]
