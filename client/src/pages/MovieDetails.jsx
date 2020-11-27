import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import movieDetailsReducer from '../reducers/movieDetailsReducer';
import firebaseDB from "../firebase"
export default function MovieDetails() {

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
            dispatchMovieDetails({ type: 'MOVIE_FETCH_FAILURE' });
        }
    }, []);

    const toggleLike = () => {
        if(isLiked){
            dispatchMovieDetails({ type: 'DECREMENT_LIKES' })
        } else{
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
        <Container>
            {movieDetails.isError && <p>Something went wrong ...</p>}

            {movieDetails.isLoading ? (
                <p>Loading ...</p>
            ) : (
                    <>
                        {poster_path ? <img style={{ height: '25rem', borderRadius: "5px" }} alt={`${title}`} src={`${POSTER_IMAGE}${poster_path}`} />
                            : <img style={{ height: '25rem', maxWidth: "90%", display: "inline-block" }} alt="placeholder" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" />}

                        {backdrop_path ? <img style={{ height: '25rem', borderRadius: "5px" }} alt={`${title}`} src={`${BACKDROP_IMAGE}${backdrop_path}`} />
                            : <img style={{ height: '25rem', maxWidth: "90%", display: "inline-block" }} alt="placeholder" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" />}

                        <h1>{original_title}</h1>
                        <h2>{tagline}</h2>
                        <p>{overview}</p>
                        <p>{`Popularity: ${popularity}`}</p>
                        {genres && genres.map(
                            (genre) => (<p key={genre.id}  >{genre.name}</p>)
                        )}

                        <span>{` ${likes} Likes `}</span>
                        <Typography color="blue">
                            <Button 
                                style={isLiked ? {color:"yellow"}:{color:"white"}}
                                startIcon={<LikeIcon />}
                                size="medium"
                                onClick={toggleLike}
                                variant="contained"
                                color="primary">
                                Like
                             </Button>
                        </Typography>
                    </>
                )}

        </Container>
    )
}
