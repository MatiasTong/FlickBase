import React, { useEffect, useReducer, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikeIcon from "@material-ui/icons/ThumbUpAlt";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import movieDetailsReducer from "../reducers/movieDetailsReducer";
import firebaseDB from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavBar from "../components/NavBar";
import { usePalette } from "react-palette";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles({
  root: {
    paddingTop: "10px",
  },
  card: {
    padding: "1rem",
  },
  statsCard: {
    margin: "0 auto",
    maxWidth: "90%",
  },

  websiteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    opacity: 0.5,
  },

  overviewSection: {
    position: "relative",
  },
});

export default function MovieDetails() {
  const classes = useStyles();

  //get the movieId from the route params
  let { movieID } = useParams();

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const MOVIE_REF = firebaseDB.ref("movies/" + movieID);
  const POSTER_IMAGE = `https://image.tmdb.org/t/p/w342`;
  const BACKDROP_IMAGE = `https://image.tmdb.org/t/p/w1280/`;
  const [movieDetails, dispatchMovieDetails] = useReducer(movieDetailsReducer, {
    data: {
      title: "",
      isLiked: false,
      likes: 0,
      //and other movie specific data
    },
    isLoading: false,
    isError: false,
  });

  const handleFetchMovieDetails = useCallback(async () => {
    dispatchMovieDetails({ type: "MOVIE_FETCH_INIT" });
    try {
      let likeCount = 0;
      const result = await axios.get(MOVIE_URL);

      if (window.localStorage.getItem(movieID)) {
        movieDetails.data.isLiked = true;
      }

      //Get the number of likes from firebase if the movie can be found/has previous likes
      await MOVIE_REF.once("value", (snapshot) => {
        if (snapshot.val()) {
          likeCount = snapshot.val().likes;
        }
      });

      dispatchMovieDetails({
        type: "MOVIE_FETCH_SUCCESS",
        payload: { ...result.data, likes: likeCount },
      });
    } catch (err) {
      console.log(err);
      dispatchMovieDetails({ type: "MOVIE_FETCH_FAILURE" });
    }
  }, []);

  const toggleLike = () => {
    if (isLiked) {
      dispatchMovieDetails({ type: "DECREMENT_LIKES" });
    } else {
      dispatchMovieDetails({ type: "INCREMENT_LIKES" });
    }
  };

  const addOrUpdate = () => {
    firebaseDB.ref("movies/" + movieDetails.data.id).set({
      title: movieDetails.data.title,
      TMDBId: movieDetails.data.id,
      likes: movieDetails.data.likes,
    });
  };

  const generateBackgroundColors = (genres) => {
    let backgroundColor = `linear-gradient( ${data.vibrant}, ${data.darkMuted})`;
    if(genres){
        for (let genre of genres){
            if(
            genre.name.toLowerCase() === "horror" || 
            genre.name.toLowerCase() ==="action" || 
            genre.name.toLowerCase() ==="science fiction"){
                backgroundColor = `linear-gradient( ${data.darkMuted}, rgb(20, 20, 20))`;
            }
        }

    }
    return backgroundColor;
  };

  useEffect(() => {
    if (movieDetails.data.id) {
      addOrUpdate();
    }
  }, [movieDetails.data.likes]);

  useEffect(() => {
    handleFetchMovieDetails();
  }, [handleFetchMovieDetails]);

  const {
    poster_path,
    backdrop_path,
    genres,
    title,
    homepage,
    original_title,
    popularity,
    likes,
    tagline,
    overview,
    isLiked,
  } = movieDetails.data;
  const { data, loading, error } = usePalette(`${POSTER_IMAGE}${poster_path}`);
  return (
    <div className="App">
      <NavBar />
      <Container style={{ background: generateBackgroundColors(genres) }}>
        {/* <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}> */}
        {movieDetails.isError && <p>Something went wrong ...</p>}

        {movieDetails.isLoading ? (
            <Box mt={5}>
                <CircularProgress />

            </Box>
        ) : (
          <>
            <Grid
              container
              item
              spacing={3}
              justify="center"
              alignItems="stretch"
              className={classes.root}
            >
              <Grid item lg={3} md={3} >
                {poster_path ? (
                  <img
                    style={{
                      margin: "0px",
                      height: "25rem",
                      borderRadius: "5px",
                    }}
                    alt={`${title}`}
                    src={`${POSTER_IMAGE}${poster_path}`}
                  />
                ) : (
                  <img
                    style={{
                      height: "25rem",
                      maxWidth: "90%",
                      display: "inline-block",
                    }}
                    alt="placeholder"
                    src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"
                  />
                )}
              </Grid>

              <Grid item lg={8} md={8} className={classes.overviewSection}>
                <Card
                  className={classes.card}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.4)",
                    color: "white",
                    height: "90%",
                  }}
                >
                  {homepage && (
                    <Zoom in={true}>
                      <Tooltip
                        title="Visit Site"
                        className={classes.websiteButton}
                      >
                        <Button
                          variant="contained"
                          aria-label="visit site"
                          size="small"
                          target="_blank"
                          href={homepage}
                        >
                          <CallMadeIcon />
                        </Button>
                      </Tooltip>
                    </Zoom>
                  )}
                  <h1>{original_title}</h1>
                  {tagline && <h2>{`"${tagline}"`}</h2>}

                  <p>{overview}</p>

                  <Button
                    style={isLiked ? { color: "rgb(250,250,100)" } : { color: "white" }}
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

                  <Grid item container justify="center">
                    {genres &&
                      genres.map((genre) => (
                        <Grid item my={2}>
                          <Chip
                            style={{ margin: "1rem 0.2rem" }}
                            key={genre.id}
                            label={genre.name}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            <Grid
              className={classes.root}
              container
              item
              spacing={3}
              justify="center"
              alignItems="start"
            >
              <Grid item lg={3} md={3} xs={12}>
                <Paper className={classes.statsCard}>
                  <ListItem>
                    <ListItemText
                      primary={`Popularity: ${popularity}`}
                      secondary="Secondary text"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Single-line item"
                      secondary="Secondary"
                    />
                  </ListItem>
                </Paper>
              </Grid>
              <Grid item lg={8} md={8} >
                <Card>
                  {backdrop_path ? (
                    <CardMedia
                      component="img"
                      alt={`${title}`}
                      height="100%"
                      image={`${BACKDROP_IMAGE}${backdrop_path}`}
                      title={`${title}`}
                    />
                  ) : (
                    <img
                      style={{
                        height: "25rem",
                        maxWidth: "90%",
                        display: "inline-block",
                      }}
                      alt="placeholder"
                      src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
          </>
        )}

        {/* </Grid> */}
      </Container>
    </div>
  );
}
