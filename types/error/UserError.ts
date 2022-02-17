import Error from './Error'

export const USER_ALREADY_EXIST_ERROR : Error = {
    error: "USER_ALREADY_EXIST_ERROR",
    lib: "This user already exist. You can't create an user with this same username",
    status: 404
}

export const USER_NOT_FOUND_ERROR : Error = {
    error: "USER_NOT_FOUND_ERROR",
    lib: "User requested not found or not exist",
    status: 404
}