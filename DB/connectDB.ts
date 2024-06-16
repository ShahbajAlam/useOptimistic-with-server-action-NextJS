import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "logos",
        });
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
}
