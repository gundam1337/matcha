const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");
const User = require("./models/user");
const axios = require("axios")
const config = require("./config/database");

const TOTAL_USERS = 1000;
const UNSPLASH_ACCESS_KEY = '5yNFp6wtVXH3I8n1zFXr3hHERm9PNkxA9ZJlYGj9I6E';

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhoneNumber() {
  // Example format: (XXX) XXX-XXXX
  let phoneNumber = "(###) ###-####";
  phoneNumber = phoneNumber.replace(/#/g, () => Math.floor(Math.random() * 10));
  return phoneNumber;
}


async function fetchUnsplashImage() {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      params: { query: 'portrait', orientation: 'portrait' }
    });
    return response.data.urls.regular;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null; // Fallback URL or null
  }
}

async function createFakeUsers() {

  for (let i = 0; i < TOTAL_USERS; i++) {
    const hashedPassword = await bcrypt.hash('123456789', 10);
    const profilePicture = await fetchUnsplashImage();
    const userGender = getRandomElement(['male', 'female']);
    const secondConst = userGender === 'man' ? 'woman' : 'man';

    const newUser = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: hashedPassword,
      profile: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthdate: faker.date.birthdate(),
        phoneNumber: generatePhoneNumber() ,
        gender: userGender,
        location: {
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
          city: faker.address.city(),
          country: faker.address.country()
        },
        bio: faker.lorem.sentence(),
        interests: getRandomElement([
          "cooking", "sport", "reading", "music", "dance",
          "astronomy", "gardening", "photography", "travel",
          "cinema", "video-games", "drawing", "animals"
        ]),
        profilePicture: profilePicture || `https://source.unsplash.com/random/300x300?sig=${i}`
      },
      gender: secondConst,
      ageRange: {
        min: faker.number.int({ min: 18, max: 25 }),
        max: faker.number.int({ min: 45, max: 50 })
      }
    });

    await newUser.save();
  }
}

createFakeUsers()
  .then(() => console.log('Fake users created!'))
  .catch(err => console.error(err))
  .finally(() => mongoose.disconnect());
