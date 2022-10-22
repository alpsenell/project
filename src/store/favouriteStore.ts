import { defineStore } from 'pinia';

interface Movie {
  imdbID: string | number;
  Title: string | number;
  Year: string | number;
}
interface FavouriteStoreState {
  favourites: Movie[];
}

export const useFavouriteStore = defineStore('favourite', {
  state: (): FavouriteStoreState => {
    return {
      favourites: [],
    };
  },
  getters: {
    favouriteCount: (state): number => state.favourites.length,
  },
  actions: {
    toggleFavourite(movie: Movie): void {
      const index = this.favourites.findIndex(
        (favourite) => favourite.imdbID === movie.imdbID,
      );

      if (index !== -1) {
        this.favourites.splice(index, 1);

        return;
      }

      this.favourites.push(movie);
    },
  },
});
