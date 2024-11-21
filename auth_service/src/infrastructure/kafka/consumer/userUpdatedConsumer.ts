
import { UserEntity } from "../../../domain/entities/UserEntity";
import { updateUser } from "../../database/repositories";



export const updateUserConsumer = async (
    data: UserEntity
) => {

    try {

        await updateUser(data);

        console.log("==========");
        console.log("user-updated-consumed");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed error: ", error?.message);
    }

}