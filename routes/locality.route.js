/**
 * File: locality.route.js
 * Description: Express router defining HTTP endpoints for managing CRUD operations on locality.
 * Date: 09/01/2026
 * Author: Fabian Rostello
 */
import express from 'express';
import localityService from "../service/locality.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        // Appel du service
        let locality = await localityService.selectLocality(req.query);

        let message = "";
        if (locality.length > 1) {
            message = `Les localités ont bien été trouvés`;     // Si plusieurs localités
        } else {
            message = `La localité ${locality[0]["toponym"]} à bien été trouvée`;       // Si une seule localité
        }
        return res.status(200).json({message: message, body: locality})
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({error: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        // Appel du service
        let locality = await localityService.createLocality(req.body);

        if (locality) {
            const message = `La localité ${req.body.name} à bien été ajoutée`;
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
        // Appel du service
        let locality = await localityService.updateLocality(id, req.body);

        if (locality) {
            const message = `La localité ${req.body.name} à bien été modifiée`;
            return res.status(200).json({message: message})
        }
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        // Appel du service
        const locality = await localityService.deleteLocality(id);

        if (locality) {
            const message = `La localité avec l'ID ${id} à bien été supprimée`;
            return res.status(200).json({message: message})
        }
    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

export default router;