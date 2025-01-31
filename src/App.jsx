import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite'
import Footer from './components/Footer'


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

  const [trendingMovies, setTrendingMovies] = useState([]);

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

   if(query && data.results.length > 0){
     await updateSearchCount(query, data.results[0])
   }
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

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`error fetching trending movies: ${error}`);
  
    }
  }

useEffect(()=> {
  fetchMovies(debouncedSearchMovie)
}, [debouncedSearchMovie])

useEffect(()=> {
  loadTrendingMovies();
}, [])
  return (
    
   <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <h1 className='text-blue-300 font-sans md:font-serif ...'>Tflix</h1>
          <img 
            src='./images/hero-img.png'
            alt='Hero banner'
          />
          <h1>Streamline Your <span className='text-gradient'>Movie</span> Nights—Find Films in a Flash!</h1>

          <Search  searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>
          
        </header>
       {trendingMovies.length > 0 &&(
        <section className='trending'>
          <h2 className='text-white'>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
            <p>{index + 1}</p>
            <img src={movie.poster_url}
              alt={movie.title}
            />
              </li>
            ))}
          </ul>
   
        </section>
       )}

        <section>
          <h2 >All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </div>
          )}   
        </section>
      </div>
      <Footer />
   </main>
  
  )
}

export default App