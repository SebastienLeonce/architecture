import mongoose from 'mongoose';
const { model, Schema, } = mongoose;

export interface User {
    username: string,
    password: string,
    mail: string,
    admin?: boolean,
    following: mongoose.Types.ObjectId[],
    followers: mongoose.Types.ObjectId[] 
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
    }, 
    following: {
        ref: "User", 
        type: [Schema.Types.ObjectId],
        description: "The user's following users",
        example: [
            "5e9f8f8f8f8f8f8f8f8f8f8",
            "5e9f8f8f8f8f8f8f8f8f8f8"
        ],
        required: true,
    },
    followers: {
        ref: "User",
        type: [Schema.Types.ObjectId],
        description: "The user's followers",
        example: [
            "5e9f8f8f8f8f8f8f8f8f8f8",
            "5e9f8f8f8f8f8f8f8f8f8f8"
        ],
        required: true,
    }
});

export const UserModel = mongoose.modelNames().includes("User")
  ? model<User>("User")
  : model<User>("User", schema);