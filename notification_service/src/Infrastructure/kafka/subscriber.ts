import forgotPasswordConsumer from "./consumer/forgotPasswordConsumer";


interface ISubscriber {
	forgotPassword(data: any): Promise<void>;
}

export interface INotificationSubscriber
	extends Pick<
		ISubscriber,
		"forgotPassword" 
	> {}

export const createSubscriber = (): INotificationSubscriber => {
	return {
		forgotPassword: forgotPasswordConsumer,
	};
};