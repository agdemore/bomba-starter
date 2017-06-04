import Vue from 'vue';
import store from 'store';
import Router from 'router';
import Main from 'modules/main/main.vue';

window.Vue = Vue;

require('uikit/application.scss');
new Vue({
  el: '#main',
  store,
  router: Router,
  render: h => h(Main)
});