
import { constant } from "../../_lib/common/constant";
import { comparePassword } from "../../_lib/utility/bcrypt/comparePassword";
import { IDependencies } from "../interfaces/IDependencies"


export const loginUserUseCase = (dependencies:IDependencies) => {
    const {repositories : {findUserByEmail} } = dependencies
  return {
    execute : async (email:string,password:string,role:string) => {
        try{

            console.log("login data use Case", {email,password,role});
            
            const user =  await findUserByEmail(email);
            if(!user) return "User not found. Please check your email and try again."
            else if(user.role !== role) return `Your account is a ${user.role}. You are not authorized to log in as a ${role}.`;
            const isMatch = await comparePassword(password, user.password);  
            if(!isMatch) return `Incorrect password. Please try again.`;  
            return user;
        }
        catch(error:constant){
            throw new Error(error?.message||"login user failed");
            
        }
    }
  }
}
