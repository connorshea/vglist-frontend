import { mount } from '@vue/test-utils';
import Activity from '@/views/activity/Activity.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Activity.vue', () => {
  it('renders events', async () => {
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

    const wrapper = mount(Activity, {
      global: {
        plugins: [
          store,
          router
        ],
        stubs: [
          'SvgIcon'
        ],
        provide: {
          [VILLUS_CLIENT as symbol]: createClient({
            url: 'http://test/graphql',
          }),
        }
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="activity-events-list"').text()).toMatch('johndoe added Half-Life 2 to their library.');
      expect(wrapper.get('[data-test-id="activity-events-list"').text()).toMatch('johndoe created their account');
    });
  });
});
