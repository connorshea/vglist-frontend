import { mount } from '@vue/test-utils';
import GameCard from '@/components/GameCard.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';

describe('GameCard.vue', () => {
  xit('renders platform when passed', () => {
    const store = createStore({
      state() {
        return { userSignedIn: true };
      }
    });

    const wrapper = mount(GameCard, {
      global: {
        plugins: [store],
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
          }
        }
      }
    });

    expect(wrapper.text()).toMatch('Nintendo Switch');
  });
});
