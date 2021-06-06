import { mount } from '@vue/test-utils';
import SteamBlocklist from '@/views/admin/SteamBlocklist.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('SteamBlocklist.vue', () => {
  it('renders blocklist entries', async () => {
    const store = createStore({
      state() {
        return { userSignedIn: true };
      }
    });

    const router = createRouter({ 
      history: createMemoryHistory(),
      routes
    });
    router.push("/");
    await router.isReady();

    const wrapper = mount(SteamBlocklist, {
      global: {
        plugins: [
          store,
          router
        ],
        provide: {
          [VILLUS_CLIENT as symbol]: createClient({
            url: 'http://test/graphql',
          }),
        }
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="steam-blocklist-table-body"').text()).toMatch('Pokemon Sword & Shield');
      expect(wrapper.get('[data-test-id="steam-blocklist-table-body"').text()).toMatch('Pokemon Black & White');
    });
  });
});
