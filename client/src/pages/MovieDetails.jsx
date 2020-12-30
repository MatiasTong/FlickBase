import React, { useEffect, useReducer, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import movieDetailsReducer from '../reducers/movieDetailsReducer';
import firebaseDB from "../firebase"
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import NavBar from "../components/NavBar"

// const useStyles = makeStyles({
//     root: {
//         fontStyle: "oblique",
//         color: 'red',
//         fontSize: "30px"
//     },
//     buttonStyles: {
//         color: 'green',
//         border: "none"
//     }
// })

export default function MovieDetails() {
    // const classes = useStyles();

    //get the movieId from the route params
    let { movieID } = useParams();
    const MOVIE_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    const MOVIE_REF = firebaseDB.ref('movies/' + movieID);
    const POSTER_IMAGE = `https://image.tmdb.org/t/p/w342`
    const BACKDROP_IMAGE = `https://image.tmdb.org/t/p/w1280/`
    const [movieDetails, dispatchMovieDetails] = useReducer(movieDetailsReducer,
        {
            data: {
                title: "",
                isLiked: false,
                likes: 0,
                //and other movie specific data
            },
            isLoading: false,
            isError: false
        }
    );

    const handleFetchMovieDetails = useCallback(async () => {
        dispatchMovieDetails({ type: 'MOVIE_FETCH_INIT' })
        try {
            let likeCount = 0
            const result = await axios.get(MOVIE_URL);
          

            if (window.localStorage.getItem(movieID)) {
                movieDetails.data.isLiked = true;
            }

            //Get the number of likes from firebase if the movie can be found/has previous likes  
            await MOVIE_REF.once('value', (snapshot) => {
                if (snapshot.val()) {
                    likeCount = snapshot.val().likes;
                }
            })

            dispatchMovieDetails({
                type: 'MOVIE_FETCH_SUCCESS',
                payload: { ...result.data, likes: likeCount },
            });
         
        } catch (err) {
            console.log(err)
            dispatchMovieDetails({ type: 'MOVIE_FETCH_FAILURE' });
        }
    }, []);

    const toggleLike = () => {
        if (isLiked) {
            dispatchMovieDetails({ type: 'DECREMENT_LIKES' })
        } else {
            dispatchMovieDetails({ type: 'INCREMENT_LIKES' })
        }
    }

    const addOrUpdate = () => {
        firebaseDB.ref('movies/' + movieDetails.data.id).set({
            title: movieDetails.data.title,
            TMDBId: movieDetails.data.id,
            likes: movieDetails.data.likes
        })
    }

    useEffect(() => {
        if (movieDetails.data.id) {
            addOrUpdate()
        }
    }, [movieDetails.data.likes])

    useEffect(() => {
        handleFetchMovieDetails();
    }, [handleFetchMovieDetails])

    const { poster_path, backdrop_path, genres, title, original_title, popularity, likes, tagline, overview, isLiked } = movieDetails.data

    return (
        <div className="App">

     
        <NavBar />
        <Container>
            <Grid container spacing={2}>
                {movieDetails.isError && <p>Something went wrong ...</p>}

                {movieDetails.isLoading ? (
                    <CircularProgress />
                ) : (
                        <>

                            <Grid item sm={4}>
                                {poster_path ? <img style={{ margin: "0 auto", height: '25rem', borderRadius: "5px", display: "block", textAlign: "center" }} alt={`${title}`} src={`${POSTER_IMAGE}${poster_path}`} />
                                    : <img style={{ height: '25rem', maxWidth: "90%", display: "inline-block" }} alt="placeholder" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" />}

                            </Grid>


                            <Grid item sm={8}>

                                <h1>{original_title}</h1>
                                {tagline && <h2>{`"${tagline}"`}</h2>}
                                <p>{overview}</p>
                                <p>{`Popularity: ${popularity}`}</p>
                                <Button
                                    style={isLiked ? { color: "yellow" } : { color: "white" }}
                                    startIcon={<LikeIcon />}
                                    size="medium"
                                    onClick={toggleLike}
                                    variant="contained"
                                    color="primary"
                                // className={classes.buttonStyles}
                                >
                                    <Typography style={{ letterSpacing: "0.1rem" }}>
                                        {`Like  ${likes ? likes : ""}`}
                                    </Typography>
                                </Button>

                                <Grid container>
                                    {genres && genres.map(
                                        (genre) => (
                                            <Grid item my={2} >
                                                <Chip style={{margin: "1rem 0.2rem"}}key={genre.id} label={genre.name} />

                                            </Grid>
                                        )
                                    )}

                                </Grid>
                            </Grid>

                            {backdrop_path ? <img style={{ height: '25rem', borderRadius: "5px" }} alt={`${title}`} src={`${BACKDROP_IMAGE}${backdrop_path}`} />
                                : <img style={{ height: '25rem', maxWidth: "90%", display: "inline-block" }} alt="placeholder" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" />}

                        </>
                    )}

            </Grid>
        </Container>
        </div>
    )
}
