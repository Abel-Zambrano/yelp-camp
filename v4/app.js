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

app.get('/', function(req, res){
    res.render('landing')
})

//INDEX route - show all campgrounds
app.get('/campgrounds', function(req, res) {
    //v2 get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});      
        }
    })
})

//CREATE - add new campground to DB
app.post('/campgrounds', function(req, res) {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const picture = req.body.picture;
    const description = req.body.description;
    const newCampground = {name: name, image: picture, description: description};
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
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
app.get('/campgrounds/new', function(req, res) {
    res.render('new')
})

//SHOW - Shows info on campground
app.get('/campgrounds/:id', function(req, res){
    //find the campground with id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
            
        } else {
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log('Server is running');
})