import mongoose from 'mongoose';
const { model, Schema, } = mongoose;
import { User } from "./User";

export interface Post {
    title: string, 
    content: string,
    date?: Date,
    user: mongoose.Schema.Types.ObjectId | User | string
}

const schema = new Schema <Post> ({
    title: {
        type: String,
        required: true,
        description: "The Post title"
    },
    content: {
        type: String,
        required: true,
        description: "The Post content"
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: "User", 
        type: Schema.Types.ObjectId,
        required: true
    }
});

export const PostModel = mongoose.modelNames().includes("Post")
  ? model<Post>('Post')
  : model<Post>("Post", schema);