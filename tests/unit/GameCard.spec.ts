import { mount } from '@vue/test-utils';
import GameCard from '@/components/GameCard.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router/index';

describe('GameCard.vue', () => {
  it('renders platforms and developers', async () => {
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

    const wrapper = mount(GameCard, {
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
        game: {
          id: 1,
          name: "Kirby's Epic Yarn",
          platforms: {
            nodes: [
              {
                id: 1,
                name: 'Nintendo Switch'
              }
            ]
          },
          developers: {
            nodes: [
              {
                id: 2,
                name: 'Nintendo'
              }
            ]
          }
        }
      }
    });

    expect(wrapper.get('[data-test-id="game-card-title"').text()).toMatch("Kirby's Epic Yarn");
    expect(wrapper.get('[data-test-id="game-card-developers"').text()).toMatch('Nintendo');
    expect(wrapper.get('[data-test-id="game-card-platforms"').text()).toMatch('Nintendo Switch');
  });
});
