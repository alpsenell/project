<template>
  <div
    class="w-full flex mt-4"
    @mouseenter="showFavouriteButton = true"
    @mouseleave="showFavouriteButton = false"
  >
    <span
      v-if="showFavouriteButton || isMovieInFavourite"
      class="absolute cursor-pointer"
      @click="toggleFavourite"
    >
      <img
        src="../assets/icons/favourite.svg"
        alt="Like a movie"
        :class="animationClass"
      >
    </span>
    <span class="w-1/4">{{ movie.imdbID }}</span>
    <span class="w-1/2">{{ movie.Title }}</span>
    <span class="w-1/4">{{ movie.Year }}</span>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, defineEmits, ref, Ref, PropType } from 'vue';
import { TableData } from '@/utils/types';
import { useFavouriteStore } from '@/store/favouriteStore';
import { storeToRefs } from 'pinia';

const props = defineProps( {
  movie: {
    type: Object as PropType<TableData>,
    required: true,
  },
});

const favouriteStore = useFavouriteStore();
const { favourites } = storeToRefs(favouriteStore);

const emit = defineEmits<{
  (e: 'toggleFavourite', movie: TableData): void
}>();

const showFavouriteButton: Ref<boolean> = ref(false);
const isMovieInFavourite = computed(() => {
  return favourites.value.some((favourite) => favourite.imdbID === props.movie.imdbID);
});

const animationClass: Ref<string> = ref('');

function toggleFavourite() {
  animationClass.value = 'shockwave-animation';

  setTimeout(() => {
    animationClass.value = '';
  }, 1000);

  emit('toggleFavourite', props.movie);
}

</script>

<style lang="scss" scoped>
.shockwave-animation {
  animation: shockwaveJump 1s ease-out infinite;
}

@keyframes shockwaveJump {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.38);
  }
  50% {
    transform: scale(0.98);
  }
  55% {
    transform: scale(1.22);
  }
  60% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}
</style>
