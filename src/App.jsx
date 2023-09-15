import { Route, Routes } from 'react-router-dom'
import './App.css'
import MovieDetails from './components/MovieDetails/MovieDetails'
import MovieList from './components/MovieList/MovieList'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MovieList />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
      </Routes>
    </div>
  )
}

export default App
