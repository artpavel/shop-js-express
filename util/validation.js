// check data from form
const isEmpty = value => !value || value.trim() === '';

const userCredentialsAreValid = (email, password) => (
  email && email.includes('@') && password && password.trim().length >= 6
);

const userDetailsAreValid = (email, password, name, street, postal, city) => (
  userCredentialsAreValid(email, password) &&
  !isEmpty(name) &&
  !isEmpty(street) &&
  !isEmpty(postal) &&
  !isEmpty(city)
);

const emailIsConfirmed = (email, confirmEmail) => email === confirmEmail;

module.exports = {
  userDetailsAreValid,
  emailIsConfirmed
};