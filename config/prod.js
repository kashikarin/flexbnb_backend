import 'dotenv/config'

export default {
  dbURL: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
  dbName: process.env.DB_NAME || 'database_flexbnb',
}
