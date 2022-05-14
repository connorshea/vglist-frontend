import { mount } from '@vue/test-utils';
import WikidataBlocklist from '@/views/admin/WikidataBlocklist.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('WikidataBlocklist.vue', () => {
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

    const wrapper = mount(WikidataBlocklist, {
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

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="wikidata-blocklist-table-body"').text()).toMatch('Pokemon Sword & Shield');
      expect(wrapper.get('[data-test-id="wikidata-blocklist-table-body"').text()).toMatch('Pokemon Black & White');
    });
  });
});
