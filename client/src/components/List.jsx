import React from 'react'
import Grid from '@material-ui/core/Grid'
import Item from "./Item"
import { v4 as uuidv4 } from 'uuid';


export default function List({movies, searchTerm}) {
    return (
        <Grid container spacing={3} mt={2}>
        {movies &&
          movies
             //the filter is not currently effective
            .filter((movie) => movie.adult===false)
            .map(movie => (
               <Item key={uuidv4()} movie={movie}/>
            ))}
      </Grid>
    )
}
