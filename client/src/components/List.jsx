import React from 'react'
import Grid from '@material-ui/core/Grid'
import Item from "./Item"
import { v4 as uuidv4 } from 'uuid';
import Fade from '@material-ui/core/Fade';


const List = React.memo(({movies}) => {
    return (
      <Fade in={true} timeout={1000}>
        <Grid container spacing={2}>
        {movies &&
          movies
             //the filter is not currently effective
            .filter((movie) => movie.adult===false)
            .map(movie => (
               <Item key={uuidv4()} movie={movie}/>
            ))}
      </Grid>
       </Fade>
    )
})

export default List;