import { mount } from '@vue/test-utils';
import Game from '@/views/games/Game.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Game.vue', () => {
  it('renders information about game', async () => {
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

    const wrapper = mount(Game, {
      global: {
        plugins: [
          store,
          router
        ],
        stubs: [
          'SvgIcon',
          'GameInfobox',
          'AddGameToLibrary',
          'MergeGamesButton'
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

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="game-title"').text()).toMatch('Half-Life 2');
      // Should not display 'other games in this series' if there are no other games.
      expect(wrapper.find('[data-test-id="game-others-in-series-card"').exists()).toBe(false);
      // Should not display any favorites or owners when there are none.
      expect(wrapper.get('[data-test-id="game-favorites"').text()).toMatch('No one has favorited this game yet.');
      expect(wrapper.get('[data-test-id="game-owners"').text()).toMatch('No one has this game in their library yet.');
    });
  });
});
