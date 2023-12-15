import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import SessionList from './components/SessionList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: SessionList,
    },
    {
      path: '/session/:id',
      component: () => import('./components/SessionDetails.vue'),
    },
  ],
});

createApp(App).use(router).mount('#app');
