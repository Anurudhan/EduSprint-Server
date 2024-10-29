    const bcrypt =  require('bcryptjs');

    export const hashPassword = async (password: string) =>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            console.log("here my hash pass" + hashedPassword);
            
            if(!hashedPassword){
                throw new Error("Password hashing Error!");
            }
            return hashedPassword;
        }
        catch(error:any){
            throw new Error(error.message);
        }
    }