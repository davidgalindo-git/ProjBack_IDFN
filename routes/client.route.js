import express from 'express';
import clientService from "../service/client.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    if (req.query) {
        try {
            let client = await clientService.getClient({
                id: req.query.id,
                lastname: req.query.lastname,
                firstname: req.query.firstname,
                genre: req.query.genre,
                email: req.query.email,
                phone_number: req.query.phone_number,
                address: req.query.address
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
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                genre: req.body.genre,
                email: req.body.email,
                phone_number: req.body.phone_number,
                address: req.body.address
            });
            res.json({ body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

router.put('/', async (req, res) => {
    console.log("id:",req.body.lastname)
    if (req.body) {
        try {
            let client = await clientService.createClient({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                genre: req.body.genre,
                email: req.body.email,
                phone_number: req.body.phone_number,
                address: req.body.address
            });
            console.log("id:"+req.body.lastname)
            res.json({ body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

export default router;