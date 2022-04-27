const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62599a4e0408170f8ced914e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ex repellat veniam facilis nam dignissimos id harum, quod, repellendus natus modi, cum suscipit esse accusamus odit molestias. Voluptas, cumque ipsa.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-71.207886, 43.58437]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dyx2peyko/image/upload/v1650993302/YelpCamp/oizovdzem7adxgoxfwnt.jpg',
                    filename: 'YelpCamp/oizovdzem7adxgoxfwnt',
                },
                {
                    url: 'https://res.cloudinary.com/dyx2peyko/image/upload/v1650993303/YelpCamp/rfb9sg1kx3y5m58qd6ki.jpg',
                    filename: 'YelpCamp/rfb9sg1kx3y5m58qd6ki',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});