import express from 'express';
import clientService from "../service/client.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    if (req.query) {
        try {
            let client = await clientService.getClient({
                id: req.query.id,
                lastname: req.query.lastname === undefined ? null : req.body.lastname,
                firstname: req.query.firstname === undefined ? null : req.body.firstname,
                genre: req.query.genre === undefined ? null : req.body.genre,
                email: req.query.email === undefined ? null : req.body.email,
                phone_number: req.query.phone_number === undefined ? null : req.body.phone_number,
                address: req.query.address === undefined ? null : req.body.address
            });
            res.json({ body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

router.post('/', async (req, res) => {
    if (req.body) {
        try {
            let client = await clientService.createClient({
                lastname: req.body.lastname === undefined ? null : req.body.lastname,
                firstname: req.body.firstname === undefined ? null : req.body.firstname,
                genre: req.body.genre === undefined ? null : req.body.genre,
                email: req.body.email === undefined ? null : req.body.email,
                phone_number: req.body.phone_number === undefined ? null : req.body.phone_number,
                address: req.body.address === undefined ? null : req.body.address
            });
            res.json({ body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

router.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    console.log("id:",req.body.lastname)
    if (req.body) {
        try {
            let client = await clientService.updateClient(id,{
                lastname: req.body.lastname === undefined ? null : req.body.lastname,
                firstname: req.body.firstname === undefined ? null : req.body.firstname,
                genre: req.body.genre === undefined ? null : req.body.genre,
                email: req.body.email === undefined ? null : req.body.email,
                phone_number: req.body.phone_number === undefined ? null : req.body.phone_number,
                address: req.body.address === undefined ? null : req.body.address
            });
            res.json({ body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

export default router;