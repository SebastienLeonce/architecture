import jwtUtils from 'utils/jwt-utils';
import * as AuthError from 'types/error/AuthError'
import * as UserService from './UserService'

export async function login(username : string, password : string) : Promise<string> {
    const user = await UserService.getUserByUsername(username)
                                  .catch((error: Error) => {throw error})

    if (!user) throw AuthError.USER_UNKNOWN_ERROR;
    if (password != user.password) throw AuthError.USER_PASSWORD_ERROR

    return await jwtUtils.sign({
        id: user._id,
        username: user.username,
    });
}

export async function register(username : string, password : string) : Promise<string>{
    const userCreated = await UserService.createUser(username, password)
                                         .catch((error: Error) => {throw error});

    
    return await jwtUtils.sign({
        id: userCreated._id,
        username: userCreated.username,
    });
}