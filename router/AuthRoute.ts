import express from 'express';
import { cookieProps } from 'utils/jwt-utils';
import * as AuthService from 'services/AuthService'
import * as RequestError from 'types/error/RequestError';
import Error from 'types/error/Error';
// import { whoami } from 'middlewares/isAuthenticated';

const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username && !password) return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);

    const { key, options } = cookieProps;

    const jwt = await AuthService.login(username, password)
                                 .catch((err: Error) => res.status(err.status).send(err))

    return res.status(201).cookie(key, jwt, options).send({ message: 'Success'})
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username && !password) return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);

    const { key, options } = cookieProps;

    const jwt = await AuthService.register(username, password)
                                 .catch((err: Error) => res.status(err.status).send(err))

    return res.status(201).cookie(key, jwt, options).send({ message: 'Success'})
})

router.delete('/logout', async (req, res) => {
    const { key, options } = cookieProps;

    res.clearCookie(key, options).end()
});

// router.get('/whoami', async (req, res) => {
//     const user = await whoami(req, res)
//     return res.status(200).send(user)
// })

export default router;