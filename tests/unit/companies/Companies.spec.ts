import { mount } from '@vue/test-utils';
import Companies from '@/views/companies/Companies.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import waitForExpect from 'wait-for-expect';

describe('Companies.vue', () => {
  it('renders companies for companies list', async () => {
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

    const wrapper = mount(Companies, {
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
      }
    });

    await waitForExpect(() => {
      expect(wrapper.find('[data-test-id="create-company-button"').exists()).toBe(true);
      expect(wrapper.get('[data-test-id="companies-list"').text()).toMatch('Valve Software');
      expect(wrapper.get('[data-test-id="companies-list"').text()).toMatch('Nintendo');
    });
  });
});
