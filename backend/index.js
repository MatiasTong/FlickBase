const mongoose =  require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongdb...'))
    .catch((err) => console.log('error', err.message('Could not connect to mongodb')))

const courseSchema = new mongoose.Schema({})