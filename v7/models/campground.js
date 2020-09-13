const mongoose = require('mongoose');

//Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});
//compile into model
module.exports = mongoose.model('Campground', campgroundSchema);