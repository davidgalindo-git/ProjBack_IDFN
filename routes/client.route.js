import express from 'express';
import clientService from "../service/client.service.js";

const router = express.Router();
router.use(express.json());

// router.get('/', (req, res) => {
//     res.send('Hello Locality!')
// })

router.get('/', async (req, res) => {
    if (req.query.client) {
        try {
            let client = await clientService.getClient(req.query.client);
            let message = `Le client ${req.query.client} a bien été récupérée !`;
            res.json({message: message, body: client});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

export default router;