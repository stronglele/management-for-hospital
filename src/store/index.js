// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    data: [],
    name: '',
    telephone: '',
    age: '',
    sex: '',
    userId: ''
  },
  mutations: {
    tokenChange (state, obj) {
      state.token = obj.token
      window.sessionStorage.setItem('token', JSON.stringify(obj.token))
      if (obj.flag === true) {
        window.localStorage.setItem('account', obj.account)
        window.localStorage.setItem('flag', obj.flag)
      } else {
        window.localStorage.removeItem('account')
        window.localStorage.removeItem('flag')
      }
    },
    setToken (state, obj) {
      state.token = obj
    },
    tokenDelete (state) {
      state.token = null
      window.sessionStorage.removeItem('token')
    },
    caseDataSet (state, obj) {
      state.name = obj.name
      state.telephone = obj.telephone
      state.age = obj.age
      state.sex = obj.sex
      state.userId = obj.userId
    },
    stateFiltrate (state, obj) {
      state.data = obj
    }
  }
})
