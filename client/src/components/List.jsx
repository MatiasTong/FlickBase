import React from 'react'
import Grid from '@material-ui/core/Grid'
import Item from "./Item"


export default function List({movies, searchTerm}) {
    return (
        <Grid container spacing={3} mt={2}>
        {movies &&
          movies
            .map(movie => (
               <Item key={movie.id} movie={movie}/>
            ))}
      </Grid>
    )
}
