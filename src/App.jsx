import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Movie from './components/Movie';
import debounce from 'lodash.debounce';

const random = Math.round(Math.random(5.932) * 100)
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=35e316e78fdaca95b77c6ceb59fdd538&page=${random}`;
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=35e316e78fdaca95b77c6ceb59fdd538&query=";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchInput) {
      setLoading(true);
      fetch(SEARCH_API + searchInput)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));

    } else {
      setLoading(true);
      fetch(FEATURED_API)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [searchInput])

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)

  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1400);
  }, []);

  const handleSubmit = (e) => e.preventDefault();

  const renderLoading = () => {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    )
  };
  const renderNotFound = () => {
    return (
      <section className="notFound">
        <div className="img">
          <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
        </div>
        <div className="text">
          <h2>MOVIE NOT FOUND</h2>
        </div>
      </section>
    )
  }
  const renderMovies = () => {
    return movies.map(movie => (
      <Movie key={movie.id} movie={movie}
        {...movie} />
    ))
  }

  const renderContent = () => {
    if (loading) {
      return renderLoading();
    } else if (movies.length) {
      return renderMovies();
    } else {
      return renderNotFound();
    }
  }

  return (
    <>
    <header>

    <h1 className='movies-h1'>MOVIEFUL</h1>
      <div className='searchbar'>
        <form onSubmit={handleSubmit}>
          <input id='idc' onChange={debouncedResults} type="text" placeholder='Search a movie...' className='search-input' />
        </form>
      </div>
      
    </header>

      <div className='movies-container'>
        {renderContent()}
      </div>
    </>
  );
}

export default App;
