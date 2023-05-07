
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import PatientView from '../views/PatientView.vue';
import LoginForm from '../components/LoginForm.vue';
import EditPatientView from '../views/EditPatientView.vue';
import ViewPatientView from '../views/ViewPatientView.vue';

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
  },
  {
    path: '/patient/edit/:id',
    name: 'EditPatient',
    component: EditPatientView
  },
  {
    path: '/patient/view/:id',
    name: 'ViewPatient',
    component: ViewPatientView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
