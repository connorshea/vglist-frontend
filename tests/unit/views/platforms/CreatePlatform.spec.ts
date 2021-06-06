import { mount } from '@vue/test-utils';
import CreatePlatform from '@/views/platforms/CreatePlatform.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('CreatePlatform.vue', () => {
  it('renders platform form', async () => {
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

    const wrapper = mount(CreatePlatform, {
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
      }
    });

    await waitForExpect(() => {
      expect(wrapper.get('[data-test-id="form-title"').text()).toMatch('Creating a new platform');
    });
  });
});
