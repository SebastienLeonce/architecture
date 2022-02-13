import express from 'express';

import { UserModel, User } from '@models/User';

const router = express.Router();


router.get('/', async (_req, res) => {
    res.json(await UserModel.find().select({
        password: 0,
        __v: 0
    }));
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (id.length != 24) return res.status(400).json('Invalid Data');

    res.json(await UserModel.findById(id).select({
        password: 0,
        __v: 0
    }));
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const doc = new UserModel<User>({
            username,
            password 
        }); 

        await doc.save();

        const { password:string, __v, ...data} = doc.toJSON() 

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
});

//DOC a faire
router.put('/:id', async (req, res) => {
    const { password } = req.body;
    const { id       } = req.params; 

    if (id.length != 24 ||!password) return res.status(400).json('Invalid Data');

    res.json(await UserModel.findByIdAndUpdate(id, {
        password
    }));
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (id.length != 24) return res.status(400).json('Invalid Data');

    await UserModel.deleteOne({ _id: id })

    res.json({success : true});
});

export default router;