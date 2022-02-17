import express       from 'express';

import UserRoute    from './UserRoute'
import AuthRoute    from './AuthRoute'

import isAuthenticated from 'middlewares/isAuthenticated';

const router = express.Router();

router.use('/user', isAuthenticated, UserRoute);
router.use('/auth', AuthRoute)

export default router