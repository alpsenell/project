<template>
  <div class="w-full">
    <div
      v-if="!disableSearch && !isLoading"
      class="flex justify-start items-center"
    >
      <TextInput
        id="search"
        class="w-60 bottom-2.5"
        name="search"
        :value="titleSearchValue"
        label="Title"
        @input.self="onSearchTitle"
      />
      <span class="ml-3 p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
          <img
            src="../assets/icons/line-arrow-right.svg"
            alt="search"
            @click="$emit('search', titleSearchValue)"
          >
        </span>
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
    <div
      v-else
      class="mt-6"
    >
      <div v-if="!data.length">
        No Data
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
        <MovieRow
          v-for="item in data"
          :key="item.imdbID"
          :movie="item"
          @toggleFavourite="movie => $emit('toggleFavourite', movie)"
        />
      </div>
    </div>
    <div
      v-if="!disablePagination && !isLoading"
      class="flex flex-col justify-center mt-7"
    >
      <div class="text-xs">
        Showing {{ (page - 1) * perPage + 1 }} to
        {{ page * perPage > total ? total : page * perPage }} of {{ total }} movies.
      </div>
      <div class="text-xs">Current page: {{ page }}</div>
      <div class="mt-4 flex justify-center items-center">
        <button
          class="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="page === 1"
          @click="$emit('previousPage')"
        >
          Previous
        </button>
        <button
          class="ml-3 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="page === totalPage"
          @click="$emit('nextPage')"
        >
          Next
        </button>
        <TextInput
          id="goToPage"
          class="inline-block w-40 ml-4 bottom-2.5"
          name="Go to Page"
          label="Go to Page"
          type="number"
          :value="goToPageValue"
          @input.self="onGoToPageValueChange"
        />
        <span class="ml-3 p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
          <img
            src="../assets/icons/line-arrow-right.svg"
            alt="search"
            @keydown.enter="$emit('goToPage', goToPageValue)"
            @click="$emit('goToPage', goToPageValue)"
          >
        </span>
        <span
          class="cursor-pointer relative ml-2"
          @mouseenter="showTooltip = true"
          @mouseleave="showTooltip = false"
        >
          <img
            src="../assets/icons/info-circle.svg"
            alt="information"
          >
          <div
            v-if="showTooltip"
            class="absolute bg-white border border-gray-300 rounded-md shadow-md p-2 text-sm w-max"
          >
            Minimum page number is 1 and maximum is {{ totalPage }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, Ref, withDefaults } from 'vue';
import TextInput from '../components/TextInput.vue';
import MovieRow from '../components/MovieRow.vue';
import { TableData, TableField } from '@/utils/types';

interface Props {
  tableFields?: TableField[];
  data?: TableData[];
  isLoading: boolean;
  searchedKeyword?: string | number;
  page?: number|string;
  total?: number;
  totalPage?: number;
  perPage?: number;
  disablePagination?: boolean;
  disableSearch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tableFields: () => [],
  data: () => [],
  disablePagination: false,
  disableSearch: false,
  totalPage: 1,
});

const showTooltip: Ref<boolean> = ref(false);
const goToPageValue: Ref<number|string> = ref('');
const titleSearchValue: Ref<number|string> = ref('');

function onGoToPageValueChange(value: number|string) {
  if (parseFloat(value as string) > props.totalPage) {
    goToPageValue.value = props.totalPage;

    return;
  }

  goToPageValue.value = value;
}

function onSearchTitle(value: string|number) {
  titleSearchValue.value = value;
}

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
