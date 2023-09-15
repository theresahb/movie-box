import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'
import Loader from '../Loader/Loader'


// date in utc
const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toUTCString()
}

const MovieDetails = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`This is an HTTP Error: The status is ${response.status}`)
            }
            return response.json()
        })
        .then((actualData) => {
            setData(actualData)
            console.log(actualData)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            setData(null)
            setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })

    }, [id])

    return (
        <div className='movie-details'>
            {loading && <Loader />}

            {error && <div className='error'>{`There is a problem fetching your data - ${error.message}`}</div>}

            {data && 
                <div className='details flex'>
                    <div className="details-image"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                        key={data.id}
                    >
                        <div className="details-trailer flex">
                            <div className="play">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play-filled" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="0" fill="#ffffff"></path>
                                </svg>
                            </div>
                            <p>Watch Trailer</p>
                        </div>
                    </div>
                    <div className="details-text flex">
                        <div className="details-head flex">
                            <div className="title-head flex">
                                <h1 data-testid='movie-title'>{data.title}</h1>
                                <ul className='genre flex'>
                                    {data.genres.map((genre) => (
                                        <li key={genre.id}>{genre.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <small data-testid='movie-realease-date'>{formatDate(data.release_date)}</small>
                            <p data-testid='movie-runtime'>{data.runtime} minutes</p>
                        </div>
                        <div className="overview">
                            <p data-testid='movie-overview'>{data.overview}</p>
                        </div>
                    </div>
                </div> 
            }
        </div>
    );
}

export default MovieDetails