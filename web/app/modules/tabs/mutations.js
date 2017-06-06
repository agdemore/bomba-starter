import {
  GET_BILLS
} from './actions';

export const defaultState = {
  bills: []
};

export const mutations = {
  [GET_BILLS](state, bills) {
    state.bills = bills;
  }
};
