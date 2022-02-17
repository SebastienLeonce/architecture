import express       from 'express';

import UserRoute    from './UserRoute'
import AuthRoute    from './AuthRoute'
import PostRoute    from './PostRoute'

import isAuthenticated from 'middlewares/isAuthenticated';

const router = express.Router();

router.use('/user', isAuthenticated, UserRoute);
router.use('/auth', AuthRoute)
router.use('/post', isAuthenticated, PostRoute)

export default router