import jwtUtils from '@utils/jwt-utils';
import * as AuthError from '@shared/error/AuthError'
import * as UserService from './UserService'
import error from '@shared/error/Error';
import bcryptjs from 'bcryptjs';

export async function login(username : string, password : string) : Promise<string> {
    const user = await UserService.
        getUserByUsername(username).
        catch((error: error) => {throw error})

    if (!bcryptjs.compareSync(password, user.password)) throw AuthError.USER_PASSWORD_ERROR

    return await jwtUtils.sign({
        id: user._id,
        username: user.username,
        mail: user.mail
    });
}

export async function register(username : string, password : string, mail: string) : Promise<string>{
    const userCreated = await UserService.
        createUser(username, password, mail).
        catch((error: error) => {throw error});

    
    return await jwtUtils.sign({
        id: userCreated._id,
        username: userCreated.username,
        mail: userCreated.mail
    });
} 