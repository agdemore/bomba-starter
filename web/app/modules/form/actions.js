import axios from 'axios';

export const REQUEST_TEST = 'REQUEST_TEST';
export const RESPONSE_TEST = 'RESPONSE_TEST';
export const ERROR_TEST = 'ERROR_TEST';
export const sendTest = (store, payload) => {
  const { commit } = store;
  commit(REQUEST_TEST);

  return axios.get('/test')
    .then(function (response) {
      console.log('FIRST', response.data);
      commit(RESPONSE_TEST, response);
      return axios.get('/test2');
    })
    .catch(function (error) {
      console.error(error);
      commit(ERROR_TEST, error);
      return error;
    })
    .then((response) => {
      console.log('SECOND', response.data);
    })
    .catch(function (error) {
      console.error(error);
      commit(ERROR_TEST, error);
      return error;
    });
};