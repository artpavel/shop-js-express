const User = require('../models/user-model');

// signUp show form
const getSignup = (req, res) => {
  res.render('customer/auth/signup');
};

// save in database
const signup = async (req, res) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect('/login');
};

// logIn
const getLogin = (req, res) => {
  res.render('customer/auth/login');
};

module.exports = {
  getSignup,
  getLogin,
  signup
};