<template>
  <div class="hello">
    <DataTable :data="movies" :table-fields="fields" />
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import type { Ref } from 'vue'
  import DataTable from '../components/DataTable.vue';
  import { TableData, TableField } from '@/types/types';

  const movies: Ref<TableData[]> = ref([]);
  const fields: Ref<TableField[]> = ref([
    {
      title: 'Title',
      width: 'w-1/2',
    }, {
      title: 'Year',
      width: 'w-1/4',
    },
  ]);

  async function fetchMovieList() {
    const { data } = await axios.get('https://jsonmock.hackerrank.com/api/movies/');

    movies.value = data.data;
  }

  fetchMovieList();
</script>
