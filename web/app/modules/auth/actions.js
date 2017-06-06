/**
 * Created by agdemore on 05.06.17.
 */
import axios from 'axios';

export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const auth = (store, { login, password }) => {
  const { commit } = store;

  return axios.post('/auth', {
    username: login,
    password
  }).then((res) => {
    if (!res.data.error) {
      window.localStorage.setItem('share-pay-user-token', res.data.token);
      commit(CHANGE_TOKEN, res.data.token);
    }
    return res;
  });
};

export const LOG_OFF = 'LOG_OFF';
export const logOff = (store) => {
  const { commit } = store;
  window.localStorage.setItem('share-pay-user-token', null);
  return commit(LOG_OFF);
};