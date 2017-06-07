/**
 * Created by agdemore on 05.06.17.
 */
import axios from 'axios';
import { CLEAR_BILLS, CLEAR_BILL } from 'modules/tabs/actions.js';

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
  commit(CLEAR_BILLS);
  commit(CLEAR_BILL);
  return commit(LOG_OFF);
};

export const getUserInfo = () => {
  const token = window.localStorage.getItem('share-pay-user-token');
  return axios.post('/auth', {
    token
  });
};

export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_FRIENDS = 'SET_FRIENDS';
export const getInfo = (store) => {
  return getUserInfo().then(res => {
    if (res.error)
      store.commit(LOG_OFF);
    else store.commit(GET_USER_INFO, res.data);
    const token = window.localStorage.getItem('share-pay-user-token');
    return axios.get(`/friends?token=${token}`, {
      token
    }).then(res => {
      console.log('FRRR', res);
      if (!res.data.error)
        store.commit(SET_FRIENDS, res.data.friends);
      return res.data.friends;
    });
  });
};