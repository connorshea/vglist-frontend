import { config, mount } from '@vue/test-utils';
import GameInfobox from '@/components/GameInfobox.vue';
import { Game } from '@/generated/graphql';
import { routes } from '@/router';
import { createMemoryHistory, createRouter } from 'vue-router';
import { pluralize } from '@/pluralize';

// Include the pluralize filter rather than mocking it.
config.global.mocks = {
  $filters: { pluralize: pluralize }
};

describe('viewing information about a game', () => {
  it("works when there's minimal information about the game", async () => {
    const router = createRouter({ 
      history: createMemoryHistory(),
      routes
    });
    router.push("/");
    await router.isReady();

    const wrapper = mount(GameInfobox, {
      global: {
        plugins: [router]
      },
      props: {
        game: {
          id: 1,
          name: "Kirby's Epic Yarn",
          platforms: {
            nodes: []
          },
          developers: {
            nodes: []
          },
          publishers: {
            nodes: []
          },
          engines: {
            nodes: []
          },
          genres: {
            nodes: []
          },
          series: null,
          wikidataId: null,
          mobygamesId: null,
          epicGamesStoreId: null,
          pcgamingwikiId: null,
          giantbombId: null,
          gogId: null,
          igdbId: null,
          steamAppIds: [],
          releaseDate: null,
          avgRating: null
        } as unknown as Game
      }
    });

    const selectors = [
      'game-infobox-publishers',
      'game-infobox-developers',
      'game-infobox-platforms',
      'game-infobox-genres',
      'game-infobox-engines',
      'game-infobox-series',
      'game-infobox-release-date',
      'game-infobox-external-links'
    ];

    // Check that all these selectors are non-existant since they have no data.
    selectors.forEach((selector) => {
      expect(wrapper.find(`[data-test-id="${selector}"]`).exists()).toBe(false);
    });

    expect(wrapper.find('[data-test-id="game-infobox-avg-rating"]').exists()).toBe(true);
  });

  it("works when there's lots of information about the game", async () => {
    const router = createRouter({ 
      history: createMemoryHistory(),
      routes
    });
    router.push("/");
    await router.isReady();

    const wrapper = mount(GameInfobox, {
      global: {
        plugins: [router]
      },
      props: {
        game: {
          id: 1,
          name: "Kirby's Epic Yarn",
          platforms: {
            nodes: [
              {
                id: 1,
                name: 'Nintendo Switch'
              },
              {
                id: 2,
                name: 'Nintendo Wii'
              }
            ]
          },
          developers: {
            nodes: [
              {
                id: 2,
                name: 'HAL'
              }
            ]
          },
          publishers: {
            nodes: [
              {
                id: 1,
                name: 'Nintendo'
              }
            ]
          },
          engines: {
            nodes: [
              {
                id: 1,
                name: 'Unreal Engine'
              }
            ]
          },
          genres: {
            nodes: [
              {
                id: 1,
                name: 'Platformer'
              }
            ]
          },
          series: {
            id: 1,
            name: 'Kirby'
          },
          wikidataId: 'Q12345',
          mobygamesId: 'kirbys-epic-yarn',
          epicGamesStoreId: 'kirbys-epic-yarn',
          pcgamingwikiId: 'Kirbys_Epic_Yarn',
          giantbombId: '3030-1234',
          gogId: 'game/kirbys-epic-yarn',
          igdbId: 'kirbys-epic-yarn',
          steamAppIds: [123, 456],
          releaseDate: null,
          avgRating: 99
        } as unknown as Game
      }
    });

    const selectors = [
      'game-infobox-publishers',
      'game-infobox-developers',
      'game-infobox-platforms',
      'game-infobox-genres',
      'game-infobox-engines',
      'game-infobox-series',
      'game-infobox-external-links'
    ];

    // Check that all these selectors are extant since they have data.
    selectors.forEach((selector) => {
      expect(wrapper.find(`[data-test-id="${selector}"]`).exists()).toBe(true);
    });

    expect(wrapper.find('[data-test-id="game-infobox-release-date"]').exists()).toBe(false);
  });
});
