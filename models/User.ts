import {
    model,
    Schema,
} from "mongoose";

export interface User {
    username: string,
    password: string,
}

const schema = new Schema <User> ({
    username: {
        type: String,
        unique: true,
        required: true,
        description: "The user's name."
    },
    password: {
        type: String,
        required: true,
        description: "The user's password."
    }
});

export const UserModel =  model<User>('User', schema);