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
    if (!res.error) {
      window.localStorage.setItem('token', res.token);
      commit(CHANGE_TOKEN, res.token);
    }
    return res;
  });
};
