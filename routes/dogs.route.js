import express from 'express';
import dogsService from "../service/dogs.service.js";

const router = express.Router();
router.use(express.json());

// router.get('/', (req, res) => {
//     res.send('Hello Locality!')
// })

router.get('/', async (req, res) => {
    try {

        // --- VALIDATIONS DES CHAMPS NUMÉRIQUES (BOOLEAN 0/1) ---
        const booleanFields = ["is_mixed", "is_sterilized", "is_deceased"];

        for (const field of booleanFields) {
            if (req.query[field] !== undefined) {
                const val = parseInt(req.query[field]);

                // si ce n'est pas 0 ou 1 → erreur 400
                if (![0, 1].includes(val)) {
                    return res.status(400).json({
                        error: `Valeur invalide pour ${field}. Utilise 0 ou 1.`
                    });
                }
            }
        }

        // --- VALIDATION DE ID ---
        if (req.query.id !== undefined && isNaN(parseInt(req.query.id))) {
            return res.status(400).json({ error: "ID invalide" });
        }

        // --- VALIDATION DE LA DATE ---
        if (req.query.birthdate !== undefined) {
            const d = new Date(req.query.birthdate);
            if (isNaN(d.getTime())) {
                return res.status(400).json({ error: "Date de naissance invalide" });
            }
        }

        // --- CONSTRUCTION DU FILTRE ---
        let filters = {
            id: req.query.id ? parseInt(req.query.id) : undefined,
            name: req.query.name,
            sex: req.query.sex,
            is_mixed: req.query.is_mixed ? parseInt(req.query.is_mixed) : undefined,
            birthdate: req.query.birthdate ? new Date(req.query.birthdate) : undefined,
            is_sterilized: req.query.is_sterilized ? parseInt(req.query.is_sterilized) : undefined,
            is_deceased: req.query.is_deceased ? parseInt(req.query.is_deceased) : undefined,
            client_name: req.query.client_name,
            race_name: req.query.race_name,
        };

        // --- RÉCUPÉRATION DES DONNÉES ---
        let dogs = await dogsService.getDogs(filters);

        // Si aucun chien trouvé → (facultatif) 404
        if (dogs.length === 0) {
            return res.status(404).json({ error: "Aucun chien trouvé" });
        }

        res.json({
            message: "Le chien a bien été récupéré !",
            body: dogs
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
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
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    try {
        const dogId = parseInt(req.params.id);
        const deleted = await dogsService.deleteDog(dogId);

        if (!deleted) {
            return res.status(404).json({ error: `Chien avec l'id ${dogId} introuvable.` });
        }

        res.json({ message: "Le chien a bien été supprimé !", deletedId: dogId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;