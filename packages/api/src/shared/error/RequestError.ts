import Error from './Error'

export const INVALID_PARAMETER_NUMBER_ERROR : Error = {
    error: "INVALID_PARAMETER_ERROR",
    lib: "The number of parameters are invalid for this request",
    status: 400
}

export const INVALID_PARAMETER_ID_FORMAT_ERROR : Error = {
    error: "INVALID_PARAMETER_ID_FORMAT_ERROR",
    lib: "The format of the _id parameter is 24 characters long",
    status: 400
}

export const INVALID_PARAMETER_FORMAT_ERROR : Error = {
    error: "INVALID_PARAMETER_FORMAT_ERROR",
    lib: "The format of one of parameter is invalid",
    status: 400
}

export const BODY_PARAMETERS_UNDEFINED_ERROR : Error = {
    error: "BODY_PARAMETERS_NULL_ERROR",
    lib: "The required body parameters are not present, null or undefined",
    status: 400
}

export const PERMISSION_DENIED_ERROR : Error = {
    error: "PERMISSION_DENIED_ERROR",
    lib: "You don't have permission to perform this action",
    status: 403
}