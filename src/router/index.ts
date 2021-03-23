import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '@/views/Home.vue';

import Activity from '@/views/activity/Activity.vue';
import FollowingActivity from '@/views/activity/FollowingActivity.vue';

import Company from '@/views/companies/Company.vue';
import Companies from '@/views/companies/Companies.vue';
import CreateCompany from '@/views/companies/CreateCompany.vue';
import EditCompany from '@/views/companies/EditCompany.vue';

import Engine from '@/views/engines/Engine.vue';
import Engines from '@/views/engines/Engines.vue';
import CreateEngine from '@/views/engines/CreateEngine.vue';
import EditEngine from '@/views/engines/EditEngine.vue';

import Games from '@/views/games/Games.vue';
import Game from '@/views/games/Game.vue';

import Genre from '@/views/genres/Genre.vue';
import Genres from '@/views/genres/Genres.vue';
import CreateGenre from '@/views/genres/CreateGenre.vue';
import EditGenre from '@/views/genres/EditGenre.vue';

import Platform from '@/views/platforms/Platform.vue';
import Platforms from '@/views/platforms/Platforms.vue';

import Series from '@/views/series/Series.vue';
import SeriesList from '@/views/series/SeriesList.vue';

import Store from '@/views/stores/Store.vue';
import Stores from '@/views/stores/Stores.vue';

import Users from '@/views/users/Users.vue';
import User from '@/views/users/User.vue';
import UserProfile from '@/views/users/UserProfile.vue';
import UserActivity from '@/views/users/UserActivity.vue';
import UserFavorites from '@/views/users/UserFavorites.vue';
import UserFollowing from '@/views/users/UserFollowing.vue';
import UserFollowers from '@/views/users/UserFollowers.vue';

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
    path: '/activity/following',
    name: 'FollowingActivity',
    component: FollowingActivity
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
    path: '/engines/new',
    name: 'CreateEngine',
    component: CreateEngine
  },
  {
    path: '/engines/:id/edit',
    name: 'EditEngine',
    component: EditEngine,
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
    path: '/companies/new',
    name: 'CreateCompany',
    component: CreateCompany
  },
  {
    path: '/companies/:id/edit',
    name: 'EditCompany',
    component: EditCompany,
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
    path: '/genres/new',
    name: 'CreateGenre',
    component: CreateGenre
  },
  {
    path: '/genres/:id/edit',
    name: 'EditGenre',
    component: EditGenre,
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
