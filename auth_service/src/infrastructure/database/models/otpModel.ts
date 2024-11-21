import mongoose,{model, Schema} from "mongoose";
import { otpEntity } from "../../../domain/entities";

const otpSchema = new Schema(
    {
        email:{
            type:String,
            require:true
        },
        otp:{
            type:String||Number
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 30, 
          },
        
    },
    {
        timestamps: true,
    }

)
export const Otp = model<otpEntity>("Otp", otpSchema);