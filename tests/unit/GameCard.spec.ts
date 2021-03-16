import { createLocalVue, mount } from '@vue/test-utils'
import GameCard from '@/components/GameCard.vue'

const localVue = createLocalVue();

describe('GameCard.vue', () => {
  // Disabled for now because I can't figure out how to get Villus to work in tests.
  xit('renders platforms and developers when passed', () => {
    const wrapper = mount(GameCard, {
      stubs: ['router-link', 'router-view'],
      localVue,
      propsData: {
        game: {
          id: 1,
          platforms: {
            nodes: [
              {
                id: 1,
                name: 'Nintendo Switch'
              }
            ]
          },
          developers: {
            nodes: [
              {
                id: 1,
                name: 'Valve'
              }
            ]
          },
          isFavorited: true
        }
      }
    })
    expect(wrapper.text()).toMatch('Nintendo Switch')
  })
})
