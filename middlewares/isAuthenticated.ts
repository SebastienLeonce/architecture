import jwtUtils from 'utils/jwt-utils'
import { User } from '@models/User'
import { 
    Request,
    Response,
    NextFunction
} from 'express'
import * as MiddlewareError from 'types/error/MiddlewareError'

export default async (req: Request, _res : Response, next: NextFunction) => {
    const jwt = req.signedCookies.jwt

    if (jwt) {
        const user = await jwtUtils.decode(jwt) as User

        if (user) {
            req.user = user
            return next()
        }
    }
    _res.status(401).send(MiddlewareError.UNAUTHORIZED_ERROR)
    next()
}