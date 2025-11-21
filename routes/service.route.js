import express from 'express';
import serviceService from "../service/service.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const filters = req.query;

        const services = await serviceService.getService(filters);

        let message = `Le ou les services ont bien été récupéré.s !`;
        res.json({message: message, body: services});

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

export default router;