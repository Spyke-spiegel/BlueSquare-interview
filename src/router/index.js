import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/dashboard.vue'
import Tache from '../views/tache.vue'
import Ticket from '../views/ticket.vue'
import ProjectPage from '../components/projectPage.vue'
import Welcome from "../views/welcome.vue"
import store from "../store/index"

import { getAuth } from "firebase/auth";

const routes = [

  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/tache',
    name: 'Tache',
    component: Tache,
    meta: { requiresAuth: true, requireProject: false },
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket,
    meta: { requiresAuth: true, requireProject: true  },
  },
  {
    path: '/project/:id',
    name: 'ProjectPage',
    component: ProjectPage,
    meta: { requiresAuth: true, requireProject: true  },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requireProject = to.matched.some((record) => record.meta.requireProject);
  const isAuthenticated = getAuth();
  if (requiresAuth && !isAuthenticated) {
    next("/welcome");
  } else {
    next();
  }
});

export default router
