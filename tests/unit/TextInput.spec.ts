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

  it('should render label correctly', () => {
    const wrapper = shallowMount(TextInput, {
      props: {
        value: 'new message',
        id: 'new',
        name: 'new',
        label: 'test',
      },
    });

    expect(wrapper.findAll('label').length).toEqual(1);
    expect(wrapper.find('label').text()).toMatch(wrapper.vm.label);
  });

  it('should emit correctly', () => {
    const wrapper = shallowMount(TextInput, {
      props: {
        value: 'new message',
        id: 'new',
        name: 'new',
        label: 'test',
      },
    });

    const input = wrapper.find('input');
    input.element.value = 'newValue';
    input.trigger('input');

    expect(wrapper.emitted('input')).toBeTruthy();
  });

  it('should correctly focus', () => {
    const wrapper = shallowMount(TextInput, {
      props: {
        value: 'new message',
        id: 'new',
        name: 'new',
        label: 'test',
      },
    });

    const onFocusSpy = jest.spyOn(wrapper.vm, 'onFocus');
    const input = wrapper.find('input');
    input.element.dispatchEvent(new FocusEvent('focus'));
    wrapper.vm.onFocus();

    expect(wrapper.find('label').attributes().class).toContain('absolute top-0 block text-xs');
    expect(onFocusSpy).toHaveBeenCalled();
  });
});
