import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDb connected: ${connect.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.trimEnd.underline);
    process.exit(1);
  }
};
