import React, { useState, useEffect, useCallback, useReducer } from "react"
import List from "../components/List"
import SearchForm from "../components/SearchForm"
import NavBar from "../components/NavBar"
import axios from "axios"
import moviesReducer from "../reducers/moviesReducer"
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Home() {
    const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=`
    // &sort_by=release_date.desc
    const [searchTerm, setSearchTerm] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    // const [movies, setMovies] = useState("")

    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`
    )

    const [movies, dispatchMovies] = useReducer(moviesReducer,
        { data: [], resultsCount: 0, page: 1, pagesCount: 0, isLoading: false, isError: false });

    const [sortOption, setSortOption] = useState("")

    const handleSearchInput = (value) => {
        setSearchTerm(value)
    }

    const handleSearchSubmit = () => {
        setIsSubmit(true)
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        console.log(`${API_ENDPOINT}${searchTerm}`)
        // setIsSubmit(false)
    }


    // const handleFetchStories = useCallback(async () => {
    //   const res = await axios.get(url);
    //   setMovies(res.data.results)
    //   console.log("handle fetch")
    //   console.log(movies)
    // }, [url]);

    const handleFetchMovies = useCallback(async () => {
        console.log(`fetched ${API_ENDPOINT}${searchTerm}`)
        dispatchMovies({ type: 'MOVIES_FETCH_INIT' })
        try {
            const result = await axios.get(url);
            dispatchMovies({
                type: 'MOVIES_FETCH_SUCCESS',
                payload: result,
            });
        } catch (err) {
            dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' });
        }
    }, [url]);

    const handleFetchScroll = async () => {
        console.log(`fetched scroll ${API_ENDPOINT}${searchTerm}`)
        console.log(movies.page + 1)
        dispatchMovies({ type: 'MOVIES_FETCH_INIT' })
        try {
            const result = await axios.get(`${url}&page=${movies.page + 1}`);
            dispatchMovies({
                type: 'MOVIES_FETCH_SCROLL_SUCCESS',
                payload: result,
            });
        } catch (err) {
            dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' });
        }
    };

    const handleSortSelect = (event) => {
        setSortOption(event.target.value)
    }

    // useEffect(() => {
    //   handleFetchStories();
    // }, [])

    useEffect(() => {
        handleFetchMovies();
    }, [handleFetchMovies])

    return (
        <div className="App">


            <NavBar />
            <SearchForm 
              onSearchInput={handleSearchInput}
              onSearchSubmit={handleSearchSubmit}
              onSortSelect={handleSortSelect} 
              searchTerm={searchTerm}
              resultsCount={movies.resultsCount}
              sortOption={sortOption}
              isSubmit = {isSubmit}
            />

            {movies.isError && <p>Something went wrong ...</p>}


            <h1>Trending Now 🔥</h1>
            
            {/* {movies.isLoading ? (
                <CircularProgress />
            ) : (
                    movies.data.length !== 0 ? <List movies={movies.data} searchTerm={searchTerm} /> :
                        <h1> oops...couldn't find any movies with that title</h1>
                )} */}

            {/* <PaginationBar page={page} handlePageInput={handlePageInput} /> */}

            <InfiniteScroll
                dataLength={movies.data.length} //This is important field to render the next data
                next={handleFetchScroll}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {movies.data.length !== 0 ? <List movies={movies.data} searchTerm={searchTerm} /> :
                    <h1> oops...couldn't find any movies with that title</h1>}
            </InfiniteScroll>


        
        </div>


    );
}
