<template>
  <div class="max-w-screen-xl mx-auto">
    <DataTable
      :is-loading="false"
      :table-fields="fields"
      :data="favourites"
      disable-pagination
      disable-search
    />
  </div>
</template>

<script lang="ts" setup>
import {ref, Ref} from 'vue';
import { storeToRefs } from 'pinia';
import DataTable from '@/components/DataTable';
import { useFavouriteStore } from '@/store/favouriteStore';
import {TableField} from '@/utils/types';

// Store
const favouriteStore = useFavouriteStore();
const { favourites } = storeToRefs(favouriteStore);

const fields: Ref<TableField[]> = ref([
  {
    title: 'ID',
    width: 'w-1/4',
    name: 'imdbID',
  },
  {
    title: 'Title',
    width: 'w-1/2',
    name: 'Title',
  },
  {
    title: 'Year',
    width: 'w-1/4',
    name: 'Year',
  },
]);
</script>
