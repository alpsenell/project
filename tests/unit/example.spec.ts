import { shallowMount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';

describe('TextInput.vue', () => {
  it('should be rendered', () => {
    const wrapper = shallowMount(TextInput, {
      props: {
        value: 'new message',
        id: 'new',
        name: 'new',
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
