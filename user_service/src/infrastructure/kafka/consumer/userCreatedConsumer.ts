
import { UserEntity } from "../../../domain/entities/UserEntity";
import { createUser } from "../../database/repositories/createUser";


export const userCreatedConsumer = async (
    data: UserEntity
) => {

    try {
        console.log(data,"this is our data")
        await createUser(data);

        console.log("==========");
        console.log("user-created-consumed");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed error: ", error?.message);
    }

}