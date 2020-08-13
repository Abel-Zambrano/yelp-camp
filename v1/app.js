const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing')
})

const campgrounds = [
    {name: 'Crab Creek', image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350'},
    {name: 'Muddy Cliff', image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350'},
    {name: 'Blue Waters Rio', image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {name: 'Crab Creek', image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350'},
    {name: 'Muddy Cliff', image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350'},
    {name: 'Blue Waters Rio', image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {name: 'Crab Creek', image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350'},
    {name: 'Muddy Cliff', image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350'},
    {name: 'Blue Waters Rio', image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
];

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
})

app.post('/campgrounds', function(req, res) {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const picture = req.body.picture;
    const newCampground = {name: name, image: picture};
    campgrounds.push(newCampground);
    //redirct to campgrounds page
    res.redirect('/campgrounds');
});

//sumbits a post request to '/campgrounds'
app.get('/campgrounds/new', function(req, res) {
    res.render('new')
})

app.listen(3000, function(){
    console.log('Server is running');
})