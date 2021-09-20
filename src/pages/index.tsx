import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [movies, setMovies] = useState([])
  const [inputTerm, setInputTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchMovies(searchTerm: string) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=06cbaaa0bc746189acc7b951e418cf85&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      )
      const movieData = await response.json()
      // waits until the request completes...
      console.log(movieData.results)
      setMovies(movieData.results)
    }

    fetchMovies(searchTerm)
  }, [searchTerm])

  const IMG_API = 'https://image.tmdb.org/t/p/w1280'
  const imageLoader = src => {
    return `${IMG_API}${src}`
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} style={{ height: '20vh' }}>
        <label htmlFor='search' style={{ padding: '2rem' }}>
          Search for movies
        </label>
        <input
          type='text'
          id='search'
          value={inputTerm}
          onChange={e => setInputTerm(e.target.value)}
          style={{ margin: '2rem' }}
        />
        <button
          onClick={() => {
            setSearchTerm(inputTerm)
            setInputTerm('')
          }}
          style={{ margin: '2rem' }}>
          Go!
        </button>
      </form>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'minmax(1fr, 600px) minmax(1fr, 600px) minmax(1fr, 600px)',
          gridGap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          padding: '1.5rem',
          maxWidth: '1900px',
        }}>
        {Array.isArray(movies) &&
          movies.map(
            (
              { title, overview, release_date, poster_path, vote_average },
              idx
            ) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'stretch',
                  alignItems: 'center',
                  // maxHeight: '600px',
                  // maxWidth: '600px',
                  padding: '1rem',
                  margin: '1rem 0 1rem 0',
                  borderRadius: '10px',
                  border: '2px solid #3c3c3c',
                  // position: 'relative',
                }}>
                <h2 style={{ fontSize: '2.5rem' }}>{title}</h2>
                <div className='image-container' style={{ maxWidth: '300px' }}>
                  <Image
                    src={`${IMG_API}${poster_path}`}
                    alt={`${title} poster`}
                    layout='fill'
                    className='image'
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '75ch',
                    padding: '1rem',
                  }}>
                  <p>
                    {release_date} | {vote_average}
                  </p>
                  <p
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      fontSize: '1rem',
                      lineHeight: '1.5rem',
                      // maxHeight: '3rem',
                      maxLines: 2,
                      lineClamp: 2,
                    }}>
                    {overview}
                  </p>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default Home
