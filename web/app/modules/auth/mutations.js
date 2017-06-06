import {
  CHANGE_TOKEN,
  LOG_OFF,
  GET_USER_INFO,
  SET_FRIENDS
} from './actions';

export const defaultState = {
  token: null,
  name: '',
  wallet: '',
  friends: null
};

export const mutations = {
  [CHANGE_TOKEN](state, token) {
    state.token = token;
  },
  [LOG_OFF](state) {
    state.token = null;
  },
  [GET_USER_INFO](state, payload) {
    state.name = payload.username || '';
    state.wallet = payload.wallet || '';
  },
  [SET_FRIENDS](state, payload) {
    state.friends = payload;
  }
};
