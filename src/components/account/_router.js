import Account from '@/components/account/Account'

export default [{
  path: '/account',
  meta: {
    requireAuth: true
  },
  name: 'Account',
  component: Account
}]
