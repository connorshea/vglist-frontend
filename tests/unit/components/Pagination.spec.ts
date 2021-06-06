import { mount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router';

describe('Pagination.vue', () => {
  test('basic paginating', async () => {
    const router = createRouter({ 
      history: createMemoryHistory(),
      routes
    });
    router.push("/");
    await router.isReady();

    const wrapper = mount(Pagination, {
      global: {
        plugins: [router]
      },
      props: {
        pageName: 'Games',
        startCursor: 'abc',
        endCursor: 'xyz',
        hasNextPage: true,
        hasPreviousPage: false,
        prefix: 'developed'
      }
    });

    // The dropdown defaults to having the text 'Sort by bar' and is closed.
    expect(wrapper.get('[data-test-id="pagination-previous-button"]').attributes()).toHaveProperty('disabled');
    expect(wrapper.get('[data-test-id="pagination-next-button"]').attributes()).not.toHaveProperty('disabled');

    // Flip the properties to make sure the alternative states work correctly.
    await wrapper.setProps({ hasNextPage: false, hasPreviousPage: true })

    expect(wrapper.get('[data-test-id="pagination-previous-button"]').attributes()).not.toHaveProperty('disabled');
    expect(wrapper.get('[data-test-id="pagination-next-button"]').attributes()).toHaveProperty('disabled');
  });
});
