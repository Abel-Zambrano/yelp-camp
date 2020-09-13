const express = require('express');
const router = express.Router();

//INDEX route - show all campgrounds
router.get('/campgrounds', (req, res) => {
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
router.post('/campgrounds', (req, res) => {
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
router.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

//SHOW - Shows info on campground
router.get('/campgrounds/:id', (req, res) => {
    //find the campground with id
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err){
            console.log(err);
            
        } else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

module.exports = router;