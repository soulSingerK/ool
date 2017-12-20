import * as types from './mutations.type'

const mutations = {
  [types.MODIFY_TEST] (state, test) {
    state.test = test
  }
}

export default mutations
