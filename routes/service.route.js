import express from 'express';
import serviceService from "../service/service.service.js";

const serviceRouter = express.Router();
serviceRouter.use(express.json());

serviceRouter.get('/', async (req, res) => {
    try {
        const filters = req.query;

        console.log("route.query", filters) //success

        const services = await serviceService.getService(filters);

        console.log("route.res", services) //success

        let message = `Le ou les services ont bien été récupéré.s !`;
        res.json({message: message, body: services});

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

serviceRouter.post('/create', async (req, res) => {
    try {
        const {date, duration_m, location_id, dog_id} = req.body;
        console.log("route.body", date, duration_m, location_id, dog_id) //success
        // Validate required fields
        if (!location_id || !dog_id) {
          return res.status(400).json({
            error: "Les champs 'location_id' et 'dog_id' sont obligatoires.",
          });
        }

        const newService = await serviceService.postService(date, duration_m, location_id, dog_id);

        console.log("route.res", newService) //success
        let message = `Le service a bien été créé !`;
        res.json({message: message, body: newService});

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

serviceRouter.patch('/:id/update', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        console.log("route.id", id) //success
        const {date, duration_m, location_id, dog_id} = req.body;
        console.log("route.body", date, duration_m, location_id, dog_id) //success
        const resUpdateService = await serviceService.patchService(id, {date, duration_m, location_id, dog_id});
        if (resUpdateService === 0) {
            res.status(404).json({error: "Service non trouvée"})
        } else {
            console.log("route.res", resUpdateService) //success
            let message = `Le service a bien été mis à jour !`;
            res.json({message: message, body: resUpdateService});
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

serviceRouter.delete('/:id/delete', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        console.log("route.id", id) //
        const resDeleteService = await serviceService.deleteService(id);
        if (resDeleteService === 0) {
            res.status(404).json({error: "Service non trouvée"})
        } else {
            console.log("route.res", resDeleteService) //
            let message = `Le service a bien été supprimé !`;
            res.json({message: message, body: resDeleteService});
        }

    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

export default serviceRouter;