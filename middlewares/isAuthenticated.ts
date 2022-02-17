import jwtUtils from 'utils/jwt-utils'
import { 
    Request,
    Response,
    NextFunction
} from 'express'
import * as MiddlewareError from 'types/error/MiddlewareError'

export default async (req: Request, _res : Response, next: NextFunction) => {
    const jwt = req.headers.cookie?.slice(4)

    if (jwt) {
        const user = await jwtUtils.decode(jwt);

        if (user) {
            return next()
        }
    }
    _res.status(401).send(MiddlewareError.UNAUTHORIZED_ERROR)
    next()
}

export async function whoami(req: Request, _res : Response) {
    const jwt = req.headers.cookie?.slice(4)

    if (jwt) {
        const user = await jwtUtils.decode(jwt);
        return user
    }
}