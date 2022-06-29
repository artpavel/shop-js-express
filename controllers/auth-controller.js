const User = require('../models/user-model');
const authUtil = require('../util/authentication');

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

// there is such a user
const login = async (req, res) => {
  const user = new User(req.body.email, req.body.password);
  // check user
  const existingUser = await user.getUserWithSameEmail();
  if (!existingUser) {
    res.redirect('/login');
    return;
  }

  // check password
  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
  if (!passwordIsCorrect) {
    res.redirect('/login');
    return;
  }

  // if ok
  authUtil.createUserSession(req, existingUser, () => {
    res.redirect('/');
  });

};

module.exports = {
  getSignup,
  getLogin,
  signup,
  login
};