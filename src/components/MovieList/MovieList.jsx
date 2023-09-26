import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './style.css'
import Header from '../Header/Header'
import Loader from '../Loader/Loader'
import Footer from '../Footer/Footer'

const MovieList = () => {
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

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`This is an HTTP Error: The status is ${response.status}`)
            }
            return response.json()
        })
        .then((actualData) => {
            const movieData = actualData.results
            setData(movieData)
            console.log(actualData.results)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            setData(null)
        })
        .finally(() => {
          setLoading(false)
        })

    }, [])
    
    return (
        <div className="homepage">
            {loading && <Loader />}
            
            {error && <div className='error'>{`There is a problem fetching your data - ${error.message}`}</div>}

            <Header />
            <div className='featured flex'>
                <div className='heading flex'>
                    <h1>Featured Movie</h1>
                    <div className="see-more flex">
                        <a href="/" className='see flex'>
                            <p>See more</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#BE123C" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="featured-movies">
                    {data && data.map((movie) => {
                        return (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
        
    )
}

export default MovieList