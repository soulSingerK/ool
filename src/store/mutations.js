import * as types from './mutations.type'

const mutations = {
  [types.SET_TABSHOW] (state, tabShow) {
    state.tabShow = tabShow
  },
  [types.SET_MAINTYPE] (state, mainType) {
    state.mainType = mainType
  },
  [types.SET_QUESTIONS] (state, questions) {
    state.questions = questions
  },
  [types.SET_AWARDS] (state, awards) {
    state.awards = awards
  },
  [types.SET_SCENE] (state, scene) {
    state.scene = scene
  },
  [types.SET_USERTYPR] (state, userType) {
    state.userType = userType
  },
  [types.SET_SHOPSORT] (state, shopSort) {
    state.shopSort = shopSort
  },
  [types.SET_PREFERENCE] (state, preference) {
    state.preference = preference
  },
  [types.SET_TPL] (state, tpl) {
    state.tpl = tpl
  },
  [types.SET_CURRENT] (state, current) {
    state.current = current
  },
  [types.SET_COVERIMG] (state, coverImgs) {
    state.coverImgs = coverImgs
  },
  [types.SET_ACTNAME] (state, actName) {
    state.actName = actName
  }
}

export default mutations
