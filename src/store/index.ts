import { createStore, Store } from 'vuex';

import { User } from '@/generated/graphql';

export type State = {
  clientId: string;
  redirectUri: string;
  accessToken: string | null;
  userSignedIn: boolean;
  currentUser: User | null;
}

// AccessToken is returned by the backend when authenticating with OAuth.
type AccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  created_at: number;
}

export const store: Store<State> = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
    redirectUri: process.env.VUE_APP_REDIRECT_URL,
    accessToken: null,
    userSignedIn: false,
    currentUser: null
  } as State,
  mutations: {
    accessToken(state, payload: string) {
      state.accessToken = payload;
    },
    signIn(state, payload: User) {
      state.currentUser = payload;
      state.userSignedIn = true;
    },
    signOut(state) {
      state.currentUser = null;
      state.userSignedIn = false;
    }
  },
  actions: {
    acquireAccessToken({ commit, state }) {
      // Commit and return early if we already have the access token.
      const accessTokenFromStorage = localStorage.getItem('vglistFrontend:accessToken');
      if (accessTokenFromStorage !== null) {
        const parsedAccessToken: AccessToken = JSON.parse(accessTokenFromStorage);
        // Check if the access token is expired and needs to be refreshed, if
        // not then we can just commit it to state and return. `Date.now()`
        // returns milliseconds so we have to divide it by 1000 to get a
        // comparable value.
        const expirationTimestamp = (parsedAccessToken.created_at + parsedAccessToken.expires_in);
        const currentTime = Math.floor(Date.now() / 1000);
        if (expirationTimestamp >= currentTime) {
          commit('accessToken', parsedAccessToken.access_token);
          return;
        } else {
          // TODO: Set up logic for refreshing the token.
          console.log('ACCESS TOKEN EXPIRED AHHH');
          // For now just remove it, I guess
          localStorage.removeItem('vglistFrontend:accessToken');
        }
      }

      const authorizationCode = window.location.href.match(/code=(.*)/)?.[1];
      if (authorizationCode === undefined) { return; }

      const url = `${process.env.VUE_APP_VGLIST_HOST_URL}/settings/oauth/token`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: state.clientId,
          code: authorizationCode,
          redirect_uri: state.redirectUri
        })
      };

      return fetch(url, options)
        .then(response => response.json())
        .then((data: AccessToken) => {
          localStorage.setItem('vglistFrontend:accessToken', JSON.stringify(data));
          // `data` in this case is an object with an access_token, expires_in integer, etc.
          commit('accessToken', data.access_token)
        });
    }
  }
});
