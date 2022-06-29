const User = require('../models/user-model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

// signUp show form
const getSignup = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: '',
    };
  }
  res.render('customer/auth/signup', { inputData: sessionData });
};

// save in database
const signup = async (req, res, next) => {
  // from form
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  // validation form
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
  ) {
    // show success or not
    sessionFlash.flashDataToSession(req, {
      errorMessage: 'Password must be 6 character, postal code must be 5 characters',
      ...enteredData,
    }, () => {
      res.redirect('/signup');
    });
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    // is there such a user?
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(req, {
          errorMessage: 'User exists already! Try logging in instead!',
          ...enteredData,
        },
        () => {
          res.redirect('/signup');
        }
      );
      return;
    }


    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/login');
};

// logIn
const getLogin = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    };
  }

  res.render('customer/auth/login', { inputData: sessionData });
};

// there is such a user
const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    // check user
    existingUser = await user.getUserWithSameEmail();
  } catch (e) {
    next(e);
    return;
  }

  const sessionErrorData = {
    errorMessage: 'Invalid credentials - no such user and password!',
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect('/login');
    });
    return;
  }

  // check password
  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect('/login');
    });
    return;
  }

  // if ok
  authUtil.createUserSession(req, existingUser, () => {
    res.redirect('/');
  });

};

// logout
const logout = (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
};

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout
};