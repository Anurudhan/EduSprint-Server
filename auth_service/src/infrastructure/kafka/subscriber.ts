import { UserEntity } from "../../domain/entities";
import { updateUserConsumer } from "./consumer/userUpdatedConsumer";


export interface ISubscriber {
	updateUser: (data: UserEntity) => Promise<void>;

}

export interface IUserSubscriber
	extends Pick<
		ISubscriber,
		"updateUser" 
	> {}

export const createSubscriber = (): IUserSubscriber => {
	return {
		updateUser: updateUserConsumer,
		
	};
};