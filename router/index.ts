import express       from 'express';

import userRouter    from './user'
import sessionRouter from './session'

import isAuthenticated from 'middlewares/isAuthenticated';

const router = express.Router();

router.use('/user', isAuthenticated, userRouter);
router.use('/session', sessionRouter)

export default router