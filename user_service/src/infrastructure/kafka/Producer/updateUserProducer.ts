
import { producer } from "..";
import { UserEntity } from "../../../domain/entities/UserEntity";


export default async (data: UserEntity) => {
	try {
		await producer.connect();
		const message: any = [

			{
				topic: "auth-service-topic",
				messages: [
					{
						key: "updateUser",
						value: JSON.stringify(data),
					},
				],
			},
			{
				topic: "course-service-topic",
				messages: [
					{
						key: "userCreated",
						value: JSON.stringify(data),
					},
				],
			},
			{
				topic: "chat-service-topic",
				messages: [
					{
						key: "userCreated",
						value: JSON.stringify(data),
					},
				],
			},
		]

		
		await producer.sendBatch({topicMessages: message});

		console.log(message, "user created produced--->");

	} catch (error: any) {
		console.error("kafka produce error:", error?.message);
	} finally {
		await producer.disconnect();
	}
};