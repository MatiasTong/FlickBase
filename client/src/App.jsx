import React, { useState, useEffect, useCallback, useReducer } from "react"


import List from "./components/List"
import SearchForm from "./components/SearchForm"
import NavBar from "./components/NavBar"
import axios from "axios"
import moviesReducer from "./reducers/moviesReducer"
import './App.css';

console.log()

function App() {
  const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=`

  const [searchTerm, setSearchTerm] = useState("")
  // const [movies, setMovies] = useState("")

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=dragon`
  )

  const [movies, dispatchMovies] = useReducer(moviesReducer,
    { data: [], isLoading: false, isError: false });

  const handleSearchInput = (value) => {
    setSearchTerm(value)
  }

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    console.log(`${API_ENDPOINT}${searchTerm}`)
  }

  // const handleFetchStories = useCallback(async () => {
  //   const res = await axios.get(url);
  //   setMovies(res.data.results)
  //   console.log("handle fetch")
  //   console.log(movies)
  // }, [url]);

  const handleFetchStories = useCallback(async () => {
    dispatchMovies({ type: 'MOVIES_FETCH_INIT' })
    try {
      const result = await axios.get(url);

      dispatchMovies({
        type: 'MOVIES_FETCH_SUCCESS',
        payload: result.data.results,
      });
    } catch(err) {
      dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' });
    }
  }, [url]);

  // useEffect(() => {
  //   handleFetchStories();
  // }, [])

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories])





  return (
    <div className="App">
      <NavBar />

      <SearchForm
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm} />

      {movies.isError && <p>Something went wrong ...</p>}
      {movies.isLoading ? (
        <p>Loading ...</p>
      ) : (
          movies.data.length !== 0 ? <List movies={movies.data} searchTerm={searchTerm} />:
          <h1> oops...couldn't find any movies with that title</h1>
        )}
    </div>


  );
}

export default App;
