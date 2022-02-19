import express from 'express';
import { cookieProps } from '@utils/jwt-utils';
import * as AuthService from '@services/AuthService'
import * as RequestError from '@shared/error/RequestError';
import Error from '@shared/error/Error';
import { Log } from '@utils/Logger';

const router = express.Router();


router.post('/login', async (req, res) => {
    Log.info('POST /api/auth/login');

    const { username, password } = req.body;
    if (!username && !password) return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);

    const { key, options } = cookieProps;

    AuthService.login(username, password)
               .then((jwt: string) => res.status(201).cookie(key, jwt, options).send({ message: 'Success'}))
               .catch((err: Error) => res.status(404).send(err))
})

router.post('/register', async (req, res) => {
    Log.info('POST /api/auth/register');

    const { username, password, mail } = req.body;
    if (!username && !password) res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);

    const { key, options } = cookieProps;

    AuthService.
        register(username, password, mail).
        then((jwt: string) => res.status(201).cookie(key, jwt, options).send({ message: 'Success'})).
        catch((err: Error) => res.status(err.status).send(err))
})

router.delete('/logout', async (req, res) => {
    Log.info('DELETE /api/auth/logout');

    const { key, options } = cookieProps;

    res.clearCookie(key, options).end()
});

export default router;