import React, { useState, useEffect } from "react"
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
  const movieList = [
    { title: "The apple sings" },
    { title: "The orange sings" },
    { title: "The tree sings" }
  ]



  const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=`

  const [searchTerm, setSearchTerm] = useState("")

  const [url, setUrl] = useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  // useEffect(
  //   axios.get(url)
  // )

  const handleSearchInput = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }



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
    // onRequestSearch={() => doSomethingWith(this.state.value)}
  />

<Box m={2}>
      <form>

        <TextField
          style={{ minWidth:"30%", marginRight:"1rem"}}
          variant="outlined"
          size='sm'
          // variant ="outlined"
          color="primary"
          type="email"
          // type="date"
          // type="time"
          label="Search"
          value={searchTerm}
          onChange={handleSearchInput}

        />

        <Button
          startIcon={<SearchIcon />}
          size="large"
          href="#"
          onClick={() => alert('Hello')}
          variant="contained"
          color="primary">
          search
        </Button>
      </form>


</Box>


      <div>
        {movieList
          .filter(movie => movie.title.includes(searchTerm))
          .map(movie => (
            <p>{movie.title}</p>
          ))}
      </div>
    </div>


  );
}

export default App;
