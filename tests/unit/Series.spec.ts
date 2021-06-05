import { mount } from '@vue/test-utils';
import Series from '@/views/series/Series.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Series.vue', () => {
  it('renders games for series', async () => {
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

    const wrapper = mount(Series, {
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
      expect(wrapper.get('[data-test-id="series-title"').text()).toMatch('Half-Life');
      // Should list both games in the series.
      expect(wrapper.get('[data-test-id="series-games-list"').text()).toMatch('Half-Life 1');
      expect(wrapper.get('[data-test-id="series-games-list"').text()).toMatch('Half-Life 2');
    });
  });
});
