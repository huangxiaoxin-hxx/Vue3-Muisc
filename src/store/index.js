import { createStore } from 'vuex'
import state from './states'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})