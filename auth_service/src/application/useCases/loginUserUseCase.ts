
import { comparePassword } from "../../_lib/utility/bcrypt/comparePassword";
import { IDependencies } from "../interfaces/IDependencies"


export const loginUserUseCase = (dependencies:IDependencies) => {
    const {repositories : {findUserByEmail} } = dependencies
  return {
    execute : async (email:string,password:string,role:string) => {
        try{

            console.log("login data use Case", {email,password,role});
            
            const user =  await findUserByEmail(email);
            if(!user) throw new Error('User not Found');
            else if(user.role !== role) throw new Error(`your a ${user.role} so you can't login as a ${role}`);
            const isMatch = await comparePassword(password, user.password);  
            if(!isMatch) throw new Error("Your password is mismatching");   
            return user;
        }
        catch(error:any){
            throw new Error(error?.message||"login user failed");
            
        }
    }
  }
}
