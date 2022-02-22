import Error from './Error'

export const USER_PASSWORD_ERROR : Error = {
    error: "USER_PASSWORD_ERROR",
    lib: "This user password is not valid",
    status: 401
}

export const USER_UNKNOWN_ERROR : Error = {
    error: "USER_UNKNOWN_ERROR",
    lib: "This user is unknown. Please create an account",
    status: 401
}

export const USER_ALREADY_EXIST_ERROR : Error = {
    error: "USER_ALREADY_EXIST_ERROR",
    lib: "This user already exist. You can't create an user with this same username",
    status: 401
}