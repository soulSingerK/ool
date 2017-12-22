import * as types from './mutations.type'

const mutations = {
  [types.SET_TABSHOW] (state, tabShow) {
    state.tabShow = tabShow
  },
  [types.SET_MAINTYPE] (state, mainType) {
    state.mainType = mainType
  }
}

export default mutations
