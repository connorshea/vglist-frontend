import { mount } from '@vue/test-utils';
import Stores from '@/views/stores/Stores.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('Stores.vue', () => {
  it('renders stores for stores list', async () => {
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

    const wrapper = mount(Stores, {
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
      expect(wrapper.find('[data-test-id="create-store-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="stores-list"').text()).toMatch('Nintendo eShop');
      expect(wrapper.get('[data-test-id="stores-list"').text()).toMatch('Steam');
    });
  });
});
