import { mount } from '@vue/test-utils';
import SortDropdown from '@/components/SortDropdown.vue';

test('sorting with dropdown', async () => {
  const wrapper = mount(SortDropdown, {
    global: {
      stubs: ['SvgIcon']
    },
    props: {
      sortOptions: [
        {
          name: 'Foo',
          value: 'foo'
        },
        {
          name: 'Bar',
          value: 'bar',
        }
      ],
      initialSortOption: 'Bar'
    }
  });

  // The dropdown defaults to having the text 'Sort by bar' and is closed.
  expect(wrapper.get('[data-test-id="active-sort-option"]').text()).toMatch('Sort by bar');
  expect(wrapper.get('[data-test-id="sort-dropdown-root"]').classes()).not.toContain('is-active');

  await wrapper.find('.dropdown-trigger').trigger('click');

  // Now that we've clicked the dropdown, it's open and active.
  expect(wrapper.get('[data-test-id="sort-dropdown-root"]').classes()).toContain('is-active');

  // Click the 'foo' (first) option.
  await wrapper.findAll('.dropdown-item')[0].trigger('click');

  // Changes the active sort option text.
  expect(wrapper.get('[data-test-id="active-sort-option"]').text()).toMatch('Sort by foo');
});
