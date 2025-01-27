import React, { useState, useEffect } from 'react'
import Search from './components/Search'

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

  const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMessage('');


     try {
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

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
  fetchMovies()
}, [])

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

          <h2>All Movies</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
               <p key={movie.id} className='text-white'>{movie.title}</p> 
              ))}
            </ul>
          )}   
        </section>
      </div>
   </main>
  )
}

export default App