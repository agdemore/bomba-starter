import { TEST } from './actions';

export const defaultState = {
  test: false
};

export const mutations = {
  [TEST](state, payload) {
    state.test = payload;
  }
};
