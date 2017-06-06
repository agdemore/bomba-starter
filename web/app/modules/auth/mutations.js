import {
  CHANGE_TOKEN
} from './actions';

export const defaultState = {
  token: null
};

export const mutations = {
  [CHANGE_TOKEN](state, token) {
    state.token = token;
  }
};
