import axios from 'axios';

export const GET_BILLS = 'GET_BILLS';
export const getBills = (store, payload) => {
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