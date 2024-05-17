import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import ContactView from '../views/ContactView'
import DashboardView from '../views/DashboardView'
import BoardView from '../views/BoardView'
import NewProjectView from '../views/NewProjectView'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: BoardView
  },
  {
    path: '/newProject',
    name: 'newProject',
    component: NewProjectView
  },   
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  }, 
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
