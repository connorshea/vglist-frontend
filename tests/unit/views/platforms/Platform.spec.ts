import { mount } from '@vue/test-utils';
import Platform from '@/views/platforms/Platform.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('Platform.vue', () => {
  it('renders games for platform', async () => {
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

    const wrapper = mount(Platform, {
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

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="platform-title"').text()).toMatch('Windows');
      // Should list both games on the platform.
      expect(wrapper.get('[data-test-id="platform-games-list"').text()).toMatch('Half-Life 1');
      expect(wrapper.get('[data-test-id="platform-games-list"').text()).toMatch('Half-Life 2');
    });
  });
});
