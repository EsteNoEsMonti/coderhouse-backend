import mongoose, { version } from "mongoose";
import { MONGODB_CNX_STR } from "../config/database.config.js";

export async function conectar() {
  // conectar el cliente
  await mongoose.connect(MONGODB_CNX_STR)
  console.log(`🌙 Data base connected to ${MONGODB_CNX_STR} 📚💻`);
}
