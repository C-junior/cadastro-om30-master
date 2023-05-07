import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import PatientView from '../views/PatientView.vue';
import LoginForm from '../components/LoginForm.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/patient',
    name: 'patient',
    component: PatientView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
