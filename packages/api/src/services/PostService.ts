import { Post, PostModel } from "@models/PostModel";
import { Log } from "@utils/Logger";
import * as DatabaseError from "@shared/error/DatabaseError";
import * as PostError from "@shared/error/PostError";
import { ObjectId } from "mongoose";

export async function getAllPost(skip = 0, limit = 10) : Promise<Post[]>{
    return await PostModel
        .find()
        .skip(skip)
        .limit(limit)
        .catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        });
    
}

export async function getOnePost(postId: string) : Promise<Post | null>{
    return await PostModel
        .findOne({_id: postId})
        .catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        });
}

export async function createPost(title: string, content: string, user: string) : Promise<Post>{
    const postCreated = new PostModel<Post>({
        title,
        content,
        user
    });

    return await postCreated
        .save()
        .catch((error) => {
            Log.fatal(error.message); 
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        });
}

export async function updatePost(postId: string, title: string, content: string, user: string) : Promise<Post>{
    let post = await PostModel
        .findByIdAndUpdate(postId, {title, content, user})
        .catch((err) => { 
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        });

    if (!post) throw PostError.POST_NOT_FOUND_ERROR

    return post;
}

export async function deletePost(postId: string) {
    await getOnePost(postId).catch((error: Error) => { throw error })
    await PostModel
        .deleteOne({ _id: postId })
        .catch((err) => { 
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        }); 
}
