import { UserModel, User } from '@models/User';
import * as DatabaseError from '@shared/error/DatabaseError';
import * as UserError from '@shared/error/UserError';
import { UserResponse } from '@shared/user/UserResponse';
import { Log } from '@utils/Logger';
import bcryptjs from 'bcryptjs';


export async function getAllUser() : Promise<UserResponse[]> {
    const users = await UserModel.
        find().
        select({password: 0}).
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
        select({password: 0}).
        catch((err) => {
            Log.fatal(err.message);
            throw DatabaseError.DB_UNAVAILABLE_ERROR 
        })
    
    if (!user) throw UserError.USER_NOT_FOUND_ERROR

    return <UserResponse>{
        _id: user._id.toString(),
        username: user.username,
        mail: user.mail
    }
}

export async function createUser(username: string, password: string, mail: string){
    const user = new UserModel<User>({
        username,
        password: bcryptjs.hashSync(password),
        mail
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