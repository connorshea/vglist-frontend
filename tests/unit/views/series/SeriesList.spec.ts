import { mount } from '@vue/test-utils';
import SeriesList from '@/views/series/SeriesList.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('SeriesList.vue', () => {
  it('renders series for series list', async () => {
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

    const wrapper = mount(SeriesList, {
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
      expect(wrapper.find('[data-test-id="create-series-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="series-list"').text()).toMatch('Half-Life');
      expect(wrapper.get('[data-test-id="series-list"').text()).toMatch('Portal');
    });
  });
});
