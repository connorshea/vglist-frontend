import { mount } from '@vue/test-utils';
import EditStore from '@/views/stores/EditStore.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('EditStore.vue', () => {
  it('renders store form', async () => {
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

    const wrapper = mount(EditStore, {
      global: {
        plugins: [
          store,
          router
        ],
        provide: {
          [VILLUS_CLIENT as symbol]: createClient({
            url: 'http://test/graphql',
          })
        }
      },
      props: {
        id: '1'
      }
    });

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="form-title"').text()).toMatch('Editing Nintendo eShop');
    });
  });
});
