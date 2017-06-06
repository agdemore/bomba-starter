/**
 * Created by agdemore on 05.06.17.
 */
import axios from 'axios';

export const auth = (store, { login, password }) => {
  return axios.post('', {
    username: login,
    password
  });
};