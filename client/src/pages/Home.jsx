import React, { useState, useEffect, useMemo, useCallback, useReducer } from "react"
import List from "../components/List"
import SearchForm from "../components/SearchForm"
import NavBar from "../components/NavBar"
import axios from "axios"
import moviesReducer from "../reducers/moviesReducer"
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import ListHeader from '../components/ListHeader'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Home() {
    const API_ENDPOINT_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=`
    const API_ENDPOINT_DISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

    //Queries that can be used api endpoints
    const POPULAR_DESC = `&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`
    const RELEASE_DATE_DESC = `&sort_by=release_date.desc`
    const [searchTerm, setSearchTerm] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [url, setUrl] = useState(
        `${API_ENDPOINT_DISCOVER}${POPULAR_DESC}`
    )
    const [sortOption, setSortOption] = useState("")

    const [movies, dispatchMovies] = useReducer(moviesReducer,
        { data: [], searchTerm: "", sortOption:"", queryType: "", resultsCount: 0, page: 1, isLoading: false, isError: false });



    const handleSearchInput = (value) => {
        setSearchTerm(value)}
    

const handleSearchSubmit = () => {
    //if no search term is entered it defaults to popular movies

    if (searchTerm) {
        setUrl(`${API_ENDPOINT_SEARCH}${searchTerm}`);
    } else {
        setUrl(`${API_ENDPOINT_DISCOVER}${POPULAR_DESC}`)
    }
    setIsSubmit(true)
}

const findQueryType = (urlString) => {
    if (urlString.includes(`${API_ENDPOINT_DISCOVER}${POPULAR_DESC}`)) {
        return 'POPULAR'
    } else if (urlString.includes(`${API_ENDPOINT_SEARCH}`)) {
        return 'SEARCH_BY_TERM'
    } else {
        return ''
    }
}

const handleFetchMovies = useCallback(async () => {
    dispatchMovies({ type: 'MOVIES_FETCH_INIT' })

    //determine what type of query it is to change the result list header
    let queryType = findQueryType(url);

    try {
        const result = await axios.get(url);
        dispatchMovies({
            type: 'MOVIES_FETCH_SUCCESS',
            payload: { ...result, queryType, searchTerm },
        });

    } catch (err) {
        dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' });
    }

}, [url]);

const handleFetchScroll = async () => {
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


useEffect(() => {
    handleFetchMovies();
}, [handleFetchMovies])


const displayMoviesOrNotFound = () => {
    if (movies.data.length !== 0) {
        return (!movies.isError &&
            <>
                <ListHeader type={movies.queryType} />
                <List movies={movies.data} />
            </>
        )
    } else if (!movies.isLoading) {
        return <h1> oops...couldn't find any movies with that title</h1>
    }
}

return (
    <div className="App">


        <NavBar />
        <SearchForm
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
            onSortSelect={handleSortSelect}
            searchTerm={movies.searchTerm}
            resultsCount={movies.resultsCount}
            sortOption={sortOption}
            isSubmit={isSubmit}
        />

        {movies.isError && <p>Something went wrong ...</p>}

        {movies.isLoading && <CircularProgress size={50}/>}

        <InfiniteScroll
            dataLength={movies.data.length} //This is important field to render the next data
            next={handleFetchScroll}
            hasMore={true}
            loader={<h4></h4>}
        >
            {displayMoviesOrNotFound()}
        </InfiniteScroll>

        {(!movies.isLoading && !movies.isError && movies.data.length >= 20) && <h2>You've hit the end</h2>}


    </div>


);
}
