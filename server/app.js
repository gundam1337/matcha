require('dotenv').config({ path: './config.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connection to the MongoDB atlas cloud 
// the goal is connect the to db and log it ot the console

const  uri  = 'mongodb+srv://omarderkaoui:W4oykDL3mK85vw6M@atlascluster.3ngvfcu.mongodb.net/matcha'; // I added the database name "matcha" at the end of the URI

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



/*mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        const userAccountSchema = new mongoose.Schema({}, { strict: false }); // Using a non-strict schema to fetch all fields without defining them
        const UserAccount = mongoose.model('UserAccount', userAccountSchema, 'user_account'); // 'user_account' is the collection name

        return UserAccount.find({}).exec(); // Fetching all documents
    })
    .then(documents => {
		console.log("the data");
        console.log(documents);
    })
    .catch(err => {
        console.error('Error connecting to the database', err);
    })
    .finally(() => {
        mongoose.connection.close();
    });
*/

//
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;

//1)  Node.js middleware and global middleware and seting headres 
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//2) server the static file from the build folder
app.use(express.static(path.join(__dirname, '..', 'build')));


//3)-a routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// -b POST /register endpoint
router.route('/register/')
	.post((req, res) => {
    console.log(req.body)
	res.send("you are in ")
		/*
		 const login = new Login();
		Login.findOne({"username": req.body.username}, function(err, user_data){
			if(err){
				console.log(err)
			}
			if(user_data){
				return res.json({
					status : 400,
					message : "User already exist"
				});
			}
			
			login.username = req.body.username;
			login.password = req.body.password;
			login.confirm_password = req.body.confirm_password;
			login.email	   = req.body.email;
			
			login.save(function(err, login_data){
				if(err)
					return res.status(400).send(err);
				res.json({
					status: 200,
					message : 'You have succesfully registered.'
				});
			});
		});
    */
	});

router.route('/login').post((req,res)=>
{
  console.log(req.body)
  res.send('login is ok')
})
;

// 4) Mount the router 
app.use('/',router);

// 5) the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
