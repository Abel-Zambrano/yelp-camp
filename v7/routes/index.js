const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('landing')
})

//AUTH ROUTES

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('campgrounds');
            })
        }
    });
});

// LOGIN ROUTE
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), (req, res) => {
});

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = require;