import { mount } from '@vue/test-utils';
import Engine from '@/views/engines/Engine.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Engine.vue', () => {
  it('renders games for engine', async () => {
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

    const wrapper = mount(Engine, {
      global: {
        plugins: [
          store,
          router
        ],
        stubs: ['SvgIcon'],
        provide: {
          [VILLUS_CLIENT as symbol]: createClient({
            url: 'http://test/graphql',
          }),
        }
      },
      props: {
        id: '1'
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="engine-title"').text()).toMatch('Source Engine');
      // Should list both games on the engine.
      expect(wrapper.get('[data-test-id="engine-games-list"').text()).toMatch('Half-Life 2');
      expect(wrapper.get('[data-test-id="engine-games-list"').text()).toMatch('Portal 2');
    });
  });
});
