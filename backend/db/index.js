import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";
import { ENV } from "../utils/env.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${ENV.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb Connected! DB host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection error", error);
    process.exit(1);
  }
};

export default connectDB;
