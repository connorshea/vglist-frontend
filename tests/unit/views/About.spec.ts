import { mount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('About.vue', () => {
  it('renders', () => {
    const wrapper = mount(About);

    expect(wrapper.text()).toMatch('About vglist');
  });
});
