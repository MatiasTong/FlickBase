const mongoose =  require('mongoose');
mongoose.connect('mongodb://localhost/playground',  { useNewUrlParser: true })
    .then(() => console.log('connected to mongdb...'))
    .catch((err) => console.log('error', err.message('Could not connect to mongodb')))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});


const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular','frontend'],
        isPublished: true
    })
    
    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    //comparison operators denoted by $
    //eq equal
    //ne not equal
    //gt (greater than)
    //gte greater than or equal to
    //lt
    //lte less than or equal to
    //in 
    //ni  not in

    //logical operators or and    
    const courses = await Course
    .find({author:"Mosh", isPublished:true})
    //using regex string starts with MOSH
    // .find({ author: /^Mosh/})
     //using regex string ends with Hamedani, i for case insensitive
    //  .find({ author: /Hamedani$/i})
     //contains Mosh
    // .find({author:/.*Mosh.*/i})
    // .find({price:{$gte: 10, $lte: 20}})
    // .find({price:{$in: [10, 15, 20]}})
    //author is mosh or is published
    // .or([{ author:"Mosh"} , {isPublished: true}])
    // .and([])
    .limit(10)
    //ascending order for one and descending order for negative 1
    .sort({name:1})
    .select({name:1, tags:1})
    //just returns count
    .count()
    console.log(courses)
}

async function getCourses2(){
  
    //pagination
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
    .find({author:"Mosh", isPublished:true})
    .skip((pageNumber - 1) * pageSize)
    .limit(10)
    .sort({name:1})
    .select({name:1, tags:1})
    console.log(courses)
}

async function exercise1(){
    const courses = await Course
    .find({isPublished: true, 
           tags:'backend'})
    .sort({name:1})
    .select({name:1, tags:1})
    console.log(courses)
}

async function exercise2(){
    const courses = await Course
    .find({
        isPublished: true, 
        tags: {$in:['backend', 'frontend']} 
    })
    // .or([ {tags: frontend}, {tags: backend}])
    .sort('-price')
    .select('name author price')
    console.log(courses)
}

async function exercise3(){
    const courses = await Course
    .find({ isPublished: true})
    .or([{price:{$gte: 15}},
        {title:/.*by.*/i}
    ])
    // .or([ {tags: frontend}, {tags: backend}])
    console.log(courses)
}

async function updateCourse(id){
    //first approach: query first
    //findById
    //modify properties
    //save

    //second approach:
    //update directly
    //optionally: get updated document
    const course = await Course.findById(id)
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another author'
    // course.set({
    //     isPublished:true,
    //     author:'Another author'
    // })
    const result = course.save();
    console.log(result)
}



getCourses();