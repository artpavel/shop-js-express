const express = require('express');
const path = require('path');

// our file
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
app.listen(3000);