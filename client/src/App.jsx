import React, { useState, useEffect, useCallback } from "react"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import SearchBar from "material-ui-search-bar";
import axios from "axios"
import './App.css';

console.log()

function App() {



  const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=`

  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState("")

  const [url, setUrl] = useState(
    // `${API_ENDPOINT}${searchTerm}`
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=hello`
  )


  const handleSearchInput = (value) => {
    setSearchTerm(value)
    console.log(searchTerm)
  }

  const handleSearchInput2 = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
  }

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    console.log(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault();
  }

  const handleFetchStories = async () => {
      const res = await axios.get(url);
      setMovies(res.data.results)
      console.log(res.data.results)
    };

  useEffect(() => {
    handleFetchStories();
  }, [url])


  // const handleFetchStories = useCallback(async () => {
  //   dispatchStories({ type: 'STORIES_FETCH_INIT' })
  //   try {
  //     const result = await axios.get(url);

  //     dispatchStories({
  //       type: "STORIES_FETCH_SUCCESS",
  //       payload: result.data.hits,
  //     });
  //   } catch{
  //     dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
  //   }
  // }, [url]);


  // useEffect(() => {
  //   handleFetchStories();
  // }, [handleFetchStories])



  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();


  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              FlickBase
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

      </header>

      <SearchBar
        value={searchTerm}
        onChange={handleSearchInput}
        onRequestSearch={handleSearchSubmit}
        disabled={!searchTerm}
        style={{
          margin: '1rem auto',
          maxWidth: 800
        }}


      //  />
      // value={searchTerm}
      // onChange={handleSearchInput}
      // onRequestSearch={() => doSomethingWith(this.state.value)}
      />

      <Box m={2}>
        <form onSubmit={handleSearchSubmit}>

          <TextField
            style={{ minWidth: "30%", marginRight: "1rem" }}
            variant="outlined"
            size='sm'
            // variant ="outlined"
            color="primary"
            // type="date"
            // type="time"
            label="Search"
            value={searchTerm}
            onChange={handleSearchInput2}

          />

          <Button
            type="submit"
            startIcon={<SearchIcon />}
            size="large"
            href="#"
            onClick={handleSearchSubmit}
            variant="contained"
            color="primary">
            search
        </Button>
        </form>


      </Box>


      <div>
        {console.log("rendered")}
        {movies &&
          movies
            .filter(res => res.original_title.includes(searchTerm))
            .map(res => (
              <div>
                <p>{res.original_title}</p>
                <p>s</p>
              </div>
            ))}
      </div>
    </div>


  );
}

export default App;
