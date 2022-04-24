import express from 'express';
import * as UserService from '@services/UserService';
import Error from '@shared/error/Error';
import * as RequestError from '@shared/error/RequestError'
import { UserResponse } from '@shared/user/UserResponse';
import { Log } from '@utils/Logger';

const router = express.Router();

router.get('/', async (_req, res) => {
    UserService.
        getAllUser().
        then((users: UserResponse[]) => res.status(200).send(users)).
        catch((err: Error) => res.status(err.status).send(err))
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    UserService.
        getUserById(id).
        then((user: UserResponse) => res.status(200).send(user)).
        catch((err: Error) => res.status(err.status).send(err))
});

router.put('/:id', async (req, res) => {
    const { password } = req.body;
    const { id       } = req.params; 
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);
    else if (!password)  return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);
    
    // @ts-ignore
    if (id != req.user.id ) return res.status(403).send(RequestError.PERMISSION_DENIED_ERROR);

    UserService.
        updateUserPassword(id, password).
        then((user: UserResponse) => res.status(200).send(user)).
        catch((err: Error) => res.status(err.status).send(err))  
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    // @ts-ignore
    if (id != req.user.id ) return res.status(403).send(RequestError.PERMISSION_DENIED_ERROR);

    UserService.
        deleteUser(id).
        then(() => res.status(200).send({message: 'User deleted successfully'})).
        catch((err: Error) => res.status(err.status).send(err))
});

// Get the following users of the user
router.get('/:id/following', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    UserService.getFollowing(id)
               .then((users: UserResponse[]) => res.status(200).send(users))
               .catch((err: Error) => res.status(err.status).send(err))
});

// Post a new following user
router.post('/:id/follow', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);
    const { following } = req.body;
    if (!following) return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);
    if (following.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    // @ts-ignore
    if (id != req.user.id ) return res.status(403).send(RequestError.PERMISSION_DENIED_ERROR);

    UserService.followUser(id, following)
                .then(() => res.status(200).send({message: 'User followed successfully '}))
                .catch((err: Error) => {
                    Log.fatal(err);
                    res.status(err.status).send(err)
                })
});

// Get the followers of the user
router.get('/:id/followers', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    UserService.getFollowers(id)
                .then((users: UserResponse[]) => res.status(200).send(users))
                .catch((err: Error) => res.status(err.status).send(err))
});

// Post an unfollow user
router.post('/:id/unfollow', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);
    const { following } = req.body;
    if (!following) return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);
    if (following.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    // @ts-ignore
    if (id != req.user.id ) return res.status(403).send(RequestError.PERMISSION_DENIED_ERROR);

    UserService.unfollowUser(id, following)
                .then(() => res.status(200).send({message: 'User unfollowed successfully '}))
                .catch((err: Error) => {
                    Log.fatal(err);
                    res.status(err.status).send(err)
                })
});

export default router;