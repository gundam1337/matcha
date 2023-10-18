const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// POST /register endpoint
app.post('/register', (req, res) => {
  const { name, email, password, gender } = req.body;
  
  console.log(req.body);
  // Add your authentication and/or registration logic here
  
  res.status(200).send({ message: 'Registration successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
