import Vue from 'vue';
import store from 'store';
import Router from 'router';
import Main from 'modules/main/main.vue';
// import sock from 'store/socket.js';

window.Vue = Vue;
// Vue.prototype.$mysock = new sock('http://localhost:8080');
// var vueUI = require('vue-ui');

// Vue.use(vueUI);

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:8000');

new Vue({
  el: '#main',
  store,
  router: Router,
  render: h => h(Main)
});