import jwtUtils from '@utils/jwt-utils';
import * as AuthError from '@shared/error/AuthError'
import * as UserService from './UserService'
import error from '@shared/error/Error';
import bcryptjs from 'bcryptjs';

export async function login(username : string, password : string) : Promise<[jwt: string, _id: string]> {
    const user = await UserService.
        getUserByUsername(username).
        catch((error: error) => {throw error})

    if (!bcryptjs.compareSync(password, user.password)) throw AuthError.USER_PASSWORD_ERROR

    const jwt = await jwtUtils.sign({
        id: user._id,
        username: user.username,
        mail: user.mail
    })
    return [
        jwt,
        user._id.toString()
    ];
}

export async function register(username : string, password : string, mail: string) : Promise<[jwt: string, _id: string]> {
    const userCreated = await UserService.
        createUser(username, password, mail).
        catch((error: error) => {throw error});

    const jwt = await jwtUtils.sign({
        id: userCreated._id,
        username: userCreated.username,
        mail: userCreated.mail
    })
    return [
        jwt,
        userCreated._id.toString()
    ];
} 