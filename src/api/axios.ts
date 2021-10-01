import axios from 'axios'

export const TMDB = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
})
