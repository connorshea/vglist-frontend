import { config, mount } from '@vue/test-utils';
import UserFollowing from '@/views/users/UserFollowing.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';
import { pluralize } from '@/pluralize';

// Include the pluralize filter rather than mocking it.
config.global.mocks = {
  $filters: { pluralize: pluralize }
};

describe('UserFollowing.vue', () => {
  it('renders users that the user is following', async () => {
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

    const wrapper = mount(UserFollowing, {
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
      },
      props: {
        user: {
          id: '1'
        }
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="user-following-list"').text()).toMatch('gordon_freeman');
      expect(wrapper.get('[data-test-id="user-following-list"').text()).toMatch('janedoe');
    });
  });
});
