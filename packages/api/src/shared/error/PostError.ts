import Error from './Error'

export const POST_NOT_FOUND_ERROR : Error = {
    error: "POST_NOT_FOUND_ERROR",
    lib: "Post requested not found or not exist",
    status: 404
}

export const COMMENT_NOT_FOUND_ERROR : Error = {
    error: "COMMENT_NOT_FOUND_ERROR",
    lib: "Comment requested not found or not exist",
    status: 404
}