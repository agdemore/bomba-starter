import {
  CHANGE_TOKEN,
  LOG_OFF
} from './actions';

export const defaultState = {
  token: null
};

export const mutations = {
  [CHANGE_TOKEN](state, token) {
    state.token = token;
  },
  [LOG_OFF](state) {
    state.token = null;
  }
};
