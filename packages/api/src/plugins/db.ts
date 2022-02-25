import mongoose from 'mongoose';

let db: mongoose.Mongoose;

const connection = async () => {
    const DB_URL = process.env.DB_URL || '';
    
    db = await mongoose.connect(DB_URL).catch((error) => {
        console.error("connection error:", error);
        process.exit(1);
    });
}

const disconnection = () => {
    db.disconnect()
}

const isConnected = () => {
    return mongoose.connection.readyState;
}

export default { 
    connection,
    disconnection,
    isConnected
    
}