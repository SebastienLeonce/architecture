import jwtUtils from 'utils/jwt-utils'
import { 
    Request,
    Response,
    NextFunction
} from 'express'

export default async (req: Request, _res : Response, next: NextFunction) => {
    const jwt = req.headers.cookie?.slice(4)

    if (jwt) {
        const user = await jwtUtils.decode(jwt);

        if (user) {
            return next()
        }
    }
    next('Unauthorized')
}