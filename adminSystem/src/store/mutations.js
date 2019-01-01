import * as types from './mutation-types'

const mutations = {
  [types.SET_ACCOUNT](state, account) {
    state.account = account;
  },
  [types.SET_RIGHTS](state, rights) {
    state.rights = rights
  }
}

export default mutations