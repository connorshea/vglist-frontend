import { mount } from '@vue/test-utils';
import FollowingActivity from '@/views/activity/FollowingActivity.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('FollowingActivity.vue', () => {
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

    const wrapper = mount(FollowingActivity, {
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

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="activity-events-list"').text()).toMatch('johndoe added Half-Life 2 to their library.');
      expect(wrapper.get('[data-test-id="activity-events-list"').text()).toMatch('johndoe created their account.');
    });
  });
});
