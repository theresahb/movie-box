import React from 'react'
import imdb from '../../assets/imdb.svg'
import tomato from '../../assets/tomato.svg'
import './style.css'
import { Link } from 'react-router-dom'


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
}

const MovieCard = ({ movie }) => {
    
    // destructured the variables from movie
    const {title, release_date, poster_path, vote_average} = movie;

    const releasedDate = formatDate(release_date)

    return (
        <div className='card' data-testid='movie-card'>
            <div className="card-image">
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="poster" data-testid='movie-poster' />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <Link to={`/movies/${movie.id}`} key={movie.id}>
                <div className="movie-text flex">
                    <small className="release" data-testid='movie-realease-date'>{releasedDate}</small>
                    <h2 className="title" data-testid='movie-title'>{title}</h2>
                    <div className="rating flex">
                        <div className="card-rate flex">
                            <div className="imdb-image">
                                <img src={imdb} alt="" />
                            </div>
                            <p className="">{ `${vote_average} / 10` }</p>
                        </div>
                        <div className="card-rate flex">
                            <div className="imdb-image">
                                <img src={tomato} alt="" />
                            </div>
                            <p className="">97%</p>
                        </div>
                    </div>
                </div>
            </Link>
            
        </div>
    )
}

export default MovieCard