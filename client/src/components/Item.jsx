import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

export default function Item({movie}) {
    const POSTER_IMAGE = `https://image.tmdb.org/t/p/w342`

    return (
        <Grid item lg={3} md={4} xs={12} key={movie.id}>
            <Paper elevation={0}>
                {movie.poster_path ? <img style={{ height: '25rem', borderRadius: "5px" }} alt={`poster image of ${movie.title}`} src={`${POSTER_IMAGE}${movie.poster_path}`} />
                    : <img style={{ height: '25rem', maxWidth: "90%", display:"inline-block"}} alt="placeholder image" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" />}
            </Paper>
        </Grid>
    )
}