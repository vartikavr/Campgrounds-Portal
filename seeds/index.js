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
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit in nesciunt placeat ipsum quisquam, consequatur rem hic temporibus debitis ad dolores molestiae dignissimos alias voluptatem asperiores totam, unde quod minus,Culpa, sequi hic. Amet consequatur, neque provident reiciendis officiis minima dignissimos quo deleniti dolore similique nesciunt magnam. Reiciendis modi ipsa architecto molestias, praesentium iusto et dignissimos optio vel perferendis odit.Saepe similique voluptatum natus consequuntur quos eius itaque, maxime molestiae ullam iusto aliquam voluptates laborum. Cum mollitia debitis, ratione officiis eius distinctio magni labore! Error, obcaecati. Obcaecati magni laudantium assumenda!',
            price, //shorthand, no need to write price:price
            geometry: { 
                "type" : "Point", 
                "coordinates" : [ cities[random1000].lng, cities[random1000].lat ] 
            },
            author: '60253369875ecf0015b7f152',
            images: [
                {
                    url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1613113158/YelpCamp/soczcvowqnd7elzkbd1q.jpg',
                    filename: 'YelpCamp/g5zfsrzhmmlzk1h1dowm'
                  },
                  {
                    url: 'https://res.cloudinary.com/dprrfrbev/image/upload/v1612422134/YelpCamp/mk3c1d9yazexk9s8bzdx.jpg',
                    filename: 'YelpCamp/izmjc2pjkyplmewc3bvw'
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})
