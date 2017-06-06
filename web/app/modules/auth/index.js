/**
 * Created by agdemore on 05.06.17.
 */
import * as actions from './actions';
import { defaultState, mutations } from './mutations';

const state = defaultState;

export default {
  module: {
    actions,
    state,
    mutations
  }
};
