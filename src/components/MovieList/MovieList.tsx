import React from 'react'
import { Grid } from '@chakra-ui/react'
import { MovieCard } from '../MovieCard/MovieCard'

type MovieListProps = {
  movies: [
    movie: {
      title: string
      overview: string
      release_date: string
      poster_path: string
      vote_average: string
    }
  ]
}

const MovieList = ({ movies }: MovieListProps) => {
  const IMG_API = 'https://image.tmdb.org/t/p/w1280'
  return (
    <Grid
      gridGap={{ base: 2, md: 12 }}
      gridTemplateColumns='repeat(auto-fit, minmax(15rem, 1fr))'
      justifyItems='center'
      p={{ base: 2, md: 6 }}
      w='100%'>
      {Array.isArray(movies) &&
        movies.map(
          (
            { title, overview, release_date, poster_path, vote_average },
            idx
          ) => (
            <MovieCard
              key={idx}
              title={title}
              description={overview}
              image={`${IMG_API}${poster_path}`}
              badge={vote_average}
              date={release_date}
            />
          )
        )}
    </Grid>
  )
}

export default MovieList
