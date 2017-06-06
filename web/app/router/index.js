import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import FormPage from 'modules/form/form.vue';
import AuthPage from 'modules/auth/auth.vue';

Vue.use(VueRouter);

const Router = new VueRouter({
  history: false,
  routes: [
    { path: '/',
      name: 'start',
      redirect: { name: 'form-page' }
    },
    { path: '/form',
      name: 'form-page',
      component: FormPage
    },
    {
      path: '/login',
      name: 'auth-page',
      component: AuthPage
    }
  ]
});

Router.beforeEach((to, from, next) => {
  const failture = () => next({
      name: 'auth-page',
      query: { next: to.path }
    });
  const token = window.localStorage.getItem('share-pay-user-token');
  if (!token && to.name !== 'auth-page') {
    failture();
    return;
  }
  return axios.post('/auth', {
    token
  }).then((res) => {
    if (!res.data.error) {
      next();
      return;
    }
    failture();
  }).catch(() => {
    failture();
  });
});
export default Router;
