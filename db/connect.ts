import mongoose, { Mongoose } from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI || '';
const password = process.env.password || ''; // Fallback to an empty string if undefined
const MONGO_URI = "mongodb+srv://dhanushpachabhatla:"+password+"@taskmaster.o60or.mongodb.net/?retryWrites=true&w=majority&appName=taskmaster";

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}


declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// Declaring the type for the cached variable
interface CachedMongoose {
  conn: mongoose.Connection | null;
  promise: Promise<Mongoose> | null; // Adjusted to mongoose.Mongoose
}

// Check if global.mongoose is already set; otherwise, initialize it
let cached: CachedMongoose = global.mongoose as CachedMongoose || { conn: null, promise: null };

async function dbConnect() {
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log('Successfully connected to MongoDB');
        return mongooseInstance; // mongooseInstance is of type mongoose.Mongoose
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
      });
  } 

  // Assign the connection from the mongoose instance to cached.conn
  cached.conn = (await cached.promise).connection;
  return cached.conn;
}

export default dbConnect;
