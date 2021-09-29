import { render } from '@test/test-utils'
import { MovieCard } from './MovieCard'

describe('MovieCard', () => {
  it('should render', () => {
    const movie = {
      id: 123,
      badge: 'string',
      image: 'string/stringnull',
      title: 'Movie: The Movie',
      description: 'lorem ipsum movies',
      date: '2020-01-01',
    }
    render(
      <MovieCard
        badge={movie.badge}
        image={movie.image}
        id={movie.id}
        title={movie.title}
        description={movie.description}
        date={movie.date}
      />
    )
  })
})
