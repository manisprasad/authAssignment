import mongoose from 'mongoose';


const connectDB = async () => {
    const url = process.env.MONGO_URL; 

    if (!url) {
       
        throw new Error("MONGO_URL is required in environment variables.");
    }

    try {
       
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (error: any) {
       
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error('Error connecting to MongoDB');
    }
};

export default connectDB;
