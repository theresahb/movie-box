import React from 'react'
import './style.css'

const Search = () => {
  return (
    <div className='search-form flex'>
        <form action="#">
            <input type="search" name="search" id="" placeholder='What do you want to watch?' />
        </form>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
        </svg>
    </div>
  )
}

export default Search