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

router.post('/create', async (req, res) => {
    try {
        const {date, duration_m, location_id, dog_id} = req.body;
        // Validate required fields
        if (!location_id || !dog_id) {
          return res.status(400).json({
            error: "Les champs 'location_id' et 'dog_id' sont obligatoires.",
          });
        }

        const newService = await serviceService.postService(date, duration_m, location_id, dog_id);

        let message = `Le service a bien été créé !`;
        res.json({message: message, body: newService});

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

router.patch('/:id/update', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        console.log("route.id", id)
        const {date, duration_m, location_id, dog_id} = req.body;
        console.log("route.body", date, duration_m, location_id, dog_id)
        const resUpdateService = await serviceService.postService(id, {date, duration_m, location_id, dog_id});
        if (resUpdateService === 0) {
            res.status(404).json({error: "Activité non trouvée"})
        } else {
            console.log("route.res", resUpdateService)
            const updatedService= await serviceService.getService(id);
            let message = `Le service a bien été mis à jour !`;
            res.json({message: message, body: updatedService});
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

export default router;