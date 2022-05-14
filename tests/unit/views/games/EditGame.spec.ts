import { mount } from '@vue/test-utils';
import EditGame from '@/views/games/EditGame.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('EditGame.vue', () => {
  it('renders game form', async () => {
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

    const wrapper = mount(EditGame, {
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
      },
      props: {
        id: '1'
      }
    });

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="form-title"').text()).toMatch('Editing Half-Life 2');
    });
  });
});
