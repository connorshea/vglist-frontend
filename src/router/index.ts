import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';

import Admin from '@/views/admin/Admin.vue';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import WikidataBlocklist from '@/views/admin/WikidataBlocklist.vue';
import SteamBlocklist from '@/views/admin/SteamBlocklist.vue';

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
import CreateGame from '@/views/games/CreateGame.vue';
import EditGame from '@/views/games/EditGame.vue';

import Genre from '@/views/genres/Genre.vue';
import Genres from '@/views/genres/Genres.vue';
import CreateGenre from '@/views/genres/CreateGenre.vue';
import EditGenre from '@/views/genres/EditGenre.vue';

import Platform from '@/views/platforms/Platform.vue';
import Platforms from '@/views/platforms/Platforms.vue';
import CreatePlatform from '@/views/platforms/CreatePlatform.vue';
import EditPlatform from '@/views/platforms/EditPlatform.vue';

import Series from '@/views/series/Series.vue';
import SeriesList from '@/views/series/SeriesList.vue';
import CreateSeries from '@/views/series/CreateSeries.vue';
import EditSeries from '@/views/series/EditSeries.vue';

import Store from '@/views/stores/Store.vue';
import Stores from '@/views/stores/Stores.vue';
import CreateStore from '@/views/stores/CreateStore.vue';
import EditStore from '@/views/stores/EditStore.vue';

import Users from '@/views/users/Users.vue';
import User from '@/views/users/User.vue';
import UserProfile from '@/views/users/UserProfile.vue';
import UserActivity from '@/views/users/UserActivity.vue';
import UserFavorites from '@/views/users/UserFavorites.vue';
import UserFollowing from '@/views/users/UserFollowing.vue';
import UserFollowers from '@/views/users/UserFollowers.vue';

const routes: Array<RouteRecordRaw> = [
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
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      },
      {
        path: 'wikidata_blocklist',
        name: 'WikidataBlocklist',
        component: WikidataBlocklist,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      },
      {
        path: 'steam_blocklist',
        name: 'SteamBlocklist',
        component: SteamBlocklist,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      }
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/activity/following',
    name: 'FollowingActivity',
    component: FollowingActivity,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/engines',
    name: 'Engines',
    component: Engines,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/engines/:id',
    name: 'Engine',
    component: Engine,
    props: route => ({
      id: route.params.id,
      before: route.query.before,
      after: route.query.after
    })
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
    component: Companies,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/companies/:id',
    name: 'Company',
    component: Company,
    props: route => ({
      id: route.params.id,
      developedBefore: route.query.developedBefore,
      developedAfter: route.query.developedAfter,
      publishedBefore: route.query.publishedBefore,
      publishedAfter: route.query.publishedAfter
    })
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
    component: Games,
    props: route => ({
      sortBy: (route.query.sort_by as string),
      platformId: (route.query.platform_id as string) ?? null,
      byYear: parseInt(route.query.by_year as string) ?? null,
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/games/:id',
    name: 'Game',
    component: Game,
    props: true
  },
  {
    path: '/games/new',
    name: 'CreateGame',
    component: CreateGame
  },
  {
    path: '/games/:id/edit',
    name: 'EditGame',
    component: EditGame,
    props: true
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genres,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/genres/:id',
    name: 'Genre',
    component: Genre,
    props: route => ({
      id: route.params.id,
      before: route.query.before,
      after: route.query.after
    })
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
    component: Platforms,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/platforms/:id',
    name: 'Platform',
    component: Platform,
    props: route => ({
      id: route.params.id,
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/platforms/new',
    name: 'CreatePlatform',
    component: CreatePlatform
  },
  {
    path: '/platforms/:id/edit',
    name: 'EditPlatform',
    component: EditPlatform,
    props: true
  },
  {
    path: '/series',
    name: 'SeriesList',
    component: SeriesList,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/series/:id',
    name: 'Series',
    component: Series,
    props: route => ({
      id: route.params.id,
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/series/new',
    name: 'CreateSeries',
    component: CreateSeries
  },
  {
    path: '/series/:id/edit',
    name: 'EditSeries',
    component: EditSeries,
    props: true
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Stores,
    props: route => ({
      before: route.query.before,
      after: route.query.after
    })
  },
  {
    path: '/stores/:id',
    name: 'Store',
    component: Store,
    props: true
  },
  {
    path: '/stores/new',
    name: 'CreateStore',
    component: CreateStore
  },
  {
    path: '/stores/:id/edit',
    name: 'EditStore',
    component: EditStore,
    props: true
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    props: route => ({
      sortBy: route.query.sort_by as string,
      before: route.query.before,
      after: route.query.after
    })
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
        component: UserActivity,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      },
      {
        path: 'favorites',
        name: 'UserFavorites',
        component: UserFavorites,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      },
      {
        path: 'followers',
        name: 'UserFollowers',
        component: UserFollowers,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      },
      {
        path: 'following',
        name: 'UserFollowing',
        component: UserFollowing,
        props: route => ({
          before: route.query.before,
          after: route.query.after
        })
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
