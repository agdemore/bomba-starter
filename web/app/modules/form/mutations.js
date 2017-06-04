import {
  REQUEST_TEST,
  RESPONSE_TEST,
  ERROR_TEST
} from './actions';

export const defaultState = {
  response: null,
  error: null
};

export const mutations = {
  [REQUEST_TEST](state) {
    state.response = null;
    state.error = null;
  },
  [RESPONSE_TEST](state, payload) {
    state.response = payload;
    state.error = null;
  },
  [ERROR_TEST](state, err) {
    state.error = err;
  }
};
