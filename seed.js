const mongoose = require('mongoose');
const shopModel = require('./models/shopModel');
const dotenv = require('dotenv').config();
const faker = require('faker');

mongoose.set('useCreateIndex', true);

const createRandomShops = () => {
  const allShops = [];

  for (let i = 1; i < 50000; i++) {
    const fakeShop = {
      name: faker.company.companyName(),
      cheapestDish: faker.commerce.price(),
      location: {type: 'Point', coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())]}}

      allShops.push(fakeShop);
  }

  return allShops;
}

const connectToMongo = async () => {
  try {
    console.log('Attempt to connect');
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
    console.log('Connected. Attempt to seed.');

    const allShops = createRandomShops();

    await shopModel.create(allShops);

    console.log('Document was created');
    await mongoose.disconnect(process.env.DB_URL);
    console.log('Disconnected');
  }catch(error) {
    console.log(error);
  }
}

connectToMongo();
