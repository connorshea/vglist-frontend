import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Home.vue', () => {
  it('renders statistics and games', async () => {
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

    const wrapper = mount(Home, {
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
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="home-statistics"').text()).toMatch('1Companies');
      expect(wrapper.get('[data-test-id="home-statistics"').text()).toMatch('2Engines');
      expect(wrapper.get('[data-test-id="home-statistics"').text()).toMatch('3Games');
      expect(wrapper.get('[data-test-id="home-statistics"').text()).toMatch('4Genres');
      expect(wrapper.get('[data-test-id="home-statistics"').text()).toMatch('5Platforms');
      expect(wrapper.get('[data-test-id="home-statistics"').text()).toMatch('6Series');
    });
  });
});
