import { mount } from '@vue/test-utils';
import Company from '@/views/companies/Company.vue';
import { createStore } from 'vuex';
import { createClient, VILLUS_CLIENT } from 'villus';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';
import { waitFor } from '@testing-library/vue';

describe('Company.vue', () => {
  it('renders games for company', async () => {
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

    const wrapper = mount(Company, {
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

    await waitFor(() => {
      expect(wrapper.get('[data-test-id="company-title"').text()).toMatch('Valve Software');
      // Should list both games developed by the company.
      expect(wrapper.get('[data-test-id="developed-games-list"').text()).toMatch('Portal 2');
      expect(wrapper.get('[data-test-id="developed-games-list"').text()).toMatch('Half-Life 2');
      // Should list both games published by the company.
      expect(wrapper.get('[data-test-id="published-games-list"').text()).toMatch('Minecraft');
      expect(wrapper.get('[data-test-id="published-games-list"').text()).toMatch('Hexcells');
    });
  });
});
