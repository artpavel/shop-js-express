const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');
const initial = require('./initial');

const createSessionStore = () => {
  const MongoDBStore = mongoDbStore(expressSession);

  return new MongoDBStore({
    uri: initial.DB_URL,
    databaseName: initial.DATABASE,
    collection: 'sessions'
  });
};

const createSessionConfig = () => ({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  store: createSessionStore(),
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 1000
  }
});

module.exports = createSessionConfig;