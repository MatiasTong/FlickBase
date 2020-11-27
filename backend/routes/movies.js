const express = require('express');
const router = express.Router();
const Movie = require('../routes/movies')

    router.get('/', async (req, res) => {
        const movies = await Movie.find().sort();
        res.send(movies)
    });

    router.get('/:id', async (req,res)=>{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).send('The genre with given id could not be found')
        res.send(movie)
    })

    router.post('/', async (req, res)=>{
        let movie = new Movie({movieId: req.body.movieId});
        movie = await movie.save();
        res.send(movie);
    })

    router.put('/id', async (req, res)=>{
        const movie = Movie.findByIdAndUpdate(req.params.id, {moviesId: req.body.id},{new:true})
        if(!movie) return res.status(404).send('The genre with given id could not be found')

        res.send(movie)
    })
    
    // app.get('/books/:bookId', (req, res)=> {
    //     res.send(req.params)
    // })
    
    // //invalid route
    // app.get('*', (req, res)=>{
    //     res.send('404! This is an invalid url')
    // })