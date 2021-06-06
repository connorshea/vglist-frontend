import { mount } from '@vue/test-utils';
import Games from '@/views/games/Games.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Games.vue', () => {
  it('renders games for games list', async () => {
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

    const wrapper = mount(Games, {
      global: {
        plugins: [
          store,
          router
        ],
        stubs: [
          'SvgIcon',
          'GamesFilters',
          'SortDropdown'
        ],
        provide: {
          [VILLUS_CLIENT as symbol]: createClient({
            url: 'http://test/graphql',
          }),
        }
      }
    });

    await waitForExpect(() => {
      expect(wrapper.find('[data-test-id="create-game-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="games-list"').text()).toMatch('Half-Life 2');
      expect(wrapper.get('[data-test-id="games-list"').text()).toMatch('Portal 2');
    });
  });
});
