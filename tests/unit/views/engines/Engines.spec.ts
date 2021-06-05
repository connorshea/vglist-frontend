import { mount } from '@vue/test-utils';
import Engines from '@/views/engines/Engines.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Engines.vue', () => {
  it('renders engines for engines list', async () => {
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

    const wrapper = mount(Engines, {
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
      expect(wrapper.find('[data-test-id="create-engine-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="engines-list"').text()).toMatch('Source Engine');
      expect(wrapper.get('[data-test-id="engines-list"').text()).toMatch('Unreal Engine');
    });
  });
});
