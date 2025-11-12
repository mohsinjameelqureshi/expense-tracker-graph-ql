import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// This helps find the absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder
dotenv.config({ path: path.join(__dirname, "../.env") });

export const ENV = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
