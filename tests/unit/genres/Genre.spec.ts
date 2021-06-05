import { mount } from '@vue/test-utils';
import Genre from '@/views/genres/Genre.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Genre.vue', () => {
  it('renders games for genre', async () => {
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

    const wrapper = mount(Genre, {
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
        id: '1'
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="genre-title"').text()).toMatch('first-person shooter');
      // Should list both games on the platform.
      expect(wrapper.get('[data-test-id="genre-games-list"').text()).toMatch('Half-Life 1');
      expect(wrapper.get('[data-test-id="genre-games-list"').text()).toMatch('Half-Life 2');
    });
  });
});
