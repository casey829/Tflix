import React from 'react'

const MovieCard = ({movie: {
    title,vote_average,poster_path, release_date, original_language
}}) => {
  return (
    <div>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'}
        alt='title'
      />
      <div className='mt-4'>
          <h3 className='text-white'>{title}</h3>
      </div>

      <div className='flex items-center space-x-2'>
      <div className='rating flex items-center'>
        <img 
          src='./images/star.svg'
          alt='Star Icon'
          className='w-4 h-4'
        />
        <p className='text-white ml-1'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
      </div>
      <span className='text-gray-400'>•</span>
      <p className='lang text-gray-200'>{original_language}</p>
      <span className='text-gray-400'>•</span>
      <p className='year text-white'>
        {release_date ? release_date.split('-')[0] : 'N/A'}
      </p>
    </div>
    </div>
  )
}

export default MovieCard