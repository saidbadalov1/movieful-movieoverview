import React from 'react'

const Movie = ({movie}) => {
    const IMG_API = "https://image.tmdb.org/t/p/w1280";
  return (
    <div className='movie'>
        <div className="movie-info">
            <img className='movie-img' src={IMG_API + movie.poster_path} alt="" />
            <div className="movie-infos">
            <p>{movie.title}</p>
            <div className="
            ">            <p className='average-p'>{movie.vote_average}</p></div>

            </div>

        </div>
    </div>
  )
}

export default Movie