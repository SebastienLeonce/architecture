import { CommentModel, Post, PostModel, Comment } from "@models/PostModel";
import { Log } from "@utils/Logger";
import * as DatabaseError from "@shared/error/DatabaseError";
import * as PostError from "@shared/error/PostError"; 
import { ObjectId } from "mongoose";
import { getUserById } from "./UserService";

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

export async function deletePost(postId: string) : Promise<void>{
    await getOnePost(postId).catch((error: Error) => { throw error })
    await PostModel
        .deleteOne({ _id: postId })
        .catch((err) => { 
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        }); 
}

// Get all posts by user
export async function getAllPostByUser(userId: string) : Promise<Post[]>{
    return await PostModel
        .find({user: userId})
        .catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        });
}

// Get all following users posts of one user
export async function getAllFollowingPostByUser(userId: string) : Promise<Post[]>{
    const user = await getUserById(userId).catch((error: Error) => {throw error});
    const following = user.following;
    const posts = await PostModel
        .find({user: {$in: following}})
        .catch((err) => { 
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        });

    return posts;
}

// Add a comment 
export async function addComment(postId: string, userId: string, content: string) : Promise<void>{
    const post = await getOnePost(postId).catch((error: Error) => {throw error});
    if (!post) throw PostError.POST_NOT_FOUND_ERROR;

    const comment = {
        post_id: postId,
        user_id: userId,
        date: new Date(),
        content
    }

    const newComment = new CommentModel<Comment>(comment);
    await newComment
        .save()
        .catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        });
}

// Get all comments of one post 
export async function getAllCommentsByPost(postId: string) : Promise<Comment[]>{
    const post = await getOnePost(postId).catch((error: Error) => {throw error});
    if (!post) throw PostError.POST_NOT_FOUND_ERROR;

    const comments = await CommentModel
        .find({post_id: postId})
        .catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        });

    return comments;
}

// Delete a comment
export async function deleteComment(postId: string, commentId: string, userId: string) : Promise<Comment>{
    // Find the comment by his id 
    const comment = await CommentModel.findById(commentId)
                                      .catch((error: Error) => {throw error});
    if (!comment) throw PostError.COMMENT_NOT_FOUND_ERROR;

    // Check if the comment is from the post
    Log.info(`Comment post id: ${comment.post_id}`);
    if (comment.post_id != postId) throw PostError.COMMENT_NOT_FOUND_ERROR;

    // Find the author of the comment
    const user = await getUserById(comment.user_id.toString()).catch((error: Error) => {throw error});
    Log.info(`Comment user id: ${user._id}`);
    if (!user) throw PostError.COMMENT_NOT_FOUND_ERROR;

    // Check if the comment author is the user else verify if the user is admin
    if (comment.user_id == userId || user.admin) {
        await CommentModel
            .deleteOne({ _id: commentId })
            .catch((err) => {
                Log.fatal(err.message);
                throw DatabaseError.DB_UNAVAILABLE_ERROR
            });
            return comment;
    }
    else 
        throw PostError.COMMENT_NOT_FOUND_ERROR;
}