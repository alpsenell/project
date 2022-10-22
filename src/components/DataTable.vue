<template>
  <div class="w-full">
    <div class="w-60">
      <TextInput
        id="search"
        name="search"
        :value="searchedKeyword"
        label="Title"
        @input.self="value => $emit('search', value)"
      />
    </div>
    <div
      v-if="isLoading"
      class="w-full h-full flex justify-center items-center"
    >
      <div class="loading | flex justify-center items-center relative w-32 h-32">
        <div
          v-for="index in 4"
          :key="index"
          class="absolute w-10 h-10 m-2 border-4 border-white border-solid rounded-full"
        />
      </div>
    </div>
    <div v-else>
      <div class="flex pb-3 border-b">
        <div
          v-for="field in tableFields"
          :key="field.title"
          class="font-bold"
          :class="field.width"
        >
          {{ field.title }}
        </div>
      </div>
      <div
        v-for="item in data"
        :key="item.imdbID"
        class="w-full flex"
      >
        <span class="w-1/4">{{ item.imdbID }}</span>
        <span class="w-1/2">{{ item.Title }}</span>
        <span class="w-1/4">{{ item.Year }}</span>
      </div>
    </div>
    <div class="flex flex-col justify-center mt-4">
      <div>
        Showing {{ (page - 1) * perPage + 1 }} to
        {{ page * perPage > total ? total : page * perPage }} of {{ total }} entries
      </div>
      <div class="mt-2">
        <button
          class="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          :disabled="page === 1"
          @click="$emit('previousPage')"
        >
          Previous
        </button>
        <button
          class="ml-3 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          :disabled="page === totalPage"
          @click="$emit('nextPage')"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import TextInput from '../components/TextInput.vue';
import { TableData, TableField } from '@/utils/types';

interface Props {
  tableFields?: TableField[];
  data?: TableData[];
  isLoading: boolean;
  searchedKeyword: string | number;
  page: number;
  total: number;
  totalPage: number;
  perPage: number;
}

const props = withDefaults(defineProps<Props>(), {
  tableFields: () => [],
  data: () => [],
});

</script>

<style scoped lang="scss">
@keyframes loading-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  div {
    animation: loading-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000000 transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

</style>
