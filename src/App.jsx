import React, { useState } from 'react'
import Search from './components/Search'

function App() {

  const [searchMovie, setSearchMovie] = useState('');

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
      </div>
   </main>
  )
}

export default App