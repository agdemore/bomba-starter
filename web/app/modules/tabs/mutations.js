import Vue from 'vue';
import {
  GET_BILLS,
  GET_BILL,
  SAVE_BILL,
  CLEAR_BILL
} from './actions';

export const defaultState = {
  bills: [],
  currentBill: null
};

export const mutations = {
  [GET_BILLS](state, bills) {
    state.bills = bills;
  },
  [GET_BILL](state, bill) {
    state.currentBill = bill;
  },
  [SAVE_BILL](state, bill) {
    const ind = state.bills.findIndex(elem => elem.id === bill.id);
    if (ind !== -1)
      Vue.set(state.bills, ind, bill);
  },
  [CLEAR_BILL](state) {
    state.currentBill = null;
  }
};
