import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Activity from '../views/Activity.vue'
import Engines from '../views/Engines.vue'
import Games from '../views/Games.vue'
import Genres from '../views/Genres.vue'
import Platforms from '../views/Platforms.vue'
import SeriesList from '../views/SeriesList.vue'
import Stores from '../views/Stores.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/engines',
    name: 'Engines',
    component: Engines
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genres
  },
  {
    path: '/platforms',
    name: 'Platforms',
    component: Platforms
  },
  {
    path: '/series',
    name: 'Series',
    component: SeriesList
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Stores
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:username',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
