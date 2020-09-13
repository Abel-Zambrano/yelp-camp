const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user');

const commentsRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// Connect to ROUTES
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'yelpcamp 2020',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // "User.authenticate" derived from passport-local-mongoose
passport.serializeUser(User.serializeUser()); // derived from passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); // derived from passport-local-mongoose

// CURRENTUSER MIDDLEWARE
// All routes are able to check if there's a user logged in
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// Add new campground
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

app.listen(3000, () => {
    console.log('Server is running');
})