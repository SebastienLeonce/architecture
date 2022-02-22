import Error from './Error'

export const DB_UNAVAILABLE_ERROR : Error = {
    error: "DB_UNAVAILABLE_ERROR",
    lib: "Impossible to connect or request the database",
    status: 500
}
