import { mount } from '@vue/test-utils';
import Genres from '@/views/genres/Genres.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Genres.vue', () => {
  it('renders genres for genres list', async () => {
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

    const wrapper = mount(Genres, {
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
      expect(wrapper.find('[data-test-id="create-genre-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="genres-list"').text()).toMatch('first-person shooter');
      expect(wrapper.get('[data-test-id="genres-list"').text()).toMatch('third-person shooter');
    });
  });
});
