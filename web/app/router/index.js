import Vue from 'vue';
import VueRouter from 'vue-router';

import FormPage from 'modules/form/form.vue';

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
    }
  ]
});

Router.beforeEach((to, from, next) => {
  next();
});
export default Router;
