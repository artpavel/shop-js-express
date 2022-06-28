const express = require('express');
const path = require('path');

// our file
const db = require('./data/database');
const authRoutes = require('./routes/auth-routes');

// express
const app = express();

// active ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// css and js
app.use(express.static('public'));
// request body
app.use(express.urlencoded({ extended: false }));

// work with routes
app.use(authRoutes);


// server
db.connectToDatabase()
  .then(() => app.listen(3000))
  .catch((err) => {
    console.log('Failed to connect to the database');
    console.log(err);
  })
