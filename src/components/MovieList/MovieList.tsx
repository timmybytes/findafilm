import { Grid } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { QueueContext } from '../../context/QueueContext'
import { MovieCard } from '../MovieCard/MovieCard'

export const MovieList = () => {
  const IMG_API = 'https://image.tmdb.org/t/p/w1280'
  const { movies } = useContext(QueueContext)
  return (
    <Grid
      gridGap={2}
      gridTemplateColumns={'repeat(auto-fit, minmax(15rem, 1fr))'}
      justifyItems='center'
      p={{ base: 4, md: 6 }}
      w='100%'>
      {Array.isArray(movies) &&
        movies.map(
          (
            { title, overview, release_date, poster_path, vote_average, id },
            idx
          ) => (
            <MovieCard
              key={id}
              id={id}
              title={title}
              description={overview}
              image={`${IMG_API}${poster_path}`}
              badge={vote_average}
              date={release_date || '0000'}
            />
          )
        )}
    </Grid>
  )
}

export default MovieList
