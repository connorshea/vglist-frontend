import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import GameCard from '@/components/GameCard.vue'

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('GameCard.vue', () => {
  // Disabled for now because I can't figure out how to get Villus to work in tests.
  xit('renders platforms and developers when passed', () => {
    const wrapper = shallowMount(GameCard, {
      localVue,
      router,
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
