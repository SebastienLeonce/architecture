import express       from 'express';

import userRouter    from './user'
import sessionRouter from './session'

const router = express.Router();

router.use('/user', userRouter);
router.use('/session', sessionRouter)

export default router