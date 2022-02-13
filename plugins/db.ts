import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

MongoMemoryServer.create().then(mongoServer => {
    const DB_URL = process.env.NODE_ENV == 'prod' ? process.env.DB_URL : mongoServer.getUri();

    mongoose.connect(DB_URL as string)
        .then(async () => {
            // console.log("MongoDB Connected...");
        }).catch((error) => {
            console.error('connection error:', error);
            process.exit(1);
        });
});


export default {}