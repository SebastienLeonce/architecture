import express from 'express';
import { Log } from '@utils/Logger';
import * as PostService from '@services/PostService'
import { Post } from '@models/PostModel';
import Error from '@shared/error/Error';
import * as RequestError from '@shared/error/RequestError'

const router = express.Router();

// GET - Get all posts
router.get('/', async (req, res) => {
    Log.info('GET /api/post/')
    PostService.getAllPost()
               .then((posts: Post[]) => res.status(200).send(posts))
               .catch((err: Error) => res.status(err.status).send(err))
})

// GET - Get one post
router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    PostService.getOnePost(id)
               .then((post: Post) => res.status(200).send(post))
               .catch((err: Error) => res.status(err.status).send(err))
})

// POST - Create one post 
router.post('/', async (req, res) => {
    const { title, content, user }  = req.body; 
    if (!title || !content || !user) res.status(403).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR)

    PostService.createPost(title, content, user)
               .then((post: Post) => res.status(200).send(post))
               .catch((error: Error) => res.status(error.status).send(error))
})

// PUT - Modify one post 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    const { title, content, user }  = req.body; 
    if (!title || !content || !user) res.status(403).send(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR)

    PostService.updatePost(id, title, content, user)
               .then((post: Post) => res.status(200).send(post))
               .catch((error: Error) => res.status(error.status).send(error))
})

// DELETE - Delete one post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24) return res.status(400).send(RequestError.INVALID_PARAMETER_ID_FORMAT_ERROR);

    PostService.deletePost(id)
                .then(() => res.status(200).send({message: 'Post deleted successfully'}))
                .catch((err: Error) => res.status(err.status).send(err))
    
})

export default router;