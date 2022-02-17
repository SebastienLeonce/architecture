import express       from 'express';

import userRouter    from './UserRoute'
import sessionRouter from './AuthRoute'

import isAuthenticated from 'middlewares/isAuthenticated';

const router = express.Router();

router.use('/user', isAuthenticated, userRouter);
router.use('/auth', sessionRouter)

export default router