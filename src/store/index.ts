import { createStore } from 'vuex';

export type State = {
  clientId: string;
  redirectUri: string;
  accessToken: string | null;
}

export default createStore<State>({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
    redirectUri: process.env.VUE_APP_REDIRECT_URL,
    accessToken: null
  },
  mutations: {
    accessToken(state, payload: string) {
      state.accessToken = payload;
    }
  },
  actions: {
    acquireAccessToken({ commit, state }) {
      const authorizationCode = window.location.href.match(/code=(.*)/)?.[1];
      if (authorizationCode === undefined) { return; }

      const url = 'https://vglist.co/settings/oauth/token';
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
        .then(data => {
          // `data` in this case is an object with an access_token, expires_in integer, etc.
          commit('accessToken', data.access_token)
        });
    }
  },
  modules: {
  }
});
