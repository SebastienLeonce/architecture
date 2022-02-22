import mongoose from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";

const connection = async () => {
    const DB_URL = process.env.DB_URL || (await MongoMemoryServer.create()).getUri();
    
    mongoose.connect(DB_URL).catch((error) => {
        console.error("connection error:", error);
        process.exit(1);
    });
}

connection()

export default { }