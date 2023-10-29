const mongoose = require('mongoose');

const uri = 'mongodb+srv://omarderkaoui:W4oykDL3mK85vw6M@atlascluster.3ngvfcu.mongodb.net/matcha'; // I added the database name "matcha" at the end of the URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        const userAccountSchema = new mongoose.Schema({}, { strict: false }); // Using a non-strict schema to fetch all fields without defining them
        const UserAccount = mongoose.model('UserAccount', userAccountSchema, 'user_account'); // 'user_account' is the collection name

        return UserAccount.find({}).exec(); // Fetching all documents
    })
    .then(documents => {
        console.log(documents);
    })
    .catch(err => {
        console.error('Error connecting to the database', err);
    })
    .finally(() => {
        mongoose.connection.close();
    });
