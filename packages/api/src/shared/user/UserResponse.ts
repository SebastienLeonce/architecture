import mongoose from "mongoose";

export interface UserResponse {
    _id: string;
    username: string;
    mail: string,
    following?: mongoose.Types.ObjectId[],
    followers? : mongoose.Types.ObjectId[] 
}