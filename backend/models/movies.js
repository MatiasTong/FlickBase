const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true})
    .then(() => console.log('connected to mongodb'))
    .catch((err)=>console.log(`could not connect to database: ${err.message()}`))

const movieSchema = mongoose.Schema({
    movieId: Number,
    likes: Number
})

