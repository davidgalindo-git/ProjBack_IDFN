/**
 * File: service.route.js
 * Description: Express router defining HTTP endpoints for managing CRUD operations on service.
 * Date: 09/01/2026
 * Author: David Galindo
 */
import express from 'express';
import serviceService from "../service/service.service.js";

const serviceRouter = express.Router();
serviceRouter.use(express.json());

let message;

serviceRouter.get('/', async (req, res) => {
    try {
        const filters = req.query;
        console.log("route.query", filters) //success

        const services = await serviceService.getServices(filters);
        console.log("route.res", services) //success

        message = `Le ou les services ont bien été récupéré.s !`;
        res.status(200).json({message: message, body: services});

    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

serviceRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("route.query", id) //success

        const services = await serviceService.getServiceById(id);
        console.log("route.res", services) //success

        message = `Le ou les services ont bien été récupéré.s !`;
        res.status(200).json({message: message, body: services});

    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

serviceRouter.post('/', async (req, res) => {
    try {
        const {date, duration_m, location_id, dog_id} = req.body;
        console.log("route.body", date, duration_m, location_id, dog_id) //success

        const newService = await serviceService.postService(date, duration_m, location_id, dog_id);
        console.log("route.res", newService) //success

        message = `Le service a bien été créé !`;
        res.status(200).json({message: message, body: newService});

    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }
});

serviceRouter.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        console.log("route.id", id) //success

        const {date, duration_m, location_id, dog_id} = req.body;
        console.log("route.body", date, duration_m, location_id, dog_id) //success

        const resUpdateService = await serviceService.patchService(id, {date, duration_m, location_id, dog_id});
        console.log("route.res", resUpdateService) //success

        message = `Le service a bien été mis à jour !`;
        res.status(200).json({message: message, body: resUpdateService});


    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }

});

serviceRouter.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        console.log("route.id", id) //success

        const resDeleteService = await serviceService.deleteService(id);
        console.log("route.res", resDeleteService) //success

        message = `Le service a bien été supprimé !`;
        res.status(200).json({message: message, body: resDeleteService});


    } catch (error) {
        const errorCode = error.status ? error.status : 500;
        res.status(errorCode).json({ error: error.message });
    }

});

export default serviceRouter;