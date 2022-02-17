import express from 'express';
import * as UserService from 'services/UserService';
import Error from 'types/error/Error';
import * as RequestError from 'types/error/RequestError'

const router = express.Router();

router.get('/', async (_req, res) => {
    const users = await UserService.getAllUser()
                                   .catch((err: Error) => res.status(err.status).send(err))
    
    return res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    const user = await UserService.getUserById(id)
                            .catch((err: Error) => res.status(err.status).send(err))
   
    return res.status(200).send(user);

});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username && !password) return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);
    
    const user = await UserService.createUser(username, password)
                                  .catch((err: Error) => res.status(err.status).send(err))

    return res.status(200).send(user)
});

//DOC a faire
router.put('/:id', async (req, res) => {
    const { password } = req.body;
    const { id       } = req.params; 
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);
    else if (!password)  return res.status(400).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR);
    
    const user = await UserService.updateUserPassword(id, password)
                                  .catch((err: Error) => res.status(err.status).send(err))
    
    return res.status(200).send(user);
  
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    await UserService.deleteUser(id)
                     .catch((err: Error) => res.status(err.status).send(err))
    
    return res.status(200).send({
        message: 'User deleted successfully'
    });
});

export default router;