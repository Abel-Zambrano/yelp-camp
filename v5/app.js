const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Campground = require('./models/campground');
const Comment = require('./models/comment')

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



//add new campground
// Campground.create(
//     {
//         name: 'Crab Creek', 
//         image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350',
//         description: 'Very hot during the summer but lots of bass for fishing.'
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log('Created new Campground');
//             console.log(campground);
//         }
//     });

app.get('/', (req, res) => {
    res.render('landing')
})

//INDEX route - show all campgrounds
app.get('/campgrounds', (req, res) => {
    //v2 get all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});      
        }
    })
})

//CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const picture = req.body.picture;
    const description = req.body.description;
    const newCampground = {name: name, image: picture, description: description};
    //create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirct to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

//NEW - show form to create camground
//sumbits a post request to '/campgrounds'
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

//SHOW - Shows info on campground
app.get('/campgrounds/:id', (req, res) => {
    //find the campground with id
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err){
            console.log(err);
            
        } else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});
//================================================
//COMMENTS ROUTE
app.get('/campgrounds/:id/comments/new', (req, res) =>{
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', (req, res) => {
    //looup campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
            
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                    
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
});

app.listen(3000, () => {
    console.log('Server is running');
})