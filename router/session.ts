import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    res.json({
        username,
        password
    })
});

router.delete('/', async (req, res) => {
    const { token } = req.body;

    res.json({
        token
    });
});

export default router;