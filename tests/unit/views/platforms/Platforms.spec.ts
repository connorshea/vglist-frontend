import { mount } from '@vue/test-utils';
import Platforms from '@/views/platforms/Platforms.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('Platforms.vue', () => {
  it('renders platforms for platforms list', async () => {
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

    const wrapper = mount(Platforms, {
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
      expect(wrapper.find('[data-test-id="create-platform-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="platforms-list"').text()).toMatch('Nintendo Switch');
      expect(wrapper.get('[data-test-id="platforms-list"').text()).toMatch('Nintendo DS');
    });
  });
});
