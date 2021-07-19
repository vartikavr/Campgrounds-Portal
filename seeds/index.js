if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const mongoose= require('mongoose');
const cities= require('./INcities');
const { places, descriptors} = require('./seedHelpers');
const Campground= require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection; // to shorten 
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected!");
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDb= async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000 = Math.floor(Math.random()*100);
        const price = Math.floor(Math.random()*20)+10;
        if(i%3 == 0){
            const camp = new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: `One of the coolest hangout places in ${cities[random1000].state}. Do visit us and create lifelong memories. We promise you'll leave here with truckloads of fun and memories and zero regrets.`,
                price, //shorthand, no need to write price:price
                geometry: { 
                    "type" : "Point", 
                    "coordinates" : [ cities[random1000].lng, cities[random1000].lat ] 
                },
                author: '60253369875ecf0015b7f152',
                images: [
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674512/YelpCamp/za0ikqxvix48gbo7b52b_cpqtgz.jpg',
                        filename: 'YelpCamp/za0ikqxvix48gbo7b52b_cpqtgz'
                    },
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674507/YelpCamp/sm836waarko47s1q26s0_vujwc2.jpg',
                        filename: 'YelpCamp/sm836waarko47s1q26s0_vujwc2'
                    },
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674512/YelpCamp/x0jcxgextlxmcj1u0lox_fnzwsj.jpg',
                        filename: 'YelpCamp/x0jcxgextlxmcj1u0lox_fnzwsj'
                    }
                ]
            })
            await camp.save();
        }
        if(i%3 == 1){
            const camp = new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: `A visit to ${cities[random1000].city} won't be considered complete if our camp is not visited. Trusted by our customers for over 10 years now :)`,
                price, //shorthand, no need to write price:price
                geometry: { 
                    "type" : "Point", 
                    "coordinates" : [ cities[random1000].lng, cities[random1000].lat ] 
                },
                author: '60253369875ecf0015b7f152',
                images: [
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674513/YelpCamp/ww27k4oma2dkrutpp7pm_osbdod.jpg',
                        filename: 'YelpCamp/ww27k4oma2dkrutpp7pm_osbdod'
                    },
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674491/YelpCamp/fuotugbsh4rgwfko8c2r_hxom6k.jpg',
                        filename: 'YelpCamp/fuotugbsh4rgwfko8c2r_hxom6k'
                    }
                
                ]
            })
            await camp.save();
        }
        if(i%3 ==2){
            const camp = new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: `The best camp in ${cities[random1000].city}! Considered the cleanest and most adventurous camp by many of our customers.`,
                price, //shorthand, no need to write price:price
                geometry: { 
                    "type" : "Point", 
                    "coordinates" : [ cities[random1000].lng, cities[random1000].lat ] 
                },
                author: '60253369875ecf0015b7f152',
                images: [
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674512/YelpCamp/aajywmx2kizjsbfsgfg6_qzk8s0.jpg',
                        filename: 'YelpCamp/aajywmx2kizjsbfsgfg6_qzk8s0'
                    },
                    {
                        url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1626674509/YelpCamp/kgscjt4snjopsyldx2d5_zofiox.jpg',
                        filename: 'YelpCamp/kgscjt4snjopsyldx2d5_zofiox'
                    }
                
                ]
            })
            await camp.save();
        }
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})
