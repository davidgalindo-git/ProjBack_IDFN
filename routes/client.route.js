/**
 * File: client.route.js
 * Description: Express router defining HTTP endpoints for managing CRUD operations on clients.
 * Date: 09/01/2026
 * Author: Nathan Filipowitz
 */
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
            message = `Le client à bien été trouvée`;
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

        const message = `Le client ${req.body.firstname} ${req.body.lastname} a bien été créé.`;

        if (client) {
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
        const updatedClient = await clientService.updateClient(id, req.body);

        const message = "Le client a été mis à jour avec succès.";

        res.status(200).json({
            message: message
        });
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const client = await clientService.deleteClient(id);

        if (client) {
            const message = `Le client avec l'ID ${id} à bien été supprimé`;
            return res.status(200).json({message: message});
        }
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

export default router;