// signUp
const getSignup = (req, res) => {
  res.render('customer/auth/signup');
};

// logIn
const getLogin = (req, res) => {

};

module.exports = {
  getSignup,
  getLogin
};