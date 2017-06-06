import Vue from 'vue';
import Vuex from 'vuex';

import form from 'modules/form';
import auth from 'modules/auth';
import tabs from 'modules/tabs';

Vue.use(Vuex);

const mutations = {};
const state = {};
const components = {
  form,
  auth,
  tabs
};
const modules = {};
const getters = {};
const actions = {};

Object.keys(components).forEach(key => {
  if (!components.hasOwnProperty(key))
    return;
  if (components[key].module)
    modules[key] = components[key].module;
  if (components[key].getters) {
    Object.keys(components[key].getters).forEach(getter => {
      if (!components[key].getters.hasOwnProperty(getter))
        return;
      if (getters[getter])
        throw `Getter ${getter} already exist`;
      getters[getter] = components[key].getters[getter];
    });
  }
});

export default new Vuex.Store({
  state,
  mutations,
  modules,
  getters,
  actions
});
