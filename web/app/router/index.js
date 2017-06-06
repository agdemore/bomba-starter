import Vue from 'vue';
import VueRouter from 'vue-router';

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
  const token = window.localStorage.getItem('share-pay-user-token');
  if (!token && to.name !== 'auth-page')
    next({
      name: 'auth-page',
      query: { next: to.path }
    })
  next();
});
export default Router;
