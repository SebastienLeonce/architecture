import mongoose from 'mongoose';
const { model, Schema, } = mongoose;
import { User } from "./User";

export interface Comment{
    // _id: mongoose.Schema.Types.ObjectId | string;
    post_id: mongoose.Schema.Types.ObjectId | Post | string,
    user_id: mongoose.Schema.Types.ObjectId | User | string,
    date: Date,
    content: string,
}
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

const commentSchema = new Schema <Comment> ({
    post_id: {
        ref: "Post",
        type: Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});

export const PostModel = mongoose.modelNames().includes("Post")
  ? model<Post>('Post')
  : model<Post>("Post", schema);

export const CommentModel = mongoose.modelNames().includes("Comment")
    ? model<Comment>('Comment')
    : model<Comment>("Comment", commentSchema);