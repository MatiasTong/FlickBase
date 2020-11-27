const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost/movieDB',{useNewUrlParser: true})
    .then(() => console.log('connected to mongodb'))
    .catch((err)=>console.log(`could not connect to database: ${err.message()}`))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.static('public'));

//writing custom middleware
//simple request time logger
// app.use((req, res, next)=>{
    app.use('/home', (req, res, next)=>{
        console.log("A new request received at " + Date.now());
        //this function call tells that more processing is required 
        //for the current request and is in the next middleware
        //function/route handler
        next();
    })

app.use('api/movies', movies)

//PORT
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`listening on port ${port}!`))