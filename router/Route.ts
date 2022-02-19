import express       from 'express';

import UserRoute    from './UserRoute'
import AuthRoute    from './AuthRoute'
import PostRoute    from './PostRoute'

import isAuthenticated from 'middlewares/isAuthenticated';

const router = express.Router();

router.use('/auth', AuthRoute 
    // #swagger.tags = ['Auth']
);
router.use('/user', isAuthenticated, UserRoute
    // #swagger.tags = ['User']
);
router.use('/post', isAuthenticated, PostRoute
    // #swagger.tags = ['Post']
);

export default router