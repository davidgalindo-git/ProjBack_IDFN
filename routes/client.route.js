import express from 'express';
import clientService from "../service/client.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        let client = await clientService.getClient(req.query);

        let message = "";
        if (client.length > 1) {
            message = `Les clients ont bien été trouvés`;
        } else {
            message = `Le client ${client[0]} à bien été trouvée`;
        }
        return res.status(200).json({message: message, body: client})
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({error: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        let client = await clientService.createClient(req.body);

        if (client) {
            const message = `Le client ${req.body.name} à bien été créé`;
            return res.status(200).json({message: message})
        }
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let client = await clientService.updateClient(id,{
            lastname: req.body.lastname === undefined ? null : req.body.lastname,
            firstname: req.body.firstname === undefined ? null : req.body.firstname,
            genre: req.body.genre === undefined ? null : req.body.genre,
            email: req.body.email === undefined ? null : req.body.email,
            phone_number: req.body.phone_number === undefined ? null : req.body.phone_number,
            address: req.body.address === undefined ? null : req.body.address
        });

        if (client) {
            const message = `Le client ${req.body.lastname} ${req.body.firstname} à bien été modifiée`;
            return res.status(200).json({message: message, body: client});
        }
        res.json({ body: client});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const client = await clientService.deleteClient(id);

        if (client) {
            const message = `Le client ${req.body.lastname} ${req.body.firstname} à bien été supprimé`;
            return res.status(200).json({message: message, body: client});
        }
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

export default router;