import { model, Schema } from "mongoose";
import { CategoryEntity } from "../../../domain/entities/categoryEntity";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type: String,
        enum: ["active","blocked"],
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        requiredL:true
    },
    count:{
        type:Number,
        default:0
    }
},{
    timestamps:true
}
)
export const Category=model<CategoryEntity>("categories",categorySchema)