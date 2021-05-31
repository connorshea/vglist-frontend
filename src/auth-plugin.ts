import { ClientPlugin, definePlugin } from "villus";
import { Store } from "vuex";
import { State, store } from "@/store";

export const authPlugin = (config: { accessToken: string | null, store: Store<State> }): ClientPlugin => {
  return definePlugin(({ opContext, afterQuery }) => {
    opContext.headers.Authorization = `Bearer ${config.accessToken}`;

    // Reset the access token if it expires.
    afterQuery((_result, { response }) => {
      if (response?.ok === false && response?.body?.errors.map((error: { message: string }) => error.message).includes("The access token expired")) {
        console.log('Access token has expired, resetting to null...');
        store.commit('accessToken', null);
        store.commit('signOut');
        localStorage.removeItem('vglistFrontend:accessToken');
      }
    });
  });
};
