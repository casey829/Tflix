import React from 'react'

function Search({searchMovie, setSearchMovie}) {
  return (
    <div className='search'>
      <img 
      src='./images/search.svg'
      alt='search'/>
    <input 
      type='text'
      placeholder='search for a movie'
      value={searchMovie}
      onChange={(e) => setSearchMovie(e.target.value)}
    />

    </div>
  )
}

export default Search;