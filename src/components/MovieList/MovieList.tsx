import { Grid } from '@chakra-ui/react'
import { DataContext } from '@context/DataContext'
import React, { useContext } from 'react'
import { MovieCard } from '../MovieCard'

export const MovieList = (): React.ReactElement => {
  const IMG_API = 'https://image.tmdb.org/t/p/w1280'
  const { movies, isLoading } = useContext(DataContext)
  return (
    <Grid
      gridGap={2}
      gridTemplateColumns={{
        base: 'auto auto',
        md: 'repeat(auto-fit, minmax(15rem, 1fr) )',
      }}
      justifyItems='center'
      p={{ base: 4, md: 6 }}
      w='100%'
    >
      {isLoading ? (
        <p>Loading results...</p>
      ) : (
        Array.isArray(movies) &&
        movies.map(
          ({
            title,
            overview,
            release_date,
            poster_path,
            vote_average,
            id,
          }) => (
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
        )
      )}
    </Grid>
  )
}

export default MovieList
