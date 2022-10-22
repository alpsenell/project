import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import MovieRow from '@/components/MovieRow.vue';
import { useFavouriteStore } from '@/store/favouriteStore';

describe('MovieRow.vue', () => {

  it('should render movie row', () => {
    const wrapper = mount(MovieRow, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        movie: {
          imdbID: 'ID',
          Title: 'test',
          Year: '2021',
        },
      },
    });

    const favouriteStore = useFavouriteStore();

    favouriteStore.$patch({ favourites: [{ imdbID: 2, Title: 'Title', Year: 'Year' }] });
    expect(favouriteStore.favourites).toStrictEqual([{ imdbID: 2, Title: 'Title', Year: 'Year' }]);
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.findAll('span').length).toBe(3);
    expect(wrapper.find('span').text()).toBe('ID');
  });
});
