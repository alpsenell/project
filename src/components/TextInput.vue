<template>
  <div class="form__group field relative mt-2.5 bg-transparent pt-4">
    <input
      class="form__field w-full py-2 border-b-2 border-solid border-gray-200 text-black outline-0 text-sm focus:border-gray-600"
      :name="name"
      :id="id"
      :required="required"
      :value="value"
      :type="type"
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
  type?: string;
  name: string;
  id: string;
  required?: boolean;
}

const focusClass = ref('');
withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  type: 'text',
});

function onFocus(state: boolean) {
  state ? focusClass.value = 'absolute top-0 block text-xs' : focusClass.value = '';
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
  -moz-appearance:textfield; /* Firefox */
}
</style>
