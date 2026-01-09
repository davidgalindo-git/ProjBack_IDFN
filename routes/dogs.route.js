import express from "express";
import dogsService from "../service/dogs.service.js";

const router = express.Router();
router.use(express.json());

/**
 * GET /dogs
 * Récupération des chiens avec filtres
 */
router.get("/", async (req, res) => {
    const filters = {
        id: req.query.id ? Number(req.query.id) : undefined,
        name: req.query.name,
        sex: req.query.sex,
        is_mixed: req.query.is_mixed ? parseInt(req.query.is_mixed, 10) : undefined,
        birthdate: req.query.birthdate ? new Date(req.query.birthdate) : undefined,
        is_sterilized: req.query.is_sterilized ? parseInt(req.query.is_sterilized, 10) : undefined,
        is_deceased: req.query.is_deceased ? parseInt(req.query.is_deceased, 10) : undefined,
        client_name: req.query.client_name,
        race_name: req.query.race_name,
    };

    const dogs = await dogsService.getDogs(filters);

    res.status(200).json({
        message: "Chiens récupérés avec succès",
        body: dogs,
    });
});




/**
 * POST /dogs
 * Création d'un chien
 */
router.post("/", async (req, res) => {
    const insertedDog = await dogsService.createDog(req.body);

    res.status(201).json({
        message: "Chien ajouté avec succès !",
        body: insertedDog,
    });
});

/**
 * PATCH /dogs/:id
 * Mise à jour d'un chien
 */
router.patch("/:id", async (req, res) => {
    const dogId = parseInt(req.params.id, 10);
    const updatedDog = await dogsService.updateDog(dogId, req.body);

    res.status(200).json({
        message: "Chien mis à jour avec succès !",
        body: updatedDog,
    });
});

/**
 * DELETE /dogs/:id
 * Suppression d'un chien
 */
router.delete("/:id", async (req, res) => {
    const dogId = parseInt(req.params.id, 10);
    await dogsService.deleteDog(dogId);

    res.status(200).json({
        message: "Le chien a bien été supprimé !",
        deletedId: dogId,
    });
});

export default router;
