import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

function NavBar() {
  const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },

    appBar:{
      background: "linear-gradient(to right, #315EC8, #725CFF)",
    },
   
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography edge="start"  style={{ position: "relative", fontFamily: "'Patua One', cursive", textShadow: "1px 1px #04d9ff" }} variant="h4" className={classes.title}>
          FlickBase
          </Typography>
        
        <img
          src="../blue_short.svg"
          alt="triangle with all three sides equal"
          height="87"
          width="150" />
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

