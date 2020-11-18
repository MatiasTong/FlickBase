import React, {useState} from "react"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles'
import './App.css';

function App() {
  const movieList = [
   {title: "The apple sings"},
   {title: "The orange sings"},
   {title: "The tree sings"}
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchInput = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)}

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

      <TextField
            style={{margin:"20px", minWidth:"30%"}}
            variant="outlined"
            // variant ="outlined"
            color="primary"
            type="email"
            // type="date"
            // type="time"
            label="Search"
            value={searchTerm}
            onChange={handleSearchInput}
          />

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
