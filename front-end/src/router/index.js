/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import ContactView from '../views/ContactView'
import DashboardView from '../views/DashboardView'
import BoardView from '../views/BoardView'
import NewProjectView from '../views/NewProjectView'
import NewColumnView from '../views/NewColumnView'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Log in'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: BoardView,
    meta: {
      title: 'My board'
    }
  },
  {
    path: '/newProject',
    name: 'newProject',
    component: NewProjectView,
    meta: {
      title: 'NewProject'
    }
  },
  {
    path: '/newColumn/:projectID',
    name: 'NewColumn',
    component: NewColumnView,
    meta: {
      title: 'NewColumn'
    }
  },  
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
    meta: {
      title: 'Contact'
    }
  }, 
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      title: 'About'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? 'Default Title'
  next()
})

export default router
