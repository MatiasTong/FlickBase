const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movieId: Number,
    likes: Number
})

const Movie = new mongoose.model('Movie', movieSchema)
module.exports = Movie

module.exports.movieSchema = movieSchema
