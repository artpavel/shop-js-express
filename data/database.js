const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const initial = require('../config/initial')

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    initial.DB_URL
  );
  database = client.db(initial.DATABASE);
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
