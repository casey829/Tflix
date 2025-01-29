import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'


const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
      accept:'application/json',
      Authorization:`Bearer ${API_KEY}`

  }
}

function App() {

  const [searchMovie, setSearchMovie] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

   // The Debounce search movie to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  const [debouncedSearchMovie, setDebouncedSearchMovie] = useState('')

  useDebounce(()=> setDebouncedSearchMovie(searchMovie), 500,[searchMovie])

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');


     try {
        const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`:
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS) 

    if(!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const data = await response.json()

    setMovieList(data.results);

    if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
    }
     } catch (error) {
      console.log(`Error while fetching the movie ${error}`);
      setErrorMessage('Please try again later.');
     }
     finally {
      setIsLoading(false)
     }

  }

useEffect(()=> {
  fetchMovies(debouncedSearchMovie)
}, [debouncedSearchMovie])

  return (
    
   <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img 
            src='./images/hero-img.png'
            alt='Hero banner'
          />
          <h1>Streamline Your <span className='text-gradient'>Movie</span> Nights—Find Films in a Flash!</h1>

          <Search  searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>
          <h1 className='text-white'>{searchMovie}</h1>
        </header>
        <section>

          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
               <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}   
        </section>
      </div>
   </main>
  )
}

export default App