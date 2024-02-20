import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL)
    } catch (err) {
        throw Error(err)
    }
}


export default connectDB;