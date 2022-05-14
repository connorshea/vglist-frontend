import { mount } from '@vue/test-utils';
import CreateCompany from '@/views/companies/CreateCompany.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('CreateCompany.vue', () => {
  it('renders company form', async () => {
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

    const wrapper = mount(CreateCompany, {
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

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="form-title"').text()).toMatch('Creating a new company');
    });
  });
});
