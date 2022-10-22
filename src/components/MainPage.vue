<template>
  <div class="max-w-screen-xl mx-auto">
    <DataTable
      :is-loading="isLoading"
      :table-fields="fields"
      :data="movieState.data"
      :page="movieState.page"
      :total="movieState.total"
      :total-page="movieState.totalPage"
      :per-page="movieState.perPage"
      :searched-keyword="movieState.title"
      @nextPage="handleNextPage"
      @previousPage="handlePreviousPage"
      @search="handleSearch"
      @toggleFavourite="onFavourite"
      @goToPage="onGoToPage"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import {TableData, TableField} from '@/utils/types';
import { MovieState } from '@/utils/interfaces';
import { useFavouriteStore } from '@/store/favouriteStore';
import DataTable from '../components/DataTable.vue';

// Store
const favouriteStore = useFavouriteStore();
const { favourites } = storeToRefs(favouriteStore);

// Variables
const isLoading = ref(false);
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
const movieState: MovieState = reactive({
  page: 1,
  perPage: 20,
  total: 0,
  totalPage: 0,
  title: '',
  data: [],
});

async function fetchMovieList() {
  isLoading.value = true;

  const titleQuery = movieState.title ? `?Title=${movieState.title}&` : '?';
  const { data } = await axios.get(
    `https://jsonmock.hackerrank.com/api/movies/${titleQuery}page=${movieState.page}`,
  );
  const { page, per_page, total, total_pages } = data;

  movieState.page = page;
  movieState.perPage = per_page;
  movieState.total = total;
  movieState.totalPage = total_pages;
  movieState.data = data.data;
  isLoading.value = false;
}

function handleNextPage() {
  movieState.page += 1;
  fetchMovieList();
}

function handlePreviousPage() {
  movieState.page -= 1;
  fetchMovieList();
}

function handleSearch(searchInput: string | number) {
  if (movieState.page !== 1) {
    movieState.page = 1;
  }

  movieState.title = searchInput;
  fetchMovieList();
}

function onFavourite(movie: TableData) {
  favouriteStore.toggleFavourite(movie);
}

function onGoToPage(page: number) {
  movieState.page = page;
  fetchMovieList();
}

fetchMovieList();
</script>
