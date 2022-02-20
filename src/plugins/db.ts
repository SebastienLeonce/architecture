import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo-db:27017')
    .catch((error) => {
        console.error('connection error:', error);
        process.exit(1);
    });

export default {}