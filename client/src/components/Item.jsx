import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import Zoom from '@material-ui/core/Zoom';
import Fade from 'react-reveal/Fade';

 const Item = React.memo(({movie})=> {
     console.log("rendered")
    const POSTER_IMAGE = `https://image.tmdb.org/t/p/w342`

    return (
      
        <Grid item lg={2} md={3} xs={12} >
            {/* <Zoom in={true} timeout={5000}> */}
            <Paper elevation={0}>
            <Link to={`/MovieDetails/${movie.id}`}>
                {movie.poster_path ? <img style={{ height: '25rem', borderRadius: "5px" }} alt={`poster image of ${movie.title}`} src={`${POSTER_IMAGE}${movie.poster_path}`} />
                    : <img style={{ height: '25rem', maxWidth: "90%", display:"inline-block"}} alt="placeholder image" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" />}
            </Link>
            </Paper>
            {/* </Zoom> */}
        </Grid>
        
    )
})

export default React.memo(Item)
