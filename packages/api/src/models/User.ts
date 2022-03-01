import mongoose from 'mongoose';
const { model, Schema, } = mongoose;

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
        description: "The user's name.",
        example: "John"
    },
    mail: {
        type: String,
        unique: true,
        required: true,
        description: "The user's mail.",
        example: "john@john.com"
    },
    admin: {
        type: Boolean,
        default: false,
        description: "The user's role."
    },
    password: {
        type: String,
        required: true,
        description: "The user's password.",
        example: "JohnPassword"
    }
});

export const UserModel = mongoose.modelNames().includes("User")
  ? model<User>("User")
  : model<User>("User", schema);