import express from 'express';
import dogsService from "../service/dogs.service.js";

const router = express.Router();
router.use(express.json());

// router.get('/', (req, res) => {
//     res.send('Hello Locality!')
// })

router.get('/', async (req, res) => {
        try {
            let dogs = await dogsService.getDogs({
                id: req.query.id ? parseInt(req.query.id):undefined,
                name: req.query.name,
                sex: req.query.sex,
                is_mixed: req.query.is_mixed ? parseInt(req.query.is_mixed) : undefined,
                birthdate: req.query.birthdate ? new Date(req.query.birthdate) : undefined,
                is_sterilized: req.query.is_sterilized ? parseInt(req.query.is_sterilized) : undefined,
                is_deceased: req.query.is_deceased ? parseInt(req.query.is_deceased) : undefined,
                client_name: req.query.client_name,
                race_name: req.query.race_name,
            });
            let message = `Le chien a bien été récupérée !`;
            res.json({message: message, body: dogs});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
});
router.post('/', async (req, res) => {
    try {
        const newDog = req.body; // récupère les données envoyées en JSON
        const insertedDog = await dogsService.createDog(newDog);
        res.status(201).json({ message: "Chien ajouté avec succès !", body: insertedDog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const dogId = parseInt(req.params.id);  // <--- récupération de l'ID ici
        const updatedDog = await dogsService.updateDog(dogId, req.body);

        res.json({
            message: "Chien mis à jour avec succès !",
            body: updatedDog
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id',async (req, res)=>{
    try {
        const dogId = parseInt(req.params.id);
        const deleteDog = await dogsService.deleteDog(dogId)

        res.json({
            message: "Le chien a bien été supprimé !",
        });
    } catch (error){
        res.status(400).json({error:error.message})
    }
})

export default router;