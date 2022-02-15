import express from 'express';

import jwtUtils, { cookieProps } from 'utils/jwt-utils';
import { UserModel } from '@models/User';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username && !password) return res.json('error');

    const user = await UserModel.findOne({username});

    if (!user) {
        return res.json('error');
    }

    const pwdPassed = password == user.password;

    if (!pwdPassed) {
        return res.json('error');
    }

    const jwt = await jwtUtils.sign({
        id: user._id,
        username: user.username,
    });
    
    const { key, options } = cookieProps;
    
    res.cookie(key, jwt, options).json({
        username,
        password
    })
});

router.delete('/', async (req, res) => {
    const { key, options } = cookieProps;

    res.clearCookie(key, options).end()
});

export default router;