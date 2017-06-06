import axios from 'axios';

export const GET_BILLS = 'GET_BILLS';
export const getBills = (store) => {
  const { commit, rootState } = store;

  const token = rootState.auth.token;
  const wallet = rootState.auth.wallet;
  axios.post(`/bills?token=${token}`, {
    wallet
  }).then(res => {
    console.log(res);
    commit(GET_BILLS, res.data.bills);
  }).catch(err => {
    console.error(err);
  });
};

export const GET_BILL = 'GET_BILL';
export const getBillbyId = (store, id) => {
  const { commit, rootState } = store;
  const token = rootState.auth.token;
  return axios.get(`/bills/${id}?token=${token}`)
  .then(res => {
    console.log('BILL', res);
    commit(GET_BILL, res.data.bill);
    return res;
  }).catch(err => {
    console.error(err);
  });
};

export const SAVE_BILL = 'SAVE_BILL';
export const saveBill = (store, bill) => {
  const { commit, rootState } = store;
  const token = rootState.auth.token;
  return axios.post(`/bills/saveOpenBill?token=${token}`, {
    bill
  })
  .then(res => {
    commit(SAVE_BILL, bill);
    return res;
  }).catch(err => {
    console.error(err);
  });
};
