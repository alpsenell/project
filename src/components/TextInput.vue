<template>
  <div class="form__group field relative mt-2.5 bg-transparent pt-4">
    <input
      class="form__field w-full py-2 border-b-2 border-solid border-gray-200 text-black outline-0 text-sm focus:border-gray-600"
      :name="name"
      :id="id"
      :required="required"
      :value="value"
      autocomplete="off"
      @focusin="onFocus(true)"
      @focusout="onFocus(false)"
      @input="$emit('input', $event.target.value)"
    />
    <label
      :for="name"
      class="form__label absolute block duration-300 top-5 text-sm"
      :class="[focusClass, { 'absolute top-0 block text-xs': value !== '' }]"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, withDefaults} from 'vue';

interface Props {
  value: string | number;
  label?: string;
  name: string;
  id: string;
  required?: boolean;
}

const focusClass = ref('');
const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
});

function onFocus(state: boolean) {
  state ? focusClass.value = 'absolute top-0 block text-xs' : focusClass.value = '';
}
</script>
