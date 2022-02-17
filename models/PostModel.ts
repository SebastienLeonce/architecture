import { model, Schema } from "mongoose";
import { User } from "./User";

export interface Post {
    title: string, 
    content: string,
    date?: Date,
    user: Schema.Types.ObjectId | User
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

export const PostModel = model<Post>('Post', schema);