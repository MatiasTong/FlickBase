const bodyParser = require('body-parser');
const express = require('express');
const app = express();

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

app.get('/', (req, res) => res.send('Hello World'));

app.get('/books/:bookId', (req, res)=> {
    res.send(req.params)
})

//invalid route
app.get('*', (req, res)=>{
    res.send('404! This is an invalid url')
})

//PORT
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`listening on port ${port}!`))