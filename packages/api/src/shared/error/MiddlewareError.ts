import Error from './Error'

export const UNAUTHORIZED_ERROR : Error = {
    error: "USER_UNAUTHORIZED_ERROR",
    lib: "This user is unauthorized. Please connect you to access to this resource.",
    status: 401
}
