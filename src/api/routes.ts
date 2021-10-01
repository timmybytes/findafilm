export const routes = {
  trending: (page = 1): string =>
    `/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
  movies: (term, page = 1): string =>
    `/search/movie?api_key=${process.env.apiKey}&language=en-US&query=${term}&language=en-US&page=${page}`,
  movie: (movie_id, page = 1): string =>
    `movie/${movie_id}?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  credits: (movie_id, page = 1): string =>
    `/movie/${movie_id}/credits?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  popular: (page = 1): string =>
    `/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  topRated: (page = 1): string =>
    `/movie/top_rated?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  genres: (movie_id, page = 1): string =>
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.apiKey}&language=en-US&page=1`,
}
