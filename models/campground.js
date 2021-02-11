const mongoose= require('mongoose');
const Review= require('./review');
const Schema= mongoose.Schema; // just to shorten

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200,h_150');
})

const opts = {toJSON: { virtuals: true}}
//Since by default Mongoose does not include virtuals when we convert a document into JSON

const CampgroundSchema= new Schema({
    title: {
        type: String
    },
    images:[ImageSchema],
    geometry:{
        type:{
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);


CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`
})

//"query" middleware
CampgroundSchema.post('findOneAndDelete',async function(campground){
    if(campground.reviews.length){
        const result= await Review.deleteMany(
            {_id: { $in: campground.reviews} }
            );
        console.log(result);
    }
})

module.exports= mongoose.model('Campground',CampgroundSchema);
