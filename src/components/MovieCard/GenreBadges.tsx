import { Badge, Box } from '@chakra-ui/react'
import React from 'react'

type GenreProps = {
  genres: [{ name: string }]
}

export const GenreBadges = ({ genres }: GenreProps) => {
  const genrePalette = [
    'blue',
    'red',
    'orange',
    'purple',
    'green',
    'pink',
    'teal',
    'purple',
  ]

  return (
    <Box d='flex' gridGap={2} flexWrap='wrap'>
      {genres &&
        genres.map((genre: any, idx: any) => {
          return (
            <Badge
              key={idx}
              rounded='md'
              py={0.5}
              px={1.5}
              mx={0}
              colorScheme={genrePalette[idx % 4]}>
              {genre.name}
            </Badge>
          )
        })}
    </Box>
  )
}
