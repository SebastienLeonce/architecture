import { UserModel, User } from '@models/User';
import * as DatabaseError from '@shared/error/DatabaseError';
import * as UserError from '@shared/error/UserError';
import { UserResponse } from '@shared/user/UserResponse';
import { Log } from '@utils/Logger';
import bcryptjs from 'bcryptjs';
import { NotificationService } from './NotificationService';
import { Notification } from '@shared/notification/Notification';

export async function getAllUserLimited(skip = 0, limit = 10) : Promise<UserResponse[]>{
    const users = await UserModel.find()
                                 .skip(skip)
                                 .limit(limit)
                                 .catch((err) => {
                                     Log.fatal(err.message);
                                     throw DatabaseError.DB_UNAVAILABLE_ERROR
                                 });

    return users.map(xx=>{
        return <UserResponse>{
            _id: xx._id.toString(),
            username: xx.username,
            mail: xx.mail
        };
    });
}

export async function getAllUser() : Promise<UserResponse[]> {
    const users = await UserModel.
        find().
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        })

    return users.map(xx=>{
        return <UserResponse>{
            _id: xx._id.toString(),
            username: xx.username,
            mail: xx.mail
        };
  });
}

export async function getUserByUsername(username: string) {
    const user = await UserModel.
        findOne({username: username}).
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        })

    if (!user) throw UserError.USER_NOT_FOUND_ERROR

    return user;
}

export async function getUserById(id: string) {
    const user = await UserModel.
        findOne({_id: id}).
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        })
    
    if (!user) throw UserError.USER_NOT_FOUND_ERROR

    return <UserResponse>{
        _id: user._id.toString(),
        username: user.username,
        mail: user.mail,
        following: user.following,
        followers: user.followers
    }
}

export async function getUserObjectID(id: string) {
    const user = await UserModel.
        findOne({_id: id}).
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        })
    
    if (!user) throw UserError.USER_NOT_FOUND_ERROR

    return user._id;
}

export async function createUser(username: string, password: string, mail: string){
    const user = new UserModel<User>({
        username,
        password: bcryptjs.hashSync(password),
        mail, 
        following: [],
        followers: []
    });

    await user.
        save().
        catch((error) => { 
            Log.fatal(error)
            throw UserError.USER_ALREADY_EXIST_ERROR
        })

    const { password:string, __v, ...data} = user.toJSON() 

    return data;
}

export async function updateUserPassword(id: string, password: string){
    let user = await UserModel.
        findByIdAndUpdate(id, { password: bcryptjs.hashSync(password) }).
        catch((err) => { 
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        })

    if (!user) throw UserError.USER_NOT_FOUND_ERROR

    let UserResponse = await getUserById(user._id.toString()).catch((err: Error) => {throw err})
    return UserResponse;
}

export async function deleteUser(id: string){
    await getUserById(id).catch((error: Error) => {throw error});
    await UserModel.deleteOne({ _id: id })
                   .catch((err) => { 
                        Log.fatal(err.message);
                        throw DatabaseError.DB_UNAVAILABLE_ERROR })
}

// Get all users that the user is following
export async function getFollowing(id: string){
    const user = await getUserById(id).catch((error: Error) => {throw error});
    const following = user.following;
    const users = await UserModel.
        find({_id: {$in: following}}).
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        })

    return users.map(xx=>{
        return <UserResponse>{
            _id: xx._id.toString(),
            username: xx.username,
            mail: xx.mail
        };
  });
}

// Add a user to the list of following
export async function followUser(id: string, userId: string){
    // Get the user that is following
    const user = await getUserById(id).catch((error: Error) => {throw error});
    const following = user.following;

    // Check if the user exists
    const userToFollow = await getUserById(userId).catch((error: Error) => {throw error});
    
    // Cast userId string to ObjectId
    const userIdObject = await getUserObjectID(userId);
    
    // Check if the user is already following and if the following list exists
    if (!following) throw UserError.USER_NOT_FOUND_ERROR;
    if (following.includes(userIdObject)) throw UserError.USER_ALREADY_FOLLOWING_ERROR;

    // Add the user to the following list
    following.push(userIdObject);
    await UserModel.findByIdAndUpdate(id, { following: following })
                   .catch((err) => {
                       Log.fatal(err.message);
                       throw DatabaseError.DB_UNAVAILABLE_ERROR
                   })

    // Add the user to the list of followers of the user to follow
    const followers = userToFollow.followers;
    if (!followers) throw UserError.USER_NOT_FOUND_ERROR;
    if (followers.includes(userIdObject)) throw UserError.USER_ALREADY_FOLLOWING_ERROR;
    const idObject = await getUserObjectID(id);
    followers.push(idObject);
    await UserModel.findByIdAndUpdate(userId, { followers: followers })
                   .catch((err) => {
                       Log.fatal(err.message);
                       throw DatabaseError.DB_UNAVAILABLE_ERROR
                   })
    
    // Notify the user that he is following someone
    const notification : Notification = new Notification("You are now following " + userToFollow.username, "New Follow", user);
    NotificationService.sendNotification(notification)
                       .then(() => console.log("Mail sent successfully"))
                       .catch((err: Error) => console.error(err))
                       
}

// Remove a user from the list of following
export async function unfollowUser(id: string, userId: string){
    const user = await getUserById(id).catch((error: Error) => {throw error});
    const following = user.following;

    // Cast userId string to ObjectId
    const userIdObject = await getUserObjectID(userId);
    
    if (!following) throw UserError.USER_NOT_FOUND_ERROR;
    if (!following.includes(userIdObject)) throw UserError.USER_NOT_FOLLOWING_ERROR;

    following.splice(following.indexOf(userIdObject), 1);
    await UserModel.findByIdAndUpdate(id, { following: following })
                   .catch((err) => {
                       Log.fatal(err.message);
                       throw DatabaseError.DB_UNAVAILABLE_ERROR
                   })

    // // Remove the user from the list of followers of the user to follow
    // const userToFollow = await getUserById(userId).catch((error: Error) => {throw error});
    // const followers = userToFollow.followers;
    // if (!followers) throw UserError.USER_NOT_FOUND_ERROR;
    // if (!followers.includes(userIdObject)) throw UserError.USER_NOT_FOLLOWING_ERROR;
    // const idObject = await getUserObjectID(id);
    // followers.splice(followers.indexOf(idObject), 1);
    // await UserModel.findByIdAndUpdate(userId, { followers: followers })
    //                .catch((err) => {
    //                       Log.fatal(err.message);
    //                       throw DatabaseError.DB_UNAVAILABLE_ERROR
    //                   })
}
   

// Get all the user who are following the user
export async function getFollowers(id: string){
    const user = await getUserById(id).catch((error: Error) => {throw error});
    const followers = user.followers;
    const users = await UserModel.
        find({_id: {$in: followers}}).
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR
        })

    return users.map(xx=>{
        return <UserResponse>{
            _id: xx._id.toString(),
            username: xx.username,
            mail: xx.mail
        };
  });
}