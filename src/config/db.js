const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URI;
const dbName = 'expensetracker';

let db, usersCollection, expensesCollection;
let client;

const connectDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(url, {
        maxPoolSize: 20, // Increases performance by limiting open connections
        serverSelectionTimeoutMS: 5000, // Faster failure if MongoDB is unreachable
      });

      await client.connect();
      console.log(`✅ Connected to MongoDB: ${dbName}`);
    }

    db = client.db(dbName);
    usersCollection = db.collection('users');
    expensesCollection = db.collection('expenses');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Function to get collections
const getUsersCollection = () => usersCollection;
const getExpensesCollection = () => expensesCollection;

module.exports = {
  connectDB,
  getUsersCollection,
  getExpensesCollection,
  ObjectId,
};
