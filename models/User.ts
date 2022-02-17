import {
    model,
    Schema,
} from "mongoose";

export interface User {
    username: string,
    password: string,
    mail: string,
    admin?: boolean
}

const schema = new Schema <User> ({
    username: {
        type: String,
        unique: true,
        required: true,
        description: "The user's name."
    },
    mail: {
        type: String,
        unique: true,
        required: true,
        description: "The user's mail."
    },
    admin: {
        type: Boolean,
        default: false,
        description: "The user's role."
    },
    password: {
        type: String,
        required: true,
        description: "The user's password."
    }
});

export const UserModel =  model<User>('User', schema);