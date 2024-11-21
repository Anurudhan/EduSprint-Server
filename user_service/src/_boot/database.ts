import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default async () => {
	try {
		const mongoUrl = process.env.MONGODB_URL;
		console.log(mongoUrl);
		

		if (!mongoUrl) {
			throw new Error(
				"MongoDB connection string not provided in environment variables"
			);
		}

		let res = await mongoose.connect(mongoUrl.trim());
		if(res) console.log("🍃 MongoDB connected successfully ---> user-service 🍃");
	} catch (error: any) {
		console.error(`❌ Database Connection failed❌`);
		console.error(error.message);
		process.exit(1);
	}
};