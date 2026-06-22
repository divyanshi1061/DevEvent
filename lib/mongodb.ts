import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

// MongoDB connection string loaded from environment variables.
const MONGODB_URI = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Global cache for the Mongoose connection to prevent multiple connections during
// hot reloads in development mode.
declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongoose || { conn: null, promise: null };

mongoose.set('strictQuery', true);

const mongooseOptions: ConnectOptions = {
  // Recommended options for modern MongoDB drivers.
  dbName: process.env.MONGODB_DB,
};

/**
 * Connect to MongoDB and cache the connection object.
 * Subsequent calls reuse the already established connection.
 */
export async function connectMongo(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, mongooseOptions).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export default connectMongo;
