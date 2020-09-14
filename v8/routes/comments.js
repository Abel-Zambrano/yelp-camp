const express = require('express');
const router = express.Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');

//COMMENTS ROUTE
router.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

router.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    // Loop campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');            
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);                   
                } else {
                    // Add username and id to comment                    
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;                    
                    // Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();                    
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = router;