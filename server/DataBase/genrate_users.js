const mongoose = require("mongoose");
const faker = require("faker");
const bcrypt = require("bcrypt");
const User = require("./path/to/your/userSchema");

const DATABASE_URI = 'your_mongodb_connection_string';
const TOTAL_USERS = 1000;

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function createFakeUsers() {
  for (let i = 0; i < TOTAL_USERS; i++) {
    const hashedPassword = await bcrypt.hash('yourDefaultPassword', 10);
    
    const newUser = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: hashedPassword,
      profile: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthdate: faker.date.past(),
        phoneNumber: faker.phone.phoneNumber(),
        gender: faker.random.arrayElement(['male', 'female', 'other']),
        location: {
          city: faker.address.city(),
          country: faker.address.country()
        },
        bio: faker.lorem.sentence(),
        interests: [faker.lorem.word(), faker.lorem.word()],
        profilePicture: `https://source.unsplash.com/random/300x300?sig=${i}` // Example using Unsplash
      }
      // ...other fields
    });

    await newUser.save();
  }
}

createFakeUsers()
  .then(() => console.log('Fake users created!'))
  .catch(err => console.error(err))
  .finally(() => mongoose.disconnect());
