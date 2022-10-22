import { shallowMount } from '@vue/test-utils';
import DataTable from '@/components/DataTable.vue';

describe('DataTable.vue', () => {
  const defaultProps = {
    tableFields: ['field1', 'field2'],
    data: [{ imdbID: 'id', Title: 'title', Year: 'year' }],
    isLoading: false,
  };

  it('should render', () => {
    const wrapper = shallowMount(DataTable, {
      props: defaultProps,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should show no data when there is no data', () => {
    const wrapper = shallowMount(DataTable, {
      props: {
        ...defaultProps,
        data: [],
        isLoading: false,
      },
    });

    expect(wrapper.find('.no-data').exists()).toBe(true);
  });

  it('should show no loading when its loading', () => {
    const wrapper = shallowMount(DataTable, {
      props: {
        ...defaultProps,
        isLoading: true,
      },
    });

    expect(wrapper.find('.loading').exists()).toBe(true);
  });
});
