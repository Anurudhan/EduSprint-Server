import { constant } from "../../../_lib/common/constant";
import { UserEntity } from "../../../domain/entities";
import { Otp, User } from "../models";


export const verifyOtp = async(email:string,otp:string|number):Promise<boolean | null> =>{
    try{
        const verified = await Otp.findOne({email,otp});
        if(verified){
            const result :  UserEntity | null = await User.findOne({email});
            if (result ) {
                await User.updateOne({ email: email }, { $set: { isOtpVerified: true } });
            }
            console.log(result,"Result of user in otp"); 
        }
        console.log(verified,"verification of Otp");
        
        return verified !== null;
    }
    catch(error:constant){
        console.log(error, "Something Went wrong")
        return false
    }
}