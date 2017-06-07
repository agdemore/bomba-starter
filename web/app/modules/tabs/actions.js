import axios from 'axios';

export const GET_BILLS = 'GET_BILLS';
export const getBills = (store) => {
  const { commit, rootState } = store;

  const token = rootState.auth.token;
  const wallet = rootState.auth.wallet;
  console.log('wallet', wallet);
  
  axios.post(`/bills?token=${token}`, {
    wallet
  }).then(res => {
    console.log('BILLS!!!!', res);
    commit(GET_BILLS, res.data);
  }).catch(err => {
    console.error(err);
  });
};

export const GET_BILL = 'GET_BILL';
export const getBillbyId = (store, bill) => {
  const { commit, rootState } = store;
  const token = rootState.auth.token;
  // return axios.get(`/bills/${id}?token=${token}`)
  // .then(res => {
  //   console.log('BILL', res);
  console.log('clicked bill', bill);
  return commit(GET_BILL, bill);
  //   return res;
  // }).catch(err => {
  //   console.error(err);
  // });
};

export const SAVE_BILL = 'SAVE_BILL';
export const saveBill = (store, bill) => {
  const { commit, rootState } = store;
  const token = rootState.auth.token;

  console.log('save bill', bill);
  return axios.post(`/bills/saveOpenBill?token=${token}`, bill).then(res => {
    console.log('res bill', res);
    commit(SAVE_BILL, bill);
    return res;
  }).catch(err => {
    console.error(err);
  });
};


export const CLEAR_BILL = 'CLEAR_BILL';
export const CLEAR_BILLS = 'CLEAR_BILLS';
export const clearBill = (store) => {
  return store.commit(CLEAR_BILL);
};

export const approveBill = (store, payload) => {
  const token = store.rootState.auth.token;
  return axios.post(`/bills/confirm?token=${token}`, payload);
};

