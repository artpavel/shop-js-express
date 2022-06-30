// user session monitoring
const createUserSession = (req, user, action) => {
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  req.session.save(action);
};

const destroyUserAuthSession = req => {
  req.session.uid = null;
};

module.exports = {
  createUserSession,
  destroyUserAuthSession
};