import mongoose from "mongoose";
import { env_variables } from "./config";
export default async () => {
	try {
		const mongoUrl = env_variables.MONGODB_URL;
		console.log(mongoUrl);
		

		if (!mongoUrl) {
			throw new Error(
				"MongoDB connection string not provided in environment variables"
			);
		}

		let res = await mongoose.connect(mongoUrl.trim());
		if(res) console.log("🍃 MongoDB connected successfully ---> auth-service 🍃");
	} catch (error: any) {
		console.error(`❌ Database Connection failed❌`);
		console.error(error.message);
		process.exit(1);
	}
};