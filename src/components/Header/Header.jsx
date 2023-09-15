import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import imdb from '../../assets/imdb.svg'
import tomato from '../../assets/tomato.svg'
import './style.css'
import Loader from '../Loader/Loader'

const Header = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_KEY}`
        }
    };
    
    

    useEffect(() => {

        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`This is an HTTP Error: The status is ${response.status}`)
            }
            return response.json()
        })
        .then((actualData) => {
            setData(actualData.results)
            console.log(actualData.results)
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

    }, [])

    // retrieving random movies to display
    const randomMovie = data && data[Math.floor(Math.random() * data.length)]
     
    return (
        <header>
            {loading && <Loader />}
            {error && <div className='error'>{`There is a problem fetching your data - ${error.message}`}</div>}
            <div className="header">
                <div className='hero flex'>
                    {randomMovie && (
                        <div className="banner flex"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '100vh',
                        }}
                        key={randomMovie.id}>
                            <Navbar />
                            <div className="hero-details flex">
                                <h1>{randomMovie.title}</h1>
                                <div className="header-rating flex">
                                    <div className="rate flex">
                                        <div className="imdb-image">
                                            <img src={imdb} alt="" />
                                        </div>
                                        <p className="">{ `${randomMovie.vote_average} / 10` }</p>
                                    </div>
                                    <div className="rate flex">
                                        <div className="imdb-image">
                                            <img src={tomato} alt="" />
                                        </div>
                                        <p className="">97%</p>
                                    </div>
                                </div>
                                <p>{randomMovie.overview}</p>
                                <button className="trailer flex">
                                    <div className="home-play">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play-filled" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="0" fill="#BE123C"></path>
                                        </svg>
                                    </div>
                                    Watch Trailer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
            </div>
        </header>
    )
}

export default Header