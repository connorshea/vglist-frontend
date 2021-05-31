import { mount } from '@vue/test-utils';
import GameCard from '@/components/GameCard.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router/index';

describe('GameCard.vue', () => {
  it('renders platform when passed', async () => {
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
          platforms: {
            nodes: [
              {
                id: 1,
                name: 'Nintendo Switch'
              }
            ]
          },
          developers: {
            nodes: []
          }
        }
      }
    });

    expect(wrapper.text()).toMatch('Nintendo Switch');
  });
});
