import { config, mount } from '@vue/test-utils';
import UserFavorites from '@/views/users/UserFavorites.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';
import { pluralize } from '@/pluralize';

// Include the pluralize filter rather than mocking it.
config.global.mocks = {
  $filters: { pluralize: pluralize }
};

describe('UserFavorites.vue', () => {
  it('renders favorite games for the user', async () => {
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

    const wrapper = mount(UserFavorites, {
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

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="user-favorites-list"').text()).toMatch('Half-Life 2');
      expect(wrapper.get('[data-test-id="user-favorites-list"').text()).toMatch('Portal 2');
    });
  });
});
