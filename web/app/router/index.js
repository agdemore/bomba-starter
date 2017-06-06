import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import FormPage from 'modules/form/form.vue';
import AuthPage from 'modules/auth/auth.vue';
import History from 'modules/tabs/history.vue';
import Current from 'modules/tabs/current.vue';
import Creator from 'modules/tabs/creator.vue';

import { getUserInfo } from 'modules/auth/actions.js';

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
      component: FormPage,
      children: [
        {
          path: 'history',
          name: 'history',
          component: History
        },
        {
          path: 'current',
          name: 'current',
          component: Current
        },
        {
          path: 'create',
          name: 'create',
          component: Creator
        }
      ]
    },
    {
      path: '/login',
      name: 'auth-page',
      component: AuthPage
    }
  ]
});

Router.beforeEach((to, from, next) => {
  if (to.name === 'auth-page')
    next();
  const failture = () => next({
      name: 'auth-page',
      query: { next: to.path }
    });
  const token = window.localStorage.getItem('share-pay-user-token');
  if (!token) {
    failture();
    return;
  }
  getUserInfo().then((res) => {
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
