import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Activity from '@/views/Activity.vue';
import Company from '@/views/Company.vue';
import Companies from '@/views/Companies.vue';
import Engine from '@/views/Engine.vue';
import Engines from '@/views/Engines.vue';
import Games from '@/views/Games.vue';
import Game from '@/views/Game.vue';
import Genre from '@/views/Genre.vue';
import Genres from '@/views/Genres.vue';
import Platform from '@/views/Platform.vue';
import Platforms from '@/views/Platforms.vue';
import Series from '@/views/Series.vue';
import SeriesList from '@/views/SeriesList.vue';
import Store from '@/views/Store.vue';
import Stores from '@/views/Stores.vue';
import Users from '@/views/Users.vue';
import User from '@/views/User.vue';
import UserProfile from '@/views/UserProfile.vue';
import UserActivity from '@/views/UserActivity.vue';
import UserFavorites from '@/views/UserFavorites.vue';
import UserFollowing from '@/views/UserFollowing.vue';
import UserFollowers from '@/views/UserFollowers.vue';

Vue.use(VueRouter);

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
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
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
    path: '/engines/:id',
    name: 'Engine',
    component: Engine,
    props: true
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies
  },
  {
    path: '/companies/:id',
    name: 'Company',
    component: Company,
    props: true
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/games/:id',
    name: 'Game',
    component: Game,
    props: true
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genres
  },
  {
    path: '/genres/:id',
    name: 'Genre',
    component: Genre,
    props: true
  },
  {
    path: '/platforms',
    name: 'Platforms',
    component: Platforms
  },
  {
    path: '/platforms/:id',
    name: 'Platform',
    component: Platform,
    props: true
  },
  {
    path: '/series',
    name: 'SeriesList',
    component: SeriesList
  },
  {
    path: '/series/:id',
    name: 'Series',
    component: Series,
    props: true
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Stores
  },
  {
    path: '/stores/:id',
    name: 'Store',
    component: Store,
    props: true
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:slug',
    component: User,
    props: true,
    children: [
      {
        path: '',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path: 'activity',
        name: 'UserActivity',
        component: UserActivity
      },
      {
        path: 'favorites',
        name: 'UserFavorites',
        component: UserFavorites
      },
      {
        path: 'followers',
        name: 'UserFollowers',
        component: UserFollowers
      },
      {
        path: 'following',
        name: 'UserFollowing',
        component: UserFollowing
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
