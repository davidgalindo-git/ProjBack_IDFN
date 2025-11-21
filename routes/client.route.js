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
            //let message = `Le client ${req.query.client} a bien été récupérée !`;
            //res.json({message: message, body: client});
            res.json({ body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

export default router;